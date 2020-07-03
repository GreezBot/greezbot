const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async (client, message, args) => {


        if (!message.member.hasPermission('MANAGE_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')).then(msg => msg.delete({timeout: 3000}))
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Veuillez mentionner le membre à unmute.')).then(msg => msg.delete({timeout: 3000}))
        if(!member.roles.cache.has(config.roleMute)) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Ce membre n\'est pas mute')).then(msg => msg.delete({timeout: 3000}))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.roles.remove(config.roleMute,`${reason}`)
        message.guild.channels.cache.get(config.sanChan).send(new Discord.MessageEmbed()
        .setTitle(`Unmute`)
        .setColor('#ff0000')
        .setDescription('_ _')
        .addField(`Membre`, member.user, true)
        .addField(`Par`, message.author, true)
        .addField(`Raison`, reason)
        .setTimestamp()
        )

    }
    module.exports.config = {
        command: 'unmute',
        aliases: ['demute'],
        cUsage: '&unmute [@utilisateur | Identifiant] <Raison>',
        description: 'Cette commande permet de rendre la parole à un membre muet avec une raison.',
        category: 'Modération',
        notAlises: false,
        guildOnly: true
    }