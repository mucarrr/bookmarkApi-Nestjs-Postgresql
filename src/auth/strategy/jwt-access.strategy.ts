
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    });
  }
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      omit: {
        hash: true,
      },
    });
    if(!user){
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
