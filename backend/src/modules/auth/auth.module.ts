import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokensService } from './tokens.service';
import { RefreshTokensRepository } from './repositories/refresh-tokens.repository';
import { RefreshToken } from './models/refresh-token.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AuthController],
  providers: [RefreshTokensRepository, AuthService, TokensService],
  imports: [
    SequelizeModule.forFeature([RefreshToken]),
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: `${process.env.TTL_ACCESS_TOKEN_IN_MINUTES || 5}m`,
      },
    }),
  ],
  exports: [AuthService, TokensService, JwtModule],
})
export class AuthModule {}
