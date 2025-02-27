
 // Essentials

 import { MESSAGE_ID, CHANNEL_ID, roleId, emoji } from "./config.json";

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
  
  import { Events } from "discord.js";

 // Mensagem fixa

client.once(Events.ClientReady, async () => {
    console.log(`Bot iniciado como ${client.user.tag}`);

    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return console.error("Canal não encontrado.");

        const message = await channel.messages.fetch(MESSAGE_ID);
        console.log("Mensagem encontrada! Adicionando reação...");

        await message.react(emoji);

        console.log("Reação adicionada com sucesso!");
    } catch (error) {
        console.error("Erro ao buscar a mensagem fixa:", error);
    }
});

 // Dando cargo

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return; // Ignora reações de bots

    try {
        if (reaction.emoji.name === emoji) {
            const member = await reaction.message.guild.members.fetch(user.id);
            await member.roles.add(roleId);
            console.log(`Cargo adicionado para ${user.tag}`);

             // Envia DM para o usuário
            await user.send("🎉 Você recebeu o cargo com sucesso! Bem-vindo! Caso ainda não tenha lido, verifique a INTRODUÇÃO no servidor.");
        }
    } catch (error) {
        console.error("Erro ao adicionar cargo:", error);
    }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (user.bot) return;

    try {
        if (reaction.emoji.name === emoji) {
            const member = await reaction.message.guild.members.fetch(user.id);
            await member.roles.remove(roleId);
            console.log(`Cargo removido de ${user.tag}`);
        }
    } catch (error) {
        console.error("Erro ao remover cargo:", error);
    }
});





 // Server sided
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("Bot conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar o bot:", err));

