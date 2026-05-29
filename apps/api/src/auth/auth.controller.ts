// @ts-nocheck
import { Controller, Post, Body, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  async getNonce() {
    return { nonce: this.authService.generateNonce() };
  }

  @Post('verify')
  async verify(@Body() body: { message: string; signature: string }) {
    if (!body.message || !body.signature) {
      throw new UnauthorizedException('Message and signature are required');
    }
    return this.authService.verifySiweMessage(body.message, body.signature);
  }

  @Post('signup')
  async signup(@Body() body: { email: string; passwordStr: string; name?: string }) {
    if (!body.email || !body.passwordStr) {
      throw new UnauthorizedException('Email and password required');
    }
    const hash = await bcrypt.hash(body.passwordStr, 10);
    return this.authService.signup(body.email, hash, body.name);
  }

  @Post('login')
  async login(@Body() body: { email: string; passwordStr: string }) {
    if (!body.email || !body.passwordStr) {
      throw new UnauthorizedException('Email and password required');
    }
    return this.authService.login(body.email, body.passwordStr);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    if (!body.email) {
      throw new UnauthorizedException('Email required');
    }
    return this.authService.forgotPassword(body.email);
  }
}
