const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const links = require("../models/links")
const premium = require("../models/premium.js")
module.exports = {

    name: "ekle",
    description: 'Uptime komutu',
    options: [
        {
            name: 'link',
            description: 'hangi linki uptime ediceksin?',
            type: 3,
            required: true
        },


    ],
    run: async (client, interaction) => {
        const mesaj = interaction.options.getString('link');


        let c = await links.findOne({ link: mesaj, sahip: interaction.member.id })
        if (c) {
            interaction.reply({ content: `Bu link zaten uptiem edilmiş`, ephemeral: true });
        }
        else {
            /*  if(mesaj.indexOf("http://") == -1 || mesaj.indexOf("https://") == -1)
               {
                   interaction.reply({content:`Lütfen bir geçerli link belirtin!`,ephemeral:true});
                    return;
               }
               else {*/
            const u = await premium.findOne({ user: interaction.member.id })
            if (u) {
                try {
                    await fetch(mesaj)
                    await links.updateOne({ link: mesaj }, { link: mesaj, sahip: interaction.member.id }, { upsert: true })
                    //new links({ link: mesaj, sahip:interaction.member.id  }).save()
                    interaction.reply({ embeds: [new MessageEmbed().setTitle('BAŞARILI!!').setDescription(`\`${mesaj}\` linkiniz başarıyla eklendi`)], ephemeral: true })
                }
                catch {
                    interaction.reply({ content: `Lütfen bir gerçek link belirtin!`, ephemeral: true });
                }
            } else {
                const f = await links.findOne({ sahip: interaction.member.id })
                if (f) if (f.length >= 5) return interaction.reply({ content: "En fazla 5 adet link ekleyebilirsin. \n Daha fazla link ekleyebilmek için Premium üyeliğiniz olması gereklidir" })
                try {
                    await fetch(mesaj)
                    // new links({ link: mesaj, sahip:interaction.member.id  }).save()
                    await links.updateOne({ link: mesaj }, { link: mesaj, sahip: interaction.member.id }, { upsert: true })
                    interaction.reply({ embeds: [new MessageEmbed().setTitle('BAŞARILI!!').setDescription(`\`${mesaj}\` linkiniz başarıyla eklendi`)], ephemeral: true })
                }
                catch {
                    interaction.reply({ content: `Lütfen bir gerçek link belirtin!`, ephemeral: true });
                }
                // }
            }
        }

    }


};
