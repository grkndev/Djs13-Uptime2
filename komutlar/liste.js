const { MessageEmbed } = require('discord.js');
const links = require('../models/links');
module.exports = {
    name: "liste",
    description: 'Sana ait linkleri listeler',

    run: async (client, interaction) => {
        let a = await links.find({ sahip: interaction.member.id })
        let b = a.map((v) => v.link).join("\n")
        const embed = new MessageEmbed().setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.avatarURL({ dynamic: true }) }).setDescription(b ? b : 'Link Bulunamadı');
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
