const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')).then(msg => msg.delete({timeout: 3000}))
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Veuillez mentionner le membre à bannir.')).then(msg => msg.delete({timeout: 3000}))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous ne pouvez pas bannir le propriétaire du serveur.')).then(msg => msg.delete({timeout: 3000}))
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous ne pouvez pas bannir ce membre.')).then(msg => msg.delete({timeout: 3000}))
        if (!member.bannable) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Le bot ne peut pas bannir ce membre.')).then(msg => msg.delete({timeout: 3000}))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await message.guild.member(member).ban(reason)
        message.guild.channels.cache.get(config.sanChan).send(new Discord.MessageEmbed()
        .setTitle(`Ban`)
        .setColor('#ff0000')
        .setDescription('_ _')
        .addField(`Membre`, member.user, true)
        .addField(`Par`, message.author, true)
        .addField(`Raison`, reason)
        .setTimestamp()
        )
}

module.exports.config = {
    command: 'ban',
    aliases: [],
    cUsage: '&ban [@utilisateur | Identifiant] <Raison>',
    description: 'Cette commande permet de bannir un membre avec une raison.',
    category: 'Modération',
    notAlises: true,
    guildOnly: true
}