import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

}
