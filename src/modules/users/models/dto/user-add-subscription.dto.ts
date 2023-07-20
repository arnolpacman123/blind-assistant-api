import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserAddSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
