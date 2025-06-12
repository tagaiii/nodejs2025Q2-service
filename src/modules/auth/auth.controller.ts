import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: AuthDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refreshToken(@Body() payload: { refreshToken: string }) {
    return this.authService.refreshToken(payload.refreshToken);
  }
}
