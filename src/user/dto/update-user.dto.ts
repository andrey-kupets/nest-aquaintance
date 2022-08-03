import {
  IsBoolean,
  IsNumber,
  IsString,
  Length
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 20)
  public name: string;

  @IsNumber()
  @Length(16, 120)
  public age: number;

  @IsBoolean()
  public status: boolean;
}
