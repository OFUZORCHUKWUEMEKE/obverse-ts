import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: Telegraf

    constructor(
        private configService: ConfigService,
    ){

    }

    async onModuleInit() {
        
    }

}
