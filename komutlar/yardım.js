const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "yardım",
    description: 'Bottaki tüm komutları listeler',
    run: async (client, interaction) => {
        const gweep = new MessageEmbed().setTitle(client.user.username + " Yardım Menüsü")
            .addField("Uptime Et!", "\`/ekle <link>\`", false)
            .addField("Sil!", "\`/sil <link>\`", false)
            .addField("Listele!", "\`/liste\`", false)
            .setThumbnail(client.user.avatarURL())
            .setFooter({
                text: `${interaction.member.user.tag} tarafından istendi`,
                iconURL: interaction.member.user.avatarURL({ dynamic: true })
            });
        interaction.reply({ embeds: [gweep] });
    }
};
