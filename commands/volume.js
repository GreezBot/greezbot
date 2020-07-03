const Discord = require('discord.js')
const { djRole, bypass } = require('../config.json')

module.exports.run = async (client, message, args, url, prefix, serverQueue, queue) => {

    if(!message.member.roles.cache.has(djRole)) return message.channel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription('Tu dois avoir le role de DJ :musical_note: pour executer cette commande.')
    )
    if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Tu dois être dans un salon vocal 🎤 pour executer cette commande.')
        )
        if(!serverQueue) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Il n\'y a aucune musique en cours.')
        )
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#b79bff')
        .setDescription(`Le volume actuel est de: **${serverQueue.volume}**`)
        )
        if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Ce n\'est pas une valeur valide pour changer le volume.')
        )
        if(args[0] > 5 && !message.member.roles.cache.has(bypass) || args[0] < 0.5 && !message.member.roles.cache.has(bypass)) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Tu dois spécifier une valeur entre 0.5 et 5.')
        )
        serverQueue.volume = args[0]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5)
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#b79bff')
        .setDescription(`J'ai changé le volume à: **${serverQueue.volume}**`)
       )
       return undefined
    
}

module.exports.config = {
    command: 'volume',
    aliases: [],
    cUsage: '&volume <valeur>',
    description: 'Cette commande permet de modifier le volume de la musique | voir le volume actuel avec `volume`.',
    category: 'Musique',
    notAlises: true,
    guildOnly: true
}
