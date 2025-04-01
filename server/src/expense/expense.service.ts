import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async getExpensesByCategory() {
    const expensesByCategoryRaw = await this.prisma.expenseByCategory.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    const expensesByCategory = expensesByCategoryRaw.map((expense) => ({
      ...expense,
      amount: expense.amount.toString(),
    }));

    return expensesByCategory;
  }
}
