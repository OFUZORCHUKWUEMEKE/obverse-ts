import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/user.repository';
import { LlamaindexService } from 'src/llamaindex/llamaindex.service';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: Telegraf

    constructor(
        private configService: ConfigService,
        private userRepository: UserRepository,
        private llamaIndexService: LlamaindexService,
    ) {
        const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        this.bot = new Telegraf(token);
    }

    async onModuleInit() {
        await this.setupBot();
        await this.bot.launch();
        console.log("Telegram bot is running")
    }

    private async setupBot() {
        // Handle start command
        this.bot.start(async (ctx) => {
            const userId = ctx.from.id;
            const username = ctx.from.username;
            const firstName = ctx.from.first_name;
            const lastName = ctx.from.last_name;

            // Register user if not exists
            //   await this.userService.findOrCreate(userId, username, firstName, lastName);
            const user = await this.userRepository.findOne({ telegramId: userId })
            if (!user) {
                await this.userRepository.create({
                    telegramId: userId,
                    username,
                    firstName,
                    lastName
                })
            }
            await ctx.reply(
                `Welcome to the Obverse AI Agent, ${lastName}! 🚀\n\n` +
                'This bot helps you manage fiat/stablecoin payments on Solana.\n\n' +
                'Use /help to see available commands.'
            );
        });

        // Help command
        this.bot.command('help', async (ctx) => {
            await ctx.reply(
                '📋 Available commands:\n\n' +
                '/start - Start the bot\n' +
                // Suggested code may be subject to a license. Learn more: ~LicenseLog:2527536972.
                '/pay - Create a new payment Link and QR code\n' +
                '/status - Check payment status\n' +
                '/wallet - Manage your wallet addresses\n' +
                '/history - View your payment history\n' +
                '/help - Show this help message\n' +
                '/about - About the bot\n' +
                '/edit_profile - Edit your profile\n' +
                '/delete_profile - Delete your profile\n'
            );
        });

        // Payment command
        this.bot.command('pay', async (ctx) => {
            const userId = ctx.from.id;
            //   const user = await this.userService.findByTelegramId(userId);

            //   if (!user) {
            //     return ctx.reply('Please use /start to register first.');
            //   }

            await ctx.reply('💰 Let\'s create a payment request. Please enter the amount:');

            // In a real app, you'd implement a conversation flow here
            // For now, let's simulate a simple response
            this.bot.on('text', async (innerCtx) => {
                const amount = parseFloat(innerCtx.message.text);

                if (isNaN(amount)) {
                    return innerCtx.reply('Please enter a valid number.');
                }

                try {
                    // const payment = await this.paymentService.createPayment(user._id, amount, 'USDC');

                    // Send payment link and QR code
                    //   await innerCtx.reply(`Payment request created!\n\nAmount: ${amount} USDC\nPayment Link: ${payment.paymentLink}`);

                    // Send QR code as photo (simulated)
                    await innerCtx.reply('Scan this QR code to pay:');
                    //   await innerCtx.reply(payment.qrCodeUrl);
                } catch (error) {
                    console.error('Payment creation failed:', error);
                    await innerCtx.reply('Failed to create payment. Please try again.');
                }
            });
        });

        // Status command
        this.bot.command('status', async (ctx) => {
            const userId = ctx.from.id;
            const user = await this.userRepository.findOne({ telegramId: userId })

            if (!user) {
                return ctx.reply('Please use /start to register first.');
            }

            //   const pendingPayments = await this.paymentService.getPendingPayments(user._id);

            //   if (pendingPayments.length === 0) {
            //     return ctx.reply('You have no pending payments.');
            //   }

            let message = '📊 Your pending payments:\n\n';

            //   for (const payment of pendingPayments) {
            //     message += `ID: ${payment._id}\n`;
            //     message += `Amount: ${payment.amount} ${payment.currency}\n`;
            //     message += `Status: ${payment.status}\n`;
            //     message += `Created: ${payment.createdAt}\n\n`;
            //   }

            await ctx.reply(
                "Status\n" +
                `username : ${user.username}\n` +
                `lastname : ${user.lastName}\n` +
                `firstname : ${user.firstName}\n` +
                `total transactions : ${user.totalTransactions}`
            );
        });

        // Handle other commands
        this.bot.command('wallet', async (ctx) => {
            // Implement wallet management
            await ctx.reply('Wallet management feature coming soon!');
        });

        this.bot.command('history', async (ctx) => {
            // Implement payment history
            await ctx.reply('Payment history feature coming soon!');
        });

        // Handle errors
        this.bot.catch((err, ctx) => {
            console.error('Bot error:', err);
            ctx.reply('An error occurred. Please try again later.');
        });
    }


}
