const { MessageEmbed } = require("discord.js");
const premium = require("../models/premium");
const { botsahip } = require("../config.json");
module.exports = {
    name: "premium-liste",
    description: 'Sistemde kayıtlı Premium üyeler',

    run: async (client, interaction) => {
        if (interaction.member.id == botsahip) {
            try {
                const res = await premium.find()

                const m = res.map((a) => `<@${a.user}> | (\`${a.user}\`)`).join("\n")
                interaction.reply({ embeds: [new MessageEmbed().setTitle("Tüm Liste").setDescription(m)] })
            } catch (err) {
                interaction.reply('liste bulunamadı')
            }
        }
        else {
            interaction.reply('Bu komut sadece bot sahipleri kullanabilir')
        }



    }
};
