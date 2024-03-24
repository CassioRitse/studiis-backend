import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/entitys';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  public async decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }

  public async generateToken(id: string): Promise<string> {
    return this.jwtService.signAsync({ id }, { expiresIn: '2h' });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(12);

    return bcrypt.hashSync(password, salt);
  }

  public async verify(token: string): Promise<User> {
    return this.jwtService.verifyAsync<User>(token);
  }
}
