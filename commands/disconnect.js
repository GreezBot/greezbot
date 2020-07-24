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
        message.react('🛑')
        message.member.voice.channel.leave()
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        return undefined
    
}

module.exports.config = {
    command: 'disconnect',
    aliases: [],
    cUsage: '&disconnect',
    description: 'Cette commande permet de déconnecter le bot d\'un channel vocal.',
    category: 'Musique',
    notAlises: true,
    guildOnly: true
}
