import { Module } from '@nestjs/common';
import { LlamaindexService } from './llamaindex.service';
import { LlamaindexController } from './llamaindex.controller';

@Module({
  providers: [LlamaindexService],
  controllers: [LlamaindexController]
})
export class LlamaindexModule {}
