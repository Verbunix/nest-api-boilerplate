import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from 'src/dtos/signin.dto';

@Controller()
export class AuthController {
  @Post('signin')
  async signin(@Body() body: SigninDto): Promise<any> {
    return body;
  }
}
