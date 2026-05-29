import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(address: string) {
    const user = await this.prisma.user.findUnique({
      where: { address },
      include: {
        collections: true,
        nfts: true,
      }
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(address: string, data: any) {
    return this.prisma.user.update({
      where: { address },
      data,
    });
  }
}
