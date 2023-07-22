import { IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  text: string;

  @IsString()
  userId: string;
}
