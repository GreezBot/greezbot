const Discord = require('discord.js')

module.exports.run = async (client, message, args, url, prefix, serverQueue, queue) => {

    if(!serverQueue) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Il n\'y a aucune musique en cours.')
        )
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('**En cours**')
        .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
    )
    return undefined
    
}

module.exports.config = {
    command: 'nowplaying',
    aliases: ['np'],
    cUsage: '&nowplaying',
    description: 'Cette commande permet de voir les informations à propos de la musique en cours.',
    category: 'Musique',
    notAlises: false,
    guildOnly: true
}
