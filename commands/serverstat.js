const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    message.channel.send(new Discord.MessageEmbed()
    .setColor("#2d96ff")
    .setTitle(`**À propos de __${message.guild.name}__**`)
    .addField(`**❯ Infos Membres**`, `• Propriétaire: ${message.guild.owner.user.tag} - ${message.guild.ownerID}\n• Membres: ${message.guild.members.cache.size}`)
    .addField(`**❯ Autre**`, `• Région: ${message.guild.region}\n• Channels: ${message.guild.channels.cache.size}\n• Roles: ${message.guild.roles.cache.size}\n• Crée le: ${message.guild.createdAt.toDateString()}`)
    .setThumbnail(message.guild.iconURL({dynamic : true}))
    )
}

module.exports.config = {
    command: 'serverstat',
    aliases: ['ss', 'serverstats'],
    cUsage: '&serverstat',
    description: 'Cette commande permet de voir les informations à propos du serveur.',
    category: 'Divers',
    notAlises: false,
    guildOnly: true
}
