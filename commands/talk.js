const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    message.delete()
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Question pour un brawler')
    .setDescription('Quel est le skin le plus ancien de Brawl Stars?')
    .addField('**1.** Shelly Star', '_ _', true)
    .addField('**2.** Corbac Phoenix', '_ _', true)
    .addField('**3.** Bartaba Sorcier', '_ _', true)
    .setFooter('Tu as 45 secondes pour répondre')
    ).then(m => {
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 })
        collector.on('collect', message => {
            if(!message.content == "1" || !message.content == "2" || !message.content == "3") return message.channel.send('Tu dois envoyer \'**1, 2 ou 3**\' pour répondre ')
            if (message.content == "2") {
                collector.stop()
                m.delete()
                message.delete()
                message.channel.send('Bonne réponse !')
            } else {
                collector.stop()
                message.channel.send("Mauvaise réponse !")
            }
        })
        collector.on('end', collected => {
            if (collected.size === 0) {
                m.delete()
                message.channel.send('Temp écoulé.').then(t => t.delete({ timeout : 3000 }))
            }
        })
    })
}

module.exports.config = {
    command: 'talk',
    aliases: [],
    cUsage: '&talk',
    description: 'Cette commande est un test.',
    notAlises: true,
    guildOnly: true
}
