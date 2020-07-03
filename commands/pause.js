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
        if(!serverQueue.playing) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('La musique est déjà en pause.')
        )
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.react('⏸️')
        return undefined
    
}

module.exports.config = {
    command: 'pause',
    aliases: ['stop'],
    cUsage: '&pause',
    description: 'Cette commande permet de mettre en pause la musique en cours.',
    category: 'Musique',
    notAlises: false,
    guildOnly: true
}
