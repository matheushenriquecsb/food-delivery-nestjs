import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const getOrmConfigs = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.ORDER_DB_HOST,
    port: +process.env.ORDER_DB_PORT,
    username: process.env.ORDER_DB_USERNAME,
    password: process.env.ORDER_DB_PASSWORD,
    database: process.env.ORDER_DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
    autoLoadEntities: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
};
