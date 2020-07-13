const Discord = require('discord.js'),
    ytdl = require('ytdl-core'),
    YouTube = require ('simple-youtube-api'),
    config = require('../config.json'),
    youtube = new YouTube(config.ytbApi)

module.exports.run = async (client, message, args, url, prefix, serverQueue, queue) => {
    const searchString = args.slice(0).join(' ')
    const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Tu dois être dans un salon vocal 🎤 pour executer cette commande.')
        )
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Tu dois spécifier le titre/lien <:youtube:725321171184255098> de la musique.')
        )
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Je n\'ai pas la permission de me connecter à ce salon vocal 🎤')
        )
        if(!permissions.has('SPEAK')) return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('Je n\'ai pas la permission de parler dans ce salon vocal 🎤')
        )
 
        try {
            var video = await youtube.getVideo(url)
        } catch {
            try {
                var videos = await youtube.searchVideos(searchString, 1)
                var video = await youtube.getVideoByID(videos[0].id)
            } catch {
                return message.channel.send(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription('Je n\'ai pas trouvé de resultat correspondant à votre 🔎 recherche.')
                )
            }
        }
 
        const song = {
            id: video.id,
            title: video.title,
            channel: video.channel,
            duration: video.duration,
            image: video.thumbnails.high.url,
            url: `https://www.youtube.com/watch?v=${video.id}`
        }
 
        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                author: message.author,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 0.5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)
 
            queueConstruct.songs.push(song)
 
            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`Il y a une erreur quand j'essaye de me connecter au salon vocal: ${error}`)
               queue.delete(message.guild.id)
               return message.channel.send(new Discord.MessageEmbed()
               .setColor('#ff0000')
               .setDescription(`Il y a une erreur quand j'essaye de me connecter au salon vocal 🎤: ${error}`)
               )
            }
        } else {   
            serverQueue.songs.push(song)      
            return message.channel.send('<:youtube:725321171184255098> **Recherche** 🔎  `' + searchString + '` ',
            new Discord.MessageEmbed()
                .setAuthor('Ajouté à la file', message.author.displayAvatarURL())
                .setDescription(`**[${song.title}](${song.url})**`)
                .setColor('#ff0000')
                .addField('Chaîne', video.channel.title, true)
                .addField('Durée du son', `${video.duration.hours}h ${video.duration.minutes}m ${video.duration.seconds}s`, true)
                .setThumbnail(video.thumbnails.high.url)
            )
                
        }
        return undefined

        function play(guild, song) {
            const serverQueue = queue.get(guild.id)
            if(!song) {
                setTimeout(() => {

                    message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Je me suis déconnecté car il n'y avait plus de musique.`)
                    .setColor('#ff0000')
                    )
                    serverQueue.voiceChannel.leave()
                    queue.delete(guild.id)


                }, 15000)
                
                return
            }
         
            const dispatcher = serverQueue.connection.play(ytdl(song.url))
            .on('finish', () => {
                serverQueue.songs.shift()
                play(guild, serverQueue.songs[0])
            })
            .on('error', error => {
                console.log(error)
            })
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
        
            serverQueue.textChannel.send(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Je lance**')
                .setDescription(`[${song.title}](${song.url}) [${serverQueue.author}]`)
            )
        }

}

module.exports.config = {
    command: 'play',
    aliases: ['p'],
    cUsage: '&play [Nom de la musique | lien de la musique]',
    description: 'Cette commande permet de jouer une musique youtube.',
    category: 'Musique',
    notAlises: false,
    guildOnly: true
}
