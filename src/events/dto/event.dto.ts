import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty({ description: 'The title of the event' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'The description of the event' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The date of the event (ISO 8601 format)' })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'The category of the event' })
  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdateEventDto {
  @ApiPropertyOptional({ description: 'The title of the event' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'The description of the event' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The date of the event (ISO 8601 format)',
  })
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({ description: 'The category of the event' })
  @IsOptional()
  @IsString()
  category?: string;
}
