
 // Essentials

import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';

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

client.once("ready", () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
  });
  
      const { Events } = require("discord.js");

 // Mensagem fixa

client.once(Events.ClientReady, async () => {
    const channelId = "1051574184322547892"; // ID do canal onde a mensagem será enviada
    const roleId = "1051578289958948945"; // ID do cargo a ser adicionado
    const emoji = "✅"; // Emoji que o usuário precisa clicar

    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel) return console.error("Canal não encontrado.");

        // Enviar mensagem fixa
        const message = await channel.send(
            "Bem vindo! Clique no ✅ para receber seu cargo automaticamente!"
        );

        await message.react(emoji);

        console.log("Mensagem de verificação enviada com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar mensagem fixa:", error);
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

