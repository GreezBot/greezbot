const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!args) return message.channel.send("Tu dois m'indiquer une personne !")
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`**Mince, ${member} tu t'es trompé tu vas devoir faire un gage !**`)
    .setImage('https://media1.giphy.com/media/eJ4j2VnYOZU8qJU3Py/200_d.gif')
    ).then(msg => msg.delete({ timeout: 30000 }))

}
    module.exports.config = {
        command: 'lose',
        aliases: [],
        cUsage: '&lose [@utilisateur | Identifiant]',
        description: 'Cette commande permet de blâmer un utilisateur.',
        category: 'Divers',
        notAlises: true,
        guildOnly: true
    }