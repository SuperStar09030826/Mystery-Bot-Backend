"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary packages
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");
const express = require("express");
// Create a new Express app
const app = express();
// Load environment variables
dotenv.config();
const token = process.env.TELEGRAM_TOKEN;
console.log("Bot token:", token); // Confirm token is loaded
// Create a new Telegram bot using polling to fetch new updates
const bot = new TelegramBot(token, { polling: true });
// Assign telegram channel id
const groupUsername = process.env.GROUP_USERNAME;
const channelUsername = process.env.CHANNEL_USERNAME;
const twitter = process.env.TWITTER_ID;
let groupId = 0;
let channelID = 0;
let twitterID = 0;
let USER_ID = 2323232323;
let USER_NAME = "Leo_mint";
bot
    .getChat(groupUsername)
    .then((chat) => {
    groupId = chat.id;
    console.log("Group ID:", groupId);
})
    .catch((error) => {
    console.error("Error getting chat:", error);
});
// Define the inline keyboard layout for interaction
const options = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Play in 1 click  🐉",
                    web_app: { url: "https://mike-coin-bot-1.vercel.app/" },
                },
            ],
            [
                {
                    text: "Subscribe to the channel  🐸",
                    url: "https://t.me/MikeTokenAnn",
                },
            ],
            [{ text: "How to earn from the game  🐲", callback_data: "earn" }],
            [{ text: "Task 📝", callback_data: "task" }],
        ],
    },
};
const option1 = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "💰 Join Mike's telegram group?   Sure! 👌 ",
                    callback_data: "join",
                },
            ],
            [
                {
                    text: "💰 Subscribe Mike's Ann Channel?   Sure! 👌 ",
                    callback_data: "subscribe",
                },
            ],
            [
                {
                    text: "💰 Follow Mike's Twitter?          Sure! 👌 ",
                    callback_data: "follow",
                },
            ],
        ],
    },
};
// Handle the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userID = msg.from.id;
    USER_ID = chatId;
    console.log("--//---myChatID----//---", chatId);
    const welcomeMessage = "Hello! Welcome to the Mike Mystery Bot 🐉 🐸 🐲                  \n\nStart our tap-to-earn game by clicking the “Play” button below.                  \nChoose your adventure and start tapping the screen to collect coins.   \n\nBoost your passive income and develop your own strategy with multi-taps, higher energy, and referrals. Join our social media to become an active member of the CryptoMonsters society with the exclusive “Mike Token.” \n\nIn Mystery Bot, all activities are rewarded. Gather as many coins as possible. Once $MKT is listed on T1 & T2 exchanges, you'll ";
    // Send the welcome message with the inline keyboard
    bot.sendMessage(chatId, welcomeMessage, options);
});
bot.on("message", (msg) => {
    var _a;
    const chatId = msg.chat.id;
    const userID = msg.from.id;
    USER_NAME = (_a = msg.from) === null || _a === void 0 ? void 0 : _a.username;
    console.log("--//---myChatID----//---", chatId);
    console.log("--//---myUserID----//---", userID);
});
// Handle callback queries from inline buttons
bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const category = callbackQuery.data; // The 'callback_data' associated with the button pressed.
    if (category === "earn") {
        // Replace 'URL_TO_CHANNEL' with your channel's URL
        const messagetext = "How to play Mike Game ⚡️                              \n\n 💰 Tap to earn\nTap the screen and collect coins.\n\n    ⛏ Mine\nUpgrade cards that will give you passive income opportunities.\n\n  ⏰ Profit per hour\nThe exchange will work for you on its own, even when you are \nnot in the game for 3 hours.\nThen you need to log in to the game again.     \n\n     👥 Friends\nInvite your friends and you will get bonuses. Help a friend move \nto the next leagues and you will get even more bonuses.  \n\n⏳ Token listingAt the end of the season, a token will be released and distributed among the players. Dates will be announced in our announcement channel. Stay tuned!  ";
        bot.sendMessage(message.chat.id, messagetext, options);
    }
    if (category === "task") {
        // Replace 'URL_TO_CHANNEL' with your channel's URL
        const messagetext = "   😊   You will gain bonus!  🚀                    \n\n 😎  Join Mike's telegram group  \n       https://t.me/MikeToken \n       You will receive 1000 coins \n\n 🤩  Join Mike's Ann Channel  \n       https://t.me/MikeTokenAnn \n       You will receive 1000 coins \n\n  😍  Follow our twitter!\n       https://twitter.com/MikeTokenio\n       You will receive 1000 coins \n\n";
        bot.sendMessage(message.chat.id, messagetext, option1);
    }
    if (category === "join") {
        console.log("--//---USER_ID----//---", USER_ID);
        // Check if the user is already joined group
        bot
            .getChatMember(groupId, USER_ID)
            .then((member) => {
            if (member.status !== "left" && member.status !== "kicked") {
                bot.sendMessage(message.chat.id, "🏆  You gained 1000 coins!", option1);
            }
            else {
                bot.sendMessage(message.chat.id, "🐷  You are not joined group!", option1);
            }
        })
            .catch((error) => {
            console.error("Error checking chat member:", error);
            bot.sendMessage(message.chat.id, "🦀  Error checking chat member!", option1);
        });
    }
    if (category === "subscribe") {
        // Check if the user is already subscribed chanel
        bot
            .getChatMember(channelID, USER_ID)
            .then((member) => {
            if (member.status !== "left" && member.status !== "kicked") {
                bot.sendMessage(message.chat.id, "🏆  You gained 1000 coins!", option1);
            }
            else {
                bot.sendMessage(message.chat.id, "🐷  You are not joined group!", option1);
            }
        })
            .catch((error) => {
            console.error("Error checking chat member:", error);
            bot.sendMessage(message.chat.id, "🦀  Error checking chat member!", option1);
        });
    }
    if (category === "follow") {
        // Replace 'URL_TO_CHANNEL' with your channel's URL
        const messagetext = "  😍 Follow our twitter!\n       https://twitter.com/MikeTokenio\n       You will receive 1000 coins \n\n";
        bot.sendMessage(message.chat.id, messagetext, options);
    }
});
bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const referrerUsername = match[1]; // Extracted from the start parameter
    console.log("--//---OK!!!----//---");
    console.log("--//---referrerUsername----//---", referrerUsername);
    console.log("--//---USER_NAME----//---", USER_NAME);
    try {
        const response00 = await axios.post(`https://mike-token-backend-1.onrender.com/api/wallet/add`, {
            username: USER_NAME,
        });
        const response0 = await axios.post(`https://mike-token-backend-1.onrender.com/api/wallet/updateBalance/${USER_NAME}`, { balance: 200 });
        console.log(response0.data);
        console.log(response00.data);
        const response1 = await axios.post(`https://mike-token-backend-1.onrender.com/api/wallet/${referrerUsername}`);
        const response2 = await axios.post(`https://mike-token-backend-1.onrender.com/api/wallet/updateBalance/${referrerUsername}`, { balance: 200 + response1.data.balance });
        console.log(response2.data);
    }
    catch (error) {
        console.error(error);
    }
});
