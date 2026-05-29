import { Controller, Get, Param, Query } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('listings')
  async getListings(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.marketplaceService.getActiveListings(skip ? +skip : 0, take ? +take : 20);
  }

  @Get('listings/:id')
  async getListing(@Param('id') id: string) {
    return this.marketplaceService.getListingById(id);
  }
}
