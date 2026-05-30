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

  async createNft(userId: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.address) throw new NotFoundException('User or wallet not found');

    const collectionName = data.collection || 'Default Collection';
    const contractAddress = '0x' + Buffer.from(collectionName).toString('hex').slice(0, 40).padEnd(40, '0');

    // Ensure collection exists
    let collection = await this.prisma.collection.findUnique({
      where: { contractAddress }
    });

    if (!collection) {
      collection = await this.prisma.collection.create({
        data: {
          contractAddress,
          chainId: 80002, // Amoy
          name: collectionName,
          symbol: collectionName.substring(0, 3).toUpperCase(),
          creatorAddress: user.address,
        }
      });
    }

    const tokenId = Math.floor(Math.random() * 1000000).toString();

    const nft = await this.prisma.nFT.create({
      data: {
        tokenId,
        contractAddress: collection.contractAddress,
        ownerAddress: user.address,
        name: data.name,
        description: data.description || '',
        imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
        metadataUrl: 'ipfs://dummy',
        attributes: JSON.stringify(data.properties || []),
      }
    });

    // Create a listing if it's not "none"
    if (data.listingType && data.listingType !== 'none' && data.price) {
      await this.prisma.listing.create({
        data: {
          listingId: Math.floor(Math.random() * 1000000).toString(),
          type: data.listingType === 'auction' ? 'AUCTION' : 'FIXED_PRICE',
          price: data.price.toString(),
          nftId: nft.id,
        }
      });
    }

    // Record activity
    await this.prisma.activity.create({
      data: {
        type: 'MINT',
        nftId: nft.id,
        userId: user.id,
        toAddress: user.address,
      }
    });

    return nft;
  }
}
