import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @HttpCode(200)
  @Post()
  async create(@Body() dto: NoteDto) {
    return this.notesService.create(dto);
  }

  // @Get()
  // async getAll() {
  //   return this.notesService.getAll();
  // }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.getById(id);
  }
}
