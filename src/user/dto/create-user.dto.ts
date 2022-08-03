import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsNumber()
  public age: number;

  @IsBoolean()
  @IsOptional()
  public status: boolean;

  @IsString()
  @Length(6, 16)
  public password: string;
}
