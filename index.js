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

client.once("ready", () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
  });

  client.on("guildMemberAdd", async (member) => {
    // Canal de verificação
    const channelId = '1051574184322547892'; 

    try {
        
        const channel = member.guild.channels.cache.get(channelId);
        if (!channel) return;
  
      const message = await channel.send(
        `👋 Olá ${member}, bem-vindo(a)! Para acessar o servidor e receber o cargo Júnior, reaja com ✅.`
      );
  
      await message.react("✅");
  
      // Filtro para capturar apenas a reação do usuário que entrou
      const filter = (reaction, user) =>
        reaction.emoji.name === "✅" && user.id === member.id;
  
      const collector = message.createReactionCollector({ filter });
  
      collector.on("collect", async (reaction, user) => {
        try {
            const guild = reaction.message.guild; // Obtém o servidor
            const roleId = "1051578289958948945"; // ID do cargo
    
            // Busca o membro corretamente para garantir que ele está carregado
            const member = await guild.members.fetch(user.id);
    
            if (member) {
                await member.roles.add(roleId); // Adiciona o cargo ao usuário
                await channel.send(`🎉 ${user}, bem-vindo ao servidor! Você recebeu o cargo JÚNIOR. Verifique a categoria MÉTODOS ATALHOS para dicas essenciais!`);
            } else {
                console.error("Membro não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao adicionar cargo:", error);
        }
    });
    
  
     
    } catch (error) {
      console.error("Erro ao processar entrada de usuário:", error);
    }
  });

client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("Bot conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar o bot:", err));

