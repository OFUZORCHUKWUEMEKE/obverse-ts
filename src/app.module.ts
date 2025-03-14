import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { SolanaModule } from './solana/solana.module';
import { LlamaindexModule } from './llamaindex/llamaindex.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TelegramModule, SolanaModule, LlamaindexModule, PaymentModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
