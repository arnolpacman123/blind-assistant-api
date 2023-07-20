import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { UsserRegisterDto } from '@users/models/dto/user-register.dto';
import { UserLoginDto } from '@users/models/dto/user-login.dto';
import { UserAddSubscriptionDto } from '@users/models/dto/user-add-subscription.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userRegisterDto: UsserRegisterDto) {
    return await this.usersService.register(userRegisterDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.usersService.login(userLoginDto);
  }

  @Post('add-subscription')
  async addSubscription(
    @Body() userAddSubscriptionDto: UserAddSubscriptionDto,
  ) {
    return await this.usersService.addSubscription(userAddSubscriptionDto);
  }
}
