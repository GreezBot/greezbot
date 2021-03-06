const Discord = require('discord.js')
const encode = require('strict-uri-encode')

module.exports.run = async (client, message, args) => {

    let question = encode(args.join(' '))
    
    let link = `https://www.lmgtfy.com/?q=${question}`

    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Lien: ${link}`)
    .setColor('#ff0000')
    .setThumbnail('https://imgur.com/a/ZkHxvK4')
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    )
}

module.exports.config = {
    command: 'ditgreez',
    aliases: ['lmgtfy'],
    cUsage: '&ditgreez <Recherche google>',
    description: 'Cette commande est un test.',
    notAlises: false,
    guildOnly: true
}
