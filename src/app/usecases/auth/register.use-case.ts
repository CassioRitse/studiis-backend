import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/domain/dtos/register.dto';
import { Quiz, User } from 'src/domain/entitys';
import { EntityManager } from 'typeorm';
import { JwtService } from './jwt.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly entityManagaer: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async execute(registerDto: RegisterDto) {
    const passwordEncode = this.jwtService.encodePassword(registerDto.password);
    const user = await this.entityManagaer.save(
      User,
      new User({
        email: registerDto.email,
        name: registerDto.name,
        password: passwordEncode,
        contactNumber: registerDto.contactNumber,
      }),
    );

    const defaultQuiz = await this.entityManagaer.save(Quiz, {
      title: `Revisão de ${registerDto.name}`,
      public: false,
      owner: user,
    });

    return { user, defaultQuiz };
  }
}
