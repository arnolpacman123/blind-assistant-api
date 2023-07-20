import { Global, Module } from '@nestjs/common';
import { UsersController } from '@users/controllers/users.controller';
import { UsersService } from '@users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@users/models/schemas/user.schema';
import { SubscriptionSchema } from '@users/models/schemas/subscription.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Subscription',
        schema: SubscriptionSchema,
        collection: 'subscriptions',
      },
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
