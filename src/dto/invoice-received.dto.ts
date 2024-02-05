import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class InvoiceReceivedDto {
  @IsNotEmpty()
  @IsString()
  event_type: string;

  @IsNotEmpty()
  @IsString()
  invoice_id: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}