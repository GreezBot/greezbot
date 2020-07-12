const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var name
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    message.channel.send(message.member.joinedAt.toLocaleDateString('fr', options))
    const test = new Date(Date.UTC(message.author.createdAt))
    console.log(message.author.createdAt)
    console.log(test)
    if (!message.member.nickname) {
        name = message.author.username} 
        else {
        name = message.member.nickname}
    if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setColor("#2d96ff")
        .addField(`**❯ Infos Membre**`, `• Pseudo: ${name}\n• Haut Role: ${message.member.roles.highest}\n• Rejoins le: ${message.member.joinedAt.toLocaleDateString('fr', options)}`)
        .addField(`**❯ Infos Utilisateur**`, `• ID: ${message.author.id}\n• Tag: ${message.author.tag}\n• Crée le: ${message.author.createdAt.toLocaleDateString('fr', options)}\n• Status: ${message.author.presence.status}\n• Activité: ${message.author.presence.activities}`)
        .setTitle(`**À propos de __${message.author.username}__**`)
        .setThumbnail(message.author.displayAvatarURL({dynamic : true, size : 256}))
        )
    if (!member.nickname) {
        name = member.user.username} 
    else {
        name = member.nickname}
    message.channel.send(new Discord.MessageEmbed()
        .setColor("#2d96ff")
        .addField(`**❯ Infos Membre**`, `• Pseudo: ${name}\n• Haut Role: ${member.roles.highest}\n• Rejoins le: ${member.joinedAt.toLocaleDateString('fr').format("dd MMM yyyy")}`)
        .addField(`**❯ Infos Utilisateur**`, `• ID: ${member.id}\n• Tag: ${member.user.tag}\n• Crée le: ${member.user.createdAt.toLocaleDateString('fr').format("dd MMM yyyy")}\n• Status: ${member.presence.status}\n• Activité: ${member.presence.activities}`)
        .setTitle(`**À propos de __${member.user.username}__**`)
        .setThumbnail(member.user.displayAvatarURL({dynamic : true, size : 256}))
    )
}

module.exports.config = {
    command: 'stat',
    aliases: ['stats'],
    cUsage: '&stat <@utilisateur | Identifiant>',
    description: 'Cette commande permet de voir les informations à propos du joueur choisis | voir tes informations avec `stat`.',
    category: 'Divers',
    notAlises: false,
    guildOnly: true
}
