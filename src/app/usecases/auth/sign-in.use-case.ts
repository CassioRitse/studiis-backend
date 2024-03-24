import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { EntityManager } from 'typeorm';
import { SignInDto } from 'src/domain/dtos/sign-in.dto';
import { User } from 'src/domain/entitys';

type SignInResponse = User & {
  token: string;
};

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}
  async execute({ email, password }: SignInDto): Promise<SignInResponse> {
    const user = await this.entityManager.findOneBy(User, { email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!this.jwtService.isPasswordValid(password, user.password)) {
      throw new UnauthorizedException('User password is invalid');
    }

    delete user.password;
    delete user.updatedAt;
    delete user.deletedAt;

    console.log(user);

    const token = await this.jwtService.generateToken(user.id);

    return { ...user, token };
  }
}
