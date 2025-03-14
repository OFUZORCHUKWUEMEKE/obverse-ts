import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { SolanaModule } from './solana/solana.module';
import { LlamaindexModule } from './llamaindex/llamaindex.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

const config = configuration();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');
        return {
          uri,
          retryAttempts: 4,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env']
    }),
    TelegramModule,
    SolanaModule,
    LlamaindexModule,
    PaymentModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
