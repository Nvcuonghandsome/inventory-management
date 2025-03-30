import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto';

// @UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  getProducts(
    @Query('search') search = '',
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productService.getProducts(search, page, limit);
  }

  @Post('/')
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }
}
