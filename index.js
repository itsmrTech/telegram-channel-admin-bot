import { Telegraf } from "telegraf";
import * as dotenv from 'dotenv';
dotenv.config();


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome, Add channel as adminstrator so it will automatically add channel username under posts.\n Have fun(ˉ﹃ˉ)'));

bot.on("channel_post", ctx => {
    try {

        let chatId = ctx.update.channel_post.chat.id
        let messageId = ctx.update.channel_post.message_id
        let channelUsername = ctx.update.channel_post.chat.username
        if (ctx.update.channel_post.text) {
            let sentText = ctx.update.channel_post.text;
            ctx.telegram.editMessageText(chatId, messageId, undefined, `${sentText}
@${channelUsername}`)
        }
        else {
            let sentCaption = ctx.update.channel_post.caption ? ctx.update.channel_post.caption : ""
            ctx.telegram.editMessageCaption(chatId, messageId, undefined, `${sentCaption}
@${channelUsername}`)
        }
        console.log(ctx.update)

    } catch (e) {
        console.error(e)
    }
})

bot.launch();