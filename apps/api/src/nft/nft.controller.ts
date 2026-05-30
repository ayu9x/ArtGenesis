import { Controller, Get, Param, Query, Post, Req, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NftService } from './nft.service';

@Controller('nfts')
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  async getAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.nftService.getAllNfts(skip ? +skip : 0, take ? +take : 20);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.nftService.getNftById(id);
  }

  @Post()
  async create(@Req() req: any, @Body() body: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      return this.nftService.createNft(payload.sub, body);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

