import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { NotesModule } from './notes/notes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [AuthModule, NotesModule, ReviewsModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
