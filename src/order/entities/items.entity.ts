import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'int', nullable: true })
  quantity: number;
}
