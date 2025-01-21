import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './category/categories.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './orderDetail/order-detail.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ postgresDataSourceConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres')
    }),
    CategoriesModule,
    OrderModule,
    OrderDetailModule,
    ProductModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
