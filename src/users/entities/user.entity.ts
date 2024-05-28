import { PlaceOrder } from '../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => PlaceOrder, (placeOrder) => placeOrder.userId)
  orders?: PlaceOrder[];

  @CreateDateColumn()
  createdAt: Date;
}
