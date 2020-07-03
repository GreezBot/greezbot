const Discord = require('discord.js'),
    config = require('../config.json'),
    fs = require('fs'),
    ms = require('ms')

const warns = JSON.parse(fs.readFileSync("./warns.json", "utf-8"))
module.exports.run = async (client, message, args) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.')).then(msg => msg.delete({timeout: 3000}))
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Veuillez mentionner le membre à avertir.')).then(msg => msg.delete({timeout: 3000}))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous ne pouvez pas avertir le propriétaire du serveur.')).then(msg => msg.delete({timeout: 3000}))
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription('Vous ne pouvez pas avertir ce membre.')).then(msg => msg.delete({timeout: 3000}))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        /*let warnings = db.get(`warnings_${message.guild.id}_${member.id}`)
        if(warnings === 3) return message.channel.send(`${member.username} à atteint la limite des 3 avertissements.`)
        
        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${member.id}`, 1)
            await message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${member.user} à été averti. Pour voir les informations de l\'avertissement: <#${config.sanChan}>`)
            )

            message.guild.channels.cache.get(config.sanChan).send(new Discord.MessageEmbed()
            .setTitle(`Warn`)
            .setColor('#ff0000')
            .setDescription('_ _')
            .addField(`Membre`, member.user, true)
            .addField(`Par`, message.author, true)
            .addField(`Raison`, reason)
            .setTimestamp()
            )
        } else if(warnings !== null) {
            db.add(`warnings_${message.guild.id}_${member.id}`, 1)
            await message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${member.user} à été averti. Pour voir les informations de l\'avertissement: <#${config.sanChan}>`)
            )

            message.guild.channels.cache.get(config.sanChan).send(new Discord.MessageEmbed()
            .setTitle(`Warn`)
            .setColor('#ff0000')
            .setDescription('_ _')
            .addField(`Membre`, member.user, true)
            .addField(`Par`, message.author, true)
            .addField(`Raison`, reason)
            .setTimestamp()
            )
        }*/
        if(!warns[member.id]) warns[member.id] = {
            warns: 0,
        }
        warns[member.id].warns++
        fs.writeFileSync('./warns.json', JSON.stringify(warns))


}

module.exports.config = {
    command: 'warn',
    aliases: [],
    cUsage: '&warn [@utilisateur | Identifiant] <Raison>',
    description: 'Cette commande permet d\'avertir un membre avec une raison.',
    category: 'Modération',
    notAlises: true,
    guildOnly: true
}
