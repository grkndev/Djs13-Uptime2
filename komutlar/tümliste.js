const { MessageEmbed } = require("discord.js");
const links = require("../models/links");
const { botsahip } = require("../config.json");
module.exports = {
    name: "tüm-liste",
    description: 'Sistemde kayıtlı linkler',

    run: async (_, interaction) => {
        if (interaction.member.id == botsahip) {
            try {
                const res = await links.find()

                const m = res.map((a) => `Link: ${a.link} | Sahip: <@${a.sahip}> (\`${a.sahip}\`)`).join("\n")
                if(!m) return interaction.reply({content:'Link bulunamadı'})
                interaction.reply({ embeds: [new MessageEmbed().setTitle("Tüm Liste").setDescription(m)] })
            } catch (err) {
                interaction.reply('Link bulunamadı')
            }
        }
        else {
            interaction.reply('Bu komut sadece bot sahipleri kullanabilir')
        }



    }
};
