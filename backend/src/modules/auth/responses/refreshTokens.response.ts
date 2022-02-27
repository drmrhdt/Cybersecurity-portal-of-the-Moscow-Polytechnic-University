import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokensRes {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
