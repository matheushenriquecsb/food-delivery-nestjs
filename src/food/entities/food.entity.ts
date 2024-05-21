import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ length: 100, nullable: false })
  image: string;

  @Column({ nullable: false })
  category: string;
}
