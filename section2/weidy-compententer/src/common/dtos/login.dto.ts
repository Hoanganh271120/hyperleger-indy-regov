import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  walletKey: string;

  @IsString()
  @IsNotEmpty()
  seed: string;
}
