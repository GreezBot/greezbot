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
        if(serverQueue.playing) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('La musique est déjà entrain de jouer.')
        )
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.react('▶️')
        return undefined
    
}

module.exports.config = {
    command: 'resume',
    aliases: ['continue'],
    cUsage: '&resume',
    description: 'Cette commande permet de remettre la musique après avoir executé `&pause`.',
    category: 'Musique',
    notAlises: false,
    guildOnly: true
}
