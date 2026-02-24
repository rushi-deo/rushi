import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: { email: string; password: string; ip: string; userAgent: string }) {
    return this.authService.login(body);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  @Public()
  @Post('oauth/google')
  googleOauth(@Body() body: { idToken: string }) {
    return this.authService.googleOauth(body.idToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}
