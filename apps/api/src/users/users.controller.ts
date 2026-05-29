import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':address')
  async getProfile(@Param('address') address: string) {
    return this.usersService.getUserProfile(address);
  }

  @Patch(':address')
  async updateProfile(@Param('address') address: string, @Body() data: any) {
    // In production, require JWT auth here and verify the JWT matches the address
    return this.usersService.updateProfile(address, data);
  }
}
