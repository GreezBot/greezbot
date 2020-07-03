const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(msg => msg.delete({timeout: 3000}))
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return  message.channel.send('Veuillez mentionner le membre à mute.').then(msg => msg.delete({timeout: 3000}))
        if(member.roles.cache.has(config.roleMute)) return message.channel.send('Ce membre est déjà mute').then(msg => msg.delete({timeout: 3000}))
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute le propriétaire du serveur.').then(msg => msg.delete({timeout: 3000}))
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre.').then(msg => msg.delete({timeout: 3000}))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.roles.add(config.roleMute,`${reason}`)
        message.guild.channels.cache.get(config.sanChan).send(new Discord.MessageEmbed()
        .setTitle(`Mute`)
        .setColor('#ff0000')
        .setDescription('_ _')
        .addField(`Membre`, member.user, true)
        .addField(`Par`, message.author, true)
        .addField(`Raison`, reason)
        .setTimestamp()
        )
}

module.exports.config = {
        command: 'mute',
        aliases: [],
        cUsage: '&mute [@utilisateur | Identifiant] <Raison>',
        description: 'Cette commande permet de rendre muet un membre avec une raison.',
        category: 'Modération',
        notAlises: true,
        guildOnly: true
}