import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveListings(skip = 0, take = 20) {
    return this.prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      skip,
      take,
      include: {
        nft: {
          include: {
            owner: true,
            collection: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getListingById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        nft: {
          include: {
            owner: true,
            collection: true,
          }
        }
      }
    });

    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }
}
