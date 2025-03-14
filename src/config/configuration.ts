import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
    port: process.env.PORT || 3000,
    telegram_bot_token:process.env.TELEGRAM_BOT_TOKEN,
    gemini:process.env.GOOGLE_API_KEY
})