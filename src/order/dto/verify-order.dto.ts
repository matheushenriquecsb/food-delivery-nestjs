import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOrder {
  @ApiProperty({
    example: '5',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;
}
