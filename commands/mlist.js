const Discord = require('discord.js')
const mlist = require('../mlist.json')
module.exports.run = async (client, message, args) => {
    console.log(message.author.id)
    if(message.member.roles.cache.has('681617979393441815')) {
        message.channel.send(mlist)
    } else return
    
}

module.exports.config = {
    command: 'mlist',
    aliases: [],
    cUsage: '&mlist',
    description: 'Cette commande est un test.',
    notAlises: true,
    guildOnly: true
}
