import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/models/user.model';

export class SignInRes {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  user: User;
}
