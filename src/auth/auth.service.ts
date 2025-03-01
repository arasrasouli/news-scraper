import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, pass: string): Promise<string> {
    const envUsername = process.env.AUTH_USERNAME;
    const envPassword = process.env.AUTH_PASSWORD;

    if (username !== envUsername || pass !== envPassword) {
      throw new UnauthorizedException();
    }

    const payload = { username: username, sub: 1 };
    return this.jwtService.signAsync(payload);
  }
}