import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { UsersModule } from 'src/users/users.module';
import { LlamaindexModule } from 'src/llamaindex/llamaindex.module';

@Module({
  imports: [UsersModule, LlamaindexModule],
  providers: [TelegramService],
  controllers: [TelegramController]
})
export class TelegramModule { }
