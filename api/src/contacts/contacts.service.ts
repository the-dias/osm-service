import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ContactDto) {
    const contact = await this.prisma.contacts.create({
      data: {
        email: dto.email,
        message: dto.message,
        reason: dto.message,
      },
    });

    return contact;
  }
}
