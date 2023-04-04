import { IsString, IsNotEmpty } from 'class-validator';

export class CredentialInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  issue_date: string;

  @IsString()
  @IsNotEmpty()
  expiry_date: string;

  @IsString()
  @IsNotEmpty()
  vehicle_category_code: string;

  @IsString()
  @IsNotEmpty()
  birth_year: string;

  @IsString()
  @IsNotEmpty()
  sex: string;
}
