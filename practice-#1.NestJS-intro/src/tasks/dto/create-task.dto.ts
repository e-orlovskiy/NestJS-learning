import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'title должен быть строкой' })
  @IsNotEmpty()
  @MinLength(3, { message: 'title должен быть длиной не менее 3 символов' })
  @MaxLength(20, { message: 'title должен быть длиной не более 20 символов' })
  title: string;

  @IsOptional()
  @IsString()
  @Length(1, 20, { message: 'Description должен быть от 1 до 20 символов' })
  description?: string;
}
