import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'matheus.teste@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Teste@567',
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;
}
