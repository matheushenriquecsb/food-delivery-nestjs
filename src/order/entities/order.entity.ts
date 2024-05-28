import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { CardItems } from '../../cart/entities/card.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PlaceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  userId: User;

  @ManyToOne(() => Address, { cascade: true, eager: true })
  address: Address;

  @OneToMany(() => CardItems, (item) => item.id, { cascade: true, eager: true })
  items: CardItems;

  @Column({ nullable: true })
  amount: number;

  @Column({ type: 'boolean', default: false })
  payment: boolean;

  @Column({ type: 'varchar', length: 100, default: 'Food Processing' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
