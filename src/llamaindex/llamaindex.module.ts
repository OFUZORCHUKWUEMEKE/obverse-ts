import { Module } from '@nestjs/common';
import { LlamaindexService } from './llamaindex.service';
import { LlamaindexController } from './llamaindex.controller';
import { UsersModule } from 'src/users/users.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [UsersModule, PaymentModule],
  providers: [LlamaindexService],
  controllers: [LlamaindexController],
  exports: [LlamaindexService]
})
export class LlamaindexModule { }
