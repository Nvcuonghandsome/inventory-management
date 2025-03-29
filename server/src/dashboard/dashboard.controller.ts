import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { DashboardService } from './dashboard.service';

// @UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/')
  getMetrics() {
    return this.dashboardService.getMetrics();
  }
}
