const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!args) return message.channel.send("Tu dois m'indiquer une personne !")
    message.channel.send(new Discord.MessageEmbed()
    .setColor('#00ff40')
    .setDescription(`**Bravo à ${member} pour avoir trouvé la bonne réponse !**`)
    .setImage('https://thumbs.gfycat.com/BitterPassionateCockatiel-size_restricted.gif')
    ).then(msg => msg.delete({ timeout: 30000 }))

}

module.exports.config = {
    command: 'good',
    aliases: [],
    cUsage: '&good [@utilisateur ou Identifiant]',
    description: 'Cette commande permet de féliciter un utilisateur.',
    category: 'Divers',
    notAlises: true,
    guildOnly: true
}