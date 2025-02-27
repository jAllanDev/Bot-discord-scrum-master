
 // Essentials

import "./events/reaction.js";

import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({  
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Reaction, Partials.User],
});

 // Log

client.once("ready", () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
  });
  

 // Server sided
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("Bot conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar o bot:", err));

