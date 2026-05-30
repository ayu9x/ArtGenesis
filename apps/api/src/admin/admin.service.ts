import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ============ Platform Stats ============
  async getStats() {
    const [totalUsers, totalNfts, totalListings, totalCollections] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.nFT.count(),
      this.prisma.listing.count(),
      this.prisma.collection.count(),
    ]);

    const activeListings = await this.prisma.listing.count({
      where: { status: 'ACTIVE' },
    });

    const recentUsers = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last 7 days
        },
      },
    });

    const totalLogins = await this.prisma.activity.count({
      where: { type: 'LOGIN' },
    });

    const totalSignups = await this.prisma.activity.count({
      where: { type: 'SIGNUP' },
    });

    return {
      totalUsers,
      totalNfts,
      totalListings,
      activeListings,
      totalCollections,
      recentUsers,
      totalLogins,
      totalSignups,
    };
  }

  // ============ Users Management ============
  async getAllUsers(skip = 0, take = 50) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          address: true,
          role: true,
          bio: true,
          avatarUrl: true,
          twitter: true,
          instagram: true,
          website: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              nfts: true,
              collections: true,
              activities: true,
            },
          },
        },
      }),
      this.prisma.user.count(),
    ]);

    return { users, total };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        nfts: {
          include: { listings: true },
        },
        collections: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserRole(id: string, role: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    // Delete related data in order (respecting foreign keys)
    await this.prisma.activity.deleteMany({ where: { userId: id } });
    
    // Delete NFT-related data for NFTs owned by this user's address
    if (user.address) {
      const nfts = await this.prisma.nFT.findMany({ where: { ownerAddress: user.address } });
      for (const nft of nfts) {
        await this.prisma.activity.deleteMany({ where: { nftId: nft.id } });
        await this.prisma.listing.deleteMany({ where: { nftId: nft.id } });
      }
      await this.prisma.nFT.deleteMany({ where: { ownerAddress: user.address } });
      await this.prisma.collection.deleteMany({ where: { creatorAddress: user.address } });
    }

    await this.prisma.user.delete({ where: { id } });

    return { success: true, message: 'User deleted' };
  }

  // ============ NFTs Management ============
  async getAllNfts(skip = 0, take = 50) {
    const [nfts, total] = await Promise.all([
      this.prisma.nFT.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          owner: { select: { id: true, email: true, username: true, address: true } },
          collection: { select: { id: true, name: true } },
          listings: { where: { status: 'ACTIVE' } },
        },
      }),
      this.prisma.nFT.count(),
    ]);

    return { nfts, total };
  }

  async deleteNft(id: string) {
    const nft = await this.prisma.nFT.findUnique({ where: { id } });
    if (!nft) throw new NotFoundException('NFT not found');

    await this.prisma.activity.deleteMany({ where: { nftId: id } });
    await this.prisma.listing.deleteMany({ where: { nftId: id } });
    await this.prisma.nFT.delete({ where: { id } });

    return { success: true, message: 'NFT deleted' };
  }

  // ============ Listings Management ============
  async getAllListings(skip = 0, take = 50) {
    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          nft: {
            include: {
              owner: { select: { id: true, email: true, username: true } },
            },
          },
        },
      }),
      this.prisma.listing.count(),
    ]);

    return { listings, total };
  }

  // ============ Activity Log ============
  async getRecentActivity(take = 50) {
    return this.prisma.activity.findMany({
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        nft: { select: { id: true, name: true, imageUrl: true } },
        user: { select: { id: true, email: true, username: true } },
      },
    });
  }
}
