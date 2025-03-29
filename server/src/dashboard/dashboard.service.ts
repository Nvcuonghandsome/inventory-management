import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    try {
      const popularProducts = await this.prisma.products.findMany({
        take: 15,
        orderBy: {
          stockQuantity: 'desc',
        },
      });
      const salesSummary = await this.prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });
      const purchaseSummary = await this.prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });
      const expenseSummary = await this.prisma.expenseSummary.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });
      const expenseByCategoryRaw = await this.prisma.expenseByCategory.findMany(
        {
          take: 5,
          orderBy: {
            date: 'desc',
          },
        },
      );
      const expenseByCategory = expenseByCategoryRaw.map((expense) => ({
        ...expense,
        amount: expense.amount.toString(), // BigInt -> String
      }));

      return {
        popularProducts,
        salesSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategory,
      };
    } catch (error) {
      console.error('Get Metrics error', error);
      throw new ForbiddenException('Get Metrics error');
    }
  }
}
