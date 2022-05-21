import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  public _id: Number;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
