import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CardItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column({ nullable: true })
  foodId: number;

  @Column()
  quantity: number;
}
