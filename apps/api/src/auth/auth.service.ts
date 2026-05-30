// @ts-nocheck
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { generateNonce, SiweMessage } from 'siwe';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  generateNonce(): string {
    return generateNonce();
  }

  async verifySiweMessage(messageStr: string, signature: string) {
    try {
      const message = new SiweMessage(messageStr);
      const { data } = await message.verify({ signature });
      
      const address = data.address;

      let user = await this.prisma.user.findUnique({
        where: { address }
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: { address }
        });
      }

      const payload = { sub: user.id, address: user.address };
      const token = this.jwtService.sign(payload);

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid SIWE signature');
    }
  }

  async signup(email: string, passwordHash: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    // Generate a mock Ethereum address for email users so they can own NFTs
    const mockAddress = '0x' + crypto.randomBytes(20).toString('hex');

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        username: name,
        address: mockAddress,
      }
    });

    const payload = { sub: user.id, email: user.email, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    try {
      await this.prisma.activity.create({
        data: {
          type: 'SIGNUP',
          userId: user.id,
        }
      });
    } catch (e) { /* ignore */ }

    return { success: true, user, token };
  }

  async login(email: string, passwordStr: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(passwordStr, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    try {
      await this.prisma.activity.create({
        data: {
          type: 'LOGIN',
          userId: user.id,
        }
      });
    } catch (e) { /* ignore */ }

    return { success: true, user, token };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: true, message: 'If an account exists, a reset link has been sent' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    await this.prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
      }
    });

    console.log(`[MOCK EMAIL] Password reset link for ${email}: http://localhost:3000/reset-password?token=${resetToken}`);
    return { success: true, message: 'If an account exists, a reset link has been sent' };
  }
}
