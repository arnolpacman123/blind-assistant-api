import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtOptions: JwtModuleOptions = {
  secret: 'my_secret_key_21031999',
  signOptions: { expiresIn: '12h' },
  global: true,
};
