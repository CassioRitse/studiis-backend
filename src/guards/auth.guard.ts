import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/libs/metadata';
import { ValidateTokenUseCase } from 'src/app/usecases/auth/validate-toke.use-case';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly validateToken: ValidateTokenUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const token = this.extractTokenFromHeader(request);

    const user = await this.validateToken.execute(token);

    context.switchToHttp().getRequest().user = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }

    if (type !== 'Bearer') {
      throw new UnauthorizedException(
        'Authentication type must be Bearer token',
      );
    }
    return type === 'Bearer' ? token : undefined;
  }
}
