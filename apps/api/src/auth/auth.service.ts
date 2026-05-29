import { Injectable, UnauthorizedException } from '@nestjs/common';
import { generateNonce, SiweMessage } from 'siwe';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  generateNonce(): string {
    return generateNonce();
  }

  async verifySiweMessage(messageStr: string, signature: string) {
    try {
      const message = new SiweMessage(messageStr);
      // verify signature
      const { data } = await message.verify({ signature });
      
      const address = data.address;

      // Check if user exists, else create
      let user = await this.prisma.user.findUnique({
        where: { address }
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: { address }
        });
      }

      // Generate a mock JWT token (in production use @nestjs/jwt)
      const token = crypto.randomBytes(32).toString('hex');

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid SIWE signature');
    }
  }
}
