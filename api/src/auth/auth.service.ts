import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Users } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  async update(dto: AuthDto) {
    const user = await this.prisma.users.update({
      data: {
        name: dto.name,
        phone: dto.phone,
      },
      where: {
        email: dto.email,
      },
    });

    return user;
  }
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async getNewTokens(dto: RefreshTokenDto) {
    Logger.log(dto.refreshToken);
    const result = await this.jwt.verifyAsync(dto.refreshToken);

    Logger.log(`+++++++++++++++${dto.refreshToken}+++++++++++++++`);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.prisma.users.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const existUser = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUser) throw new BadRequestException('User already exist');

    const user = await this.prisma.users.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
      },
    });

    Logger.log('+++++++++++++++[Created User]+++++++++++++++');

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = {
      id: userId,
    };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: Users) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
