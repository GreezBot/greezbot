const Discord = require('discord.js')
const math = require('mathjs')

module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send('Veuillez spécifier un calcul.');
    let resp;
    try {
        resp = math.evaluate(args.join(' '))
    } catch (e) {
        return message.channel.send('Veuillez spécifier un calcul **Valide**.')
    }
    message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Calculatrice')
        .addField('Calcul', `\`\`\`\n${args.join(' ')}\`\`\``)
        .addField('Resultat', `\`\`\`\n${resp}\`\`\``)
    )
}

module.exports.config = {
    command: 'math',
    aliases: ['calcul'],
    cUsage: '&math [calcul]',
    description: 'Cette commande permet de faire les calculs à votre place.',
    category: 'Divers',
    notAlises: false,
    guildOnly: false
}
