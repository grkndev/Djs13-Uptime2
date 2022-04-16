const premium = require("../models/premium")
module.exports = {
    name: "premium-ekle",
    description: 'Premium Kullanıcı işlemleri',
    options: [
        {
            name: 'üye',
            description: 'Premium ekle',
            type: 6,
            required: true

        },
    ],
    run: async (client, interaction) => {
        const { botsahip } = require("../config.json");
        if (interaction.member.id !== botsahip) return interaction.reply({ content: 'Bu komut sadece bot sahipleri kullanabilir' })
        const üye = interaction.options.getMember('üye');
        const c = await premium.findOne({ user: üye.id })
        if (!c) {
            await new premium({ user: üye.id }).save();
            return interaction.reply({ content: `${üye} isimli kullanıcı Premium üyeliğine dahil edildi` })
        } else {
            return interaction.reply({ content: "Bu kullanıcının zaten Premium üyeliği bulunmakta" })
        }


    }
};
