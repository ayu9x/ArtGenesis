import { Controller, Post, Body, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  async getNonce(@Req() req: any) {
    // Generate a SIWE nonce
    const nonce = this.authService.generateNonce();
    return { nonce };
  }

  @Post('verify')
  async verify(@Body() body: { message: string; signature: string }) {
    const { message, signature } = body;
    if (!message || !signature) {
      throw new UnauthorizedException('Message and signature are required');
    }
    
    return this.authService.verifySiweMessage(message, signature);
  }
}
