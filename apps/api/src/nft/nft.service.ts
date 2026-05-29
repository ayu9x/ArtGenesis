import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NftService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNfts(skip = 0, take = 20) {
    return this.prisma.nFT.findMany({
      skip,
      take,
      include: {
        owner: true,
        collection: true,
        listings: {
          where: { status: 'ACTIVE' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getNftById(id: string) {
    const nft = await this.prisma.nFT.findUnique({
      where: { id },
      include: {
        owner: true,
        collection: true,
        listings: true,
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!nft) throw new NotFoundException('NFT not found');
    return nft;
  }
}
