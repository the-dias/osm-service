import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  async getById(id: number) {
    const notes = await this.prisma.notes.findMany({ where: { userId: id } });
    Logger.log(`+++++++++++++++${notes}+++++++++++++`);
    return notes;
  }
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const notes = await this.prisma.notes.findMany();
    return notes;
  }
  async create(dto: NoteDto) {
    const existUser = await this.prisma.users.findUnique({
      where: {
        id: +dto.userId,
      },
    });

    if (!existUser) throw new BadRequestException('User not exist');

    const note = await this.prisma.notes.create({
      data: {
        text: dto.text,
        userId: +dto.userId,
      },
    });

    Logger.log(note);

    return note;
  }
}
