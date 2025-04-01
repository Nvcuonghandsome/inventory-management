import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    // can use config env global
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    DashboardModule,
    PrismaModule,
    ProductModule,
    ExpenseModule,
  ],
})
export class AppModule {}
