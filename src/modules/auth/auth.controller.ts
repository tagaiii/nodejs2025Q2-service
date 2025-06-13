import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshTokenDto } from './refreshToken.dto';
import { UnauthorizedValidationPipe } from 'src/common/pipes/unauthorized.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() signupDto: AuthDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @UsePipes(new UnauthorizedValidationPipe())
  refreshToken(@Body() payload: RefreshTokenDto) {
    return this.authService.refreshToken(payload.refreshToken);
  }
}
