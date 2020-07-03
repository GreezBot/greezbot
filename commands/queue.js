const Discord = require('discord.js')

module.exports.run = async (client, message, args, url, prefix, serverQueue, queue) => {

    if(!serverQueue) return message.channel.send('Il n\'y a aucune musique en cours.')
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('__**File D\'Attente**__')
        .setDescription(`${serverQueue.songs.map(song => `**-** [${song.title}](${song.url})`).join('\n')}`)
        .addField('__**En cours**__', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, { split: true})
        )
        return undefined
    
}

module.exports.config = {
    command: 'queue',
    aliases: [],
    cUsage: '&queue',
    description: 'Cette commande permet de voir la file de musiques.',
    category: 'Musique',
    notAlises: true,
    guildOnly: true
}
