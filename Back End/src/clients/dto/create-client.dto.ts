import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsLatitude, IsLongitude } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR') // Defina o código do país adequado para o seu caso
  phone: string;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;
}
