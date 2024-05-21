import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { getOrmConfigs } from './config/orm.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    getOrmConfigs(),
    FoodModule,
    UsersModule,
    CartModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
