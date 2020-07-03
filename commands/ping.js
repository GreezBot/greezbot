const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args) => {
        message.delete()
        var ping = Date.now() - message.createdTimestamp + " ms"
        message.channel.send(new MessageEmbed().setColor('#ff0000').addField("Ping", `${Date.now() - message.createdTimestamp} ms`)).then(msg => msg.delete({timeout: 3000}))

    }

module.exports.config = {
    command: 'ping',
    aliases: [],
    cUsage: '&ping',
    description: 'Cette commande permet de faire un test de ping du bot.',
    category: 'Divers',
    notAlises: true,
    guildOnly: false
}