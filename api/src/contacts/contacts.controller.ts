import { ContactsService } from './contacts.service';
import { ContactDto } from './dto/contact.dto';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @HttpCode(200)
  @Post()
  async create(@Body() dto: ContactDto) {
    return this.contactsService.create(dto);
  }
}
