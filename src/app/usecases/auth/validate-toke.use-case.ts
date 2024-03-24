import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('User token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid user token');
      }
      throw new Error(error);
    }
  }
}
