import { UserAddSubscriptionDto } from '@users/models/dto/user-add-subscription.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@users/models/schemas/user.schema';
import { Model } from 'mongoose';
import { UsserRegisterDto } from '@users/models/dto/user-register.dto';
import { UserLoginDto } from '@users/models/dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import {
  SubscriptionI,
  SubscriptionName,
  SubscriptionPrice,
} from '@users/models/interfaces/subscription.interface';
import { Subscription } from '@users/models/schemas/subscription.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
  ) {}

  async register(userRegisterDto: UsserRegisterDto) {
    const { identifier, password } = userRegisterDto;
    const exists = await this.userModel.exists({ identifier });
    if (exists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const plainPassword = password;
    try {
      const hash = await bcrypt.hash(plainPassword, 10);
      const user = new this.userModel({
        identifier,
        password: hash,
      });
      return await user.save();
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(userLoginDto: UserLoginDto) {
    const { identifier, password } = userLoginDto;
    const user = await this.userModel.findOne({ identifier });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    return user.populate('subscriptions');
  }

  async addSubscription(userAddSubscriptionDto: UserAddSubscriptionDto) {
    const { userId, name, price } = userAddSubscriptionDto;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let newSubscription: any;

    if (name === SubscriptionName.FREE) {
      newSubscription = await this.subscriptionModel.create({
        name,
        price,
      });
    } else {
      const today = new Date();
      const todayMoreOneYear = new Date();
      todayMoreOneYear.setFullYear(today.getFullYear() + 1);
      newSubscription = await this.subscriptionModel.create({
        name,
        price,
        startDate: today,
        endDate: todayMoreOneYear,
      });
    }

    newSubscription = await newSubscription.save();

    user.subscriptions.push(newSubscription);

    return (await user.save()).populate('subscriptions');
  }

  async seedSubscriptions() {
    const today = new Date();
    const todayMoreOneYear = new Date();
    todayMoreOneYear.setFullYear(today.getFullYear() + 1);
    const subscriptions: SubscriptionI[] = [
      {
        name: SubscriptionName.FREE,
        price: SubscriptionPrice.FREE,
      },
      {
        name: SubscriptionName.PRO,
        price: SubscriptionPrice.PRO,
        startDate: today,
        endDate: todayMoreOneYear,
      },
      {
        name: SubscriptionName.PREMIUM,
        price: SubscriptionPrice.PREMIUM,
        startDate: today,
        endDate: todayMoreOneYear,
      },
    ];

    return await this.subscriptionModel.insertMany(subscriptions);
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id);
  }

  passwordsMatch(password1: string, password2: string) {
    return password1 === password2;
  }
}
