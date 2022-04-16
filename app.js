const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, Collection, VoiceState } = require('discord.js');
const client = new Client({ intents: 647 });
const { token } = require("./config.json");
const db = require("mongoose");
const fetch = require("node-fetch");
const fs = require("fs");
const { mongodb } = require("./config.json");


//////////////////////////////// MONGODB URL //////////////////////////
db.connect(mongodb).then(() => {
    console.log("Mongoya Bağlanıldı");
}).catch(console.log("Mongoose hata"));


global.client = client;
client.commands = (global.commands = []);

fs.readdir("./komutlar/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./komutlar/${file}`);

        client.commands.push({
            name: props.name.toLowerCase(),
            description: props.description,
            options: props.options,
            type: props.type,
        })
        console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
    });
});
const links = require("./models/links");
client.on("guildMemberRemove", async (member) => {
    const f = await links.findOne({ sahip: member.id });
    if(f) return await links.deleteOne({ sahip: member.id });
})

client.on('interactionCreate', (interaction) => {

    if (!interaction.isCommand()) return;

    try {
        fs.readdir("./komutlar/", (err, files) => {
            if (err) throw err;

            files.forEach(async (f) => {
                const command = require(`./komutlar/${f}`);
                if (
                    interaction.commandName.toLowerCase() === command.name.toLowerCase()
                ) {
                    return command.run(client, interaction);
                }
            });
        });
    } catch (err) {
        console.error(err);
    }

    
});
client.on('ready', async () => {
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });
    } catch (error) {
      console.error(error);
    }
  
});
client.on('ready', () => {
    console.log(`
    ${client.user.tag} ismi ile giriş yapıldı,
    ${client.channels.cache.size} adet kanala,
    ${client.guilds.cache.size} adet sunucuya,
    ${client.users.cache.size} adet kullanıcıya hizmet veriyor.`);
    const r = require("./models/links.js")

    setInterval(() => {
        r.find({}, (err, res) => {
            res.forEach(b => {

                try {
                    fetch(b.link);
                    console.log(`Uptime Edildi: [${b.link} + ${b.sahip}]`);
                } catch { console.log(`hatalı link: [${b.link} + ${b.sahip}]`); }
            })
        })
    }, 5000)
})


client.login(token);