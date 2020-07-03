const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

        await message.delete()

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission de faire ceci.")

        if (!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer (2 - 100).").then(msg => msg.delete({timeout: 3000}))
        if(isNaN(args[0])) return message.channel.send("Tu dois préciser un nombre de messages à supprimer (2 - 100).").then(msg => msg.delete({timeout: 3000}))
        if (args[0] < 2) return message.channel.send("Tu dois préciser un nombre de messages à supprimer (2 - 100).").then(msg => msg.delete({timeout: 3000}))
        if (args[0] > 100) return message.channel.send("Je ne peux pas supprimer plus de 100 messages.").then(msg => msg.delete({timeout: 3000}))

        try {
        await message.channel.bulkDelete(args[0]).then(() => {

            message.channel.send(`${args[0]} messages ont été supprimés !`).then(msg => msg.delete({timeout: 3000}))

        })} catch {
            message.channel.send('Je n\'ai pas pu supprimer ces message car ils datent de plus de 14 jours').then(msg => msg.delete({timeout: 3000}))
        }

    }

module.exports.config = {
    command: 'clear',
    aliases: ['purge', 'clean'],
    cUsage: '&clear [Nombre entre 2 et 100]',
    description: 'Cette commande permet de supprimer des messages en certaine quantité datant de moins de 14 jours.',
    category: 'Modération',
    notAlises: false,
    guildOnly: true
}