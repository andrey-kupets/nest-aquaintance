import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(2, 20)
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Length(6, 16)
  public password: string;

  @IsOptional()
  @IsString()
  public age: number
}
