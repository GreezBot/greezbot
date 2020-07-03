const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    if(!args[0]) {
    let random = Math.floor(Math.random()*9)
    let alpha = [":zero:",":one:",":two:",":three:",":four:",":five:",":six:",":seven:",":eight:"]
    message.channel.send(alpha[random])
    }
    if(args[0]){
    if(isNaN(args[0])) return message.channel.send('Tu dois préciser un nombre pour générer aléatoirement un nombre entre 0 et ton nombre')
    let random = Math.floor(Math.random()*args[0])
    message.channel.send(random)
    }
}

module.exports.config = {
    command: 'dice',
    aliases: [],
    cUsage: '&dice <nombre>',
    description: 'Cette commande permet de générer un nombre aléatoire allant de 1 à votre nombre / 0 à 9.',
    category: 'Divers',
    notAlises: true,
    guildOnly: false
}
