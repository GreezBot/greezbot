const Discord = require('discord.js')
const moment = require('moment')

module.exports.run = async (client, message, args) => {
    moment.locale('fr')
    console.log(moment(message.author.createdAt).fromNow())
    
}

module.exports.config = {
    command: 'format',
    aliases: [],
    cUsage: '&example <> []',
    description: 'Cette commande est un test.',
    notAlises: false,
    guildOnly: false
}
