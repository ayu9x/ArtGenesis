import { Controller, Get, Param, Query } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get()
  async getAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.nftService.getAllNfts(skip ? +skip : 0, take ? +take : 20);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.nftService.getNftById(id);
  }
}
