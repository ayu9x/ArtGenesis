import { Controller, Get, Delete, Patch, Param, Query, UseGuards, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ============ Platform Stats ============
  @Get('stats')
  async getStats() {
    return this.adminService.getStats();
  }

  // ============ Users ============
  @Get('users')
  async getUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.adminService.getAllUsers(
      skip ? +skip : 0,
      take ? +take : 50,
    );
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id/role')
  async updateRole(
    @Param('id') id: string,
    @Body() body: { role: string },
  ) {
    return this.adminService.updateUserRole(id, body.role);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  // ============ NFTs ============
  @Get('nfts')
  async getNfts(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.adminService.getAllNfts(
      skip ? +skip : 0,
      take ? +take : 50,
    );
  }

  @Delete('nfts/:id')
  async deleteNft(@Param('id') id: string) {
    return this.adminService.deleteNft(id);
  }

  // ============ Listings ============
  @Get('listings')
  async getListings(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.adminService.getAllListings(
      skip ? +skip : 0,
      take ? +take : 50,
    );
  }

  // ============ Activity ============
  @Get('activity')
  async getActivity(@Query('take') take?: string) {
    return this.adminService.getRecentActivity(take ? +take : 50);
  }
}
