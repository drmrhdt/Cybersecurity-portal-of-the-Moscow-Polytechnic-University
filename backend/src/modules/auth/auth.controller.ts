import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public-url.decorator';
import { RefreshTokensRes, SignInRes, SignUpRes } from './responses';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Вход по почте и паролю' })
  @ApiResponse({ status: 200, type: SignInRes })
  @Public()
  @Post('/sign-in')
  async signIn(
    @Body() userDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, access_token, refresh_token } = await this.authService.signIn(
      userDto,
    );

    response
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      })
      .send({ access_token, refresh_token, user });
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: SignUpRes })
  @Public()
  @Post('/sign-up')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const { user, access_token, refresh_token } = await this.authService.signUp(
      userDto,
    );

    response
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        expires: new Date(
          Date.now() +
            1000 *
              60 *
              60 *
              24 *
              (Number(process.env.TTL_REFRESH_TOKEN_IN_DAYS) || 10),
        ),
      })
      .send({ access_token, refresh_token, user });
  }

  @ApiOperation({ summary: 'Рефреш токенов' })
  @ApiResponse({ status: 200, type: RefreshTokensRes })
  @ApiCookieAuth()
  @Public()
  @Get('/refresh-tokens')
  async refreshTokens(@Req() request: Request, @Res() response: Response) {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(request.cookies.refresh_token || '');
    response
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        expires: new Date(
          Date.now() +
            1000 *
              60 *
              60 *
              24 *
              (Number(process.env.TTL_REFRESH_TOKEN_IN_DAYS) || 10),
        ),
      })
      .send({ access_token, refresh_token });
  }

  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiResponse({ status: 200 })
  @ApiCookieAuth()
  @Public()
  @Get('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    if (request.cookies.refresh_token) {
      await this.authService.logout(request.cookies.refresh_token);
    }
    response.clearCookie('refresh_token').send();
  }
}
