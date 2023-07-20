import { IsNotEmpty, IsString } from 'class-validator';

export class UsserRegisterDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
