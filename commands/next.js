const Discord = require('discord.js')

module.exports.run = async (client, message, args, url, prefix, serverQueue, queue) => {

    if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Tu dois être dans un salon vocal 🎤 pour executer cette commande.')
        )
        if(!serverQueue) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Il n\'y a aucune musique en cours.')
        )
        serverQueue.connection.dispatcher.end()
        message.react('⏭️')
        return undefined
    
}

module.exports.config = {
    command: 'next',
    aliases: ['skip'],
    cUsage: '&next',
    description: 'Cette commande permet de passer à la musique suivante.',
    category: 'Musique',
    notAlises: false,
    guildOnly: true
}
