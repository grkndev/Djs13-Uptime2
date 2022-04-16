const links = require("../models/links");
module.exports = {
    name: "sil",
    description: 'Sistemde kayıtlı linklerini silersin',
    options: [
        {
            name: 'link',
            description: 'Hangi linki sileceksiniz?',
            type: 3,
            required: true
        },


    ],
    run: async (client, interaction) => {

        const mesaj = interaction.options.getString('link');
        let c = await links.findOne({ link: mesaj, sahip: interaction.member.id })
        if (c) { await links.deleteOne({ link: mesaj }); interaction.reply({ content: `Link Silindi`, ephemeral: true }); }
        else { interaction.reply({ content: `Link Bulunamadı`, ephemeral: true }); }


    }
};
