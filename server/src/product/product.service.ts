import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(search: string, page?: string, limit?: string) {
    const take = limit ? parseInt(limit, 10) : undefined;
    const skip = page && take ? (parseInt(page, 10) - 1) * take : undefined;

    const products = await this.prisma.products.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : {},
      take,
      skip,
    });

    return products;
  }

  createProduct = async (data: CreateProductDto) => {
    const newProduct = await this.prisma.products.create({ data });
    return newProduct;
  };
}
