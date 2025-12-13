import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';

@Module({
  imports: [JwtModule.register({}), PassportModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtAccessStrategy]
})
export class AuthModule {}
