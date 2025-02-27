
 // Essentials

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

 const MESSAGE_ID = "1344751404115300455"; // O ID da mensagem fixa
 const CHANNEL_ID = "1051574184322547892"; // ID do canal onde a mensagem foi enviada
 const EMOJI = "✅"; // Emoji para reação

client.once(Events.ClientReady, async () => {
    console.log(`Bot iniciado como ${client.user.tag}`);

    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return console.error("Canal não encontrado.");

        const message = await channel.messages.fetch(MESSAGE_ID);
        console.log("Mensagem encontrada! Adicionando reação...");

        await message.react(EMOJI);

        console.log("Reação adicionada com sucesso!");
    } catch (error) {
        console.error("Erro ao buscar a mensagem fixa:", error);
    }
});

 // Dando cargo

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return; // Ignora reações de bots

    const roleId = "1051578289958948945"; // ID do cargo
    const emoji = "✅"; // Emoji que ativa o cargo

    try {
        if (reaction.emoji.name === emoji) {
            const member = await reaction.message.guild.members.fetch(user.id);
            await member.roles.add(roleId);
            console.log(`Cargo adicionado para ${user.tag}`);
        }
    } catch (error) {
        console.error("Erro ao adicionar cargo:", error);
    }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (user.bot) return;

    const roleId = "1051578289958948945";
    const emoji = "✅";

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



client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("Bot conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar o bot:", err));

