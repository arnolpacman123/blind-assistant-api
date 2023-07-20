import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { UsersService } from '@users/services/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContextHost) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token);
      await this.validatePayload(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async validatePayload(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const userPayload = payload.user;
    if (!userPayload) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOneById(userPayload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordsMatch = this.userService.passwordsMatch(
      user.password,
      userPayload.password,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException();
    }
  }
}
