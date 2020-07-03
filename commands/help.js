const Discord = require('discord.js')
const { prefix } = require('../config.json')

module.exports.run = async (client, message, args) => {

    if(!args[0]) {
        let pages = ['Menu des Commandes', 'Modération', 'Musique', 'Divers']
        let page = 1
        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`**${pages[page-1]}**`)
        .setDescription(`<> = optionnel\n[] = obligatoire\n(option1, option2) = options\n\nUtilises '⏪' et '⏩' pour changer de page.\n\n**• Prefix :** ` + '```&```\n**• Exemple Commande :** ```&help stat```')
        .setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout : 60000 })
            msg.react('⏪').then(r => {
                msg.react('⏩')
                const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id
                const backwards = msg.createReactionCollector(backwardsFilter, { time : 60000 })
                const forwards = msg.createReactionCollector(forwardsFilter, { time : 60000 })
                backwards.on('collect', r => {
                    r.users.remove(message.author.id)
                    if (page === 1) return
                    page--
                    if(page === 1) {
                        embed.setTitle(`**${pages[page-1]}**`)
                        embed.setDescription(`<> = optionnel\n[] = obligatoire\n(option1, option2) = options\n\nUtilises '⏪' et '⏩' pour changer de page.\n\n**• Prefix:** ` + '```&```\n**• Exemple Commande:** ```&help stat```')
                        embed.setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
                        msg.edit(embed)
                    } else if(page === 2) {
                        embed.setTitle(`Liste des commandes pour : **${pages[page-1]}**`)
                        embed.setDescription('Utilise `&help <commande>` pour avoir les infos sur la commande.\n\n`Ban` • `Kick` • `Clear` • `Mute` • `Unmute` • `Warn` • `Unwarn`\n_')
                        embed.setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
                        msg.edit(embed)
                    } else if(page === 3) {
                        embed.setTitle(`Liste des commandes pour :  **${pages[page-1]}**`)
                        embed.setDescription('Utilise `&help <commande>` pour avoir les infos sur la commande.\n\n`Play` • `Next` • `Pause` • `Resume` • `Nowplaying` • `Queue` • `Volume` • `Disconnect`\n_')
                        embed.setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
                        msg.edit(embed)
                    }
                })
                forwards.on('collect', r => {
                    r.users.remove(message.author.id)
                    if (page === pages.length) return
                    page++
                    if(page === 2) {
                        embed.setTitle(`Liste des commandes pour : **${pages[page-1]}**`)
                        embed.setDescription('Utilise `&help <commande>` pour avoir les infos sur la commande.\n\n`Ban` • `Kick` • `Clear` • `Mute` • `Unmute` • `Warn` • `Unwarn`\n_')
                        embed.setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
                        msg.edit(embed)
                    } else if(page === 3) {
                        embed.setTitle(`Liste des commandes pour : **${pages[page-1]}**`)
                        embed.setDescription('Utilise `&help <commande>` pour avoir les infos sur la commande.\n\n`Play` • `Next` • `Pause` • `Resume` • `Nowplaying` • `Queue` • `Volume` • `Disconnect`\n_')
                        embed.setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
                        msg.edit(embed)
                    } else if(page === 4) {
                        embed.setTitle(`Liste des commandes pour : **${pages[page-1]}**`)
                        embed.setDescription('Utilise `&help <commande>` pour avoir les infos sur la commande.\n\n`Stat` • `Serverstat` • `Math` • `8Ball` • `Dice` • `Good • `Lose``\n_')
                        embed.setFooter(`[ ${page} / ${pages.length} ] • ${message.author.tag}`)
                        msg.edit(embed)
                    }
                })
            })
        })
    }
    if(args[0]) {
        let command = args[0]
        let aliasName
        if(client.commands.has(command)) {
            command = client.commands.get(command)
            if(command.config.notAlises === true) {
                aliasName = 'Pas d\'alias'
            } else {
                aliasName = command.config.aliases
            }
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Informations à propos de la commande : **' + command.config.command.toUpperCase() + '**')
            .setColor('#ff0000')
            .setDescription(`Catégorie: **${command.config.category} **\n_ _`)
            .addField(`Description`, `\`\`\` ${command.config.description} \`\`\``)
            .addField(`Usage Correct`, command.config.cUsage, true)
            .addField(`Alias`, aliasName, true)
            .setThumbnail(client.user.displayAvatarURL())
            ).then(msg => msg.delete({ timeout : 60000 }))       
        } else {
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('Veuillez entrer une commande valide.')
            ).then(msg => msg.delete({ timeout : 3000}))
        }
    } 
}

module.exports.config = {
    command: 'help',
    aliases: [],
    cUsage: '&help <commande>',
    description: 'Cette commande permet d\'afficher les informations à propos des commandes.',
    category: 'Modération',
    notAlises: true,
    guildOnly: true
}
