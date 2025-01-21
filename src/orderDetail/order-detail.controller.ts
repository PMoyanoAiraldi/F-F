import { Controller, Get } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';


@Controller()
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) {}

}
