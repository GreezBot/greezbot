const Discord = require("discord.js")
require("dotenv").config()
const client = new Discord.Client({
    partials: ["MESSAGE", "REACTION"],
    disableEveryone: true,
  }),
  { STATUS_CODES } = require("http"),
  ytdl = require("ytdl-core"),
  YouTube = require("simple-youtube-api"),
  queue = new Map(),
  AsciiTable = require("ascii-table"),
  Util = require("discord.js"),
  config = require("./config.json"),
  fs = require("fs"),
  youtube = new YouTube(config.ytbApi),
  prefix = config.prefix,
  moment = require('moment')

client.login(process.env.TOKEN)
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

moment.locale('fr')
const blacklist = require("./blacklist.json")

const invites = {}

//Command Handler
fs.readdir("./commands/", (err, files) => {
  if (err) throw err
  var cTable = new AsciiTable("Commandes")
  cTable.removeBorder()
  cTable.setHeading("Commande", "Statut")
  files.forEach((file) => {
    if (!file.endsWith(".js")) return
    const cmds = require(`./commands/${file}`)
    const cmdName = file.split(".")[0]
    client.commands.set(cmds.config.command, cmds)
    cTable.addRow(`${cmdName}`, "✅")
    cmds.config.aliases.forEach((alias) => {
      client.aliases.set(alias, cmds.config.command)
    })
  })
  console.log(cTable.toString())
})
//Ready
client.on("ready", () => {
  console.log(`Connecté en tant que ${client.user.tag}!`)
  client.guilds.cache.forEach((g) => {
    g.fetchInvites().then((guildInvites) => {
      invites[g.id] = guildInvites
    });
  });
  const guild = client.guilds.cache.get("529096130143846404")
  const totalUsers = client.channels.cache.get("727919006597513337")
  const statuses = [() => `Greez | &help`, () => `Dev par la RyTale`]
  let i = 0
  setInterval(() => {
    client.user.setActivity(statuses[i](), {
      type: "STREAMING",
      url: "https://www.twitch.tv/rytaletv",
    })
    i = ++i % statuses.length
    var userCount = guild.memberCount
    totalUsers.setName("Membres: " + userCount)
  }, 1e4)
})
//Message Handler
client.on("message", (message) => {
  if (message.mentions.has(client.user))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(
          `**Prefix du bot:** ${prefix}\nFais \`${prefix}help\` pour voir la liste des commandes.`
        )
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setFooter("Dev par la RyTale")
    )

  if (
    message.type !== "DEFAULT" ||
    message.author.bot ||
    message.channel.type == "dm"
  )
    return
  const args = message.content.trim().split(/ +/g)
  const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : ""
  const serverQueue = queue.get(message.guild.id)
  const commandFile = args.shift().toLowerCase()
  if (!commandFile.startsWith(config.prefix)) return
  const command =
    client.commands.get(commandFile.slice(config.prefix.length)) ||
    client.commands.get(
      client.aliases.get(commandFile.slice(config.prefix.length))
    )
  if (!command) return
  if (command.config.guildOnly && !message.guild)
    return message.channel.send(
      "Cette commande ne peut être éxecuter que dans un serveur."
    )
  command.run(client, message, args, prefix, url, serverQueue, queue)
})
//message
client.on("message", (message) => {

  if (message.content.toLowerCase().includes(prefix)) return
  if (message.author.bot || message.channel.type == "dm") return
  const blocked = blacklist.filter((word) =>
    message.content.toLowerCase().includes(word)
  )
  if (blocked.length > 0) {
    if (
      message.channel.id == "693520089013682257" ||
      message.member.roles.cache.has(config.whitelistRole)
    )
      return;
    console.log(`${message.author.tag} a envoyé "${blocked}".`)
    return message.delete().catch(console.error)
  }

  if (message.content.toLowerCase().includes("salut") || message.content.toLowerCase().includes("bonjour") || message.content.toLowerCase().includes("coucou") || message.content.toLowerCase().includes("slt") || message.content.toLowerCase().includes("bjr") || message.content.toLowerCase().includes("cc")) return message.react("👋")

  if (message.attachments.find(attachment => attachment.name ==  "20200529_013727.jpg")) message.delete()
  
})

//Join Message
client.on("guildMemberAdd", (member) => {
  guildID = ('529096130143846404')
  if(member.guild.id !== guildID) return
  let textChannel = member.guild.channels.cache.get('669894684797173761')
  member.guild.fetchInvites().then((guildInvites) => {
    const ei = invites[member.guild.id]
    invites[member.guild.id] = guildInvites
    const invite = guildInvites.find((i) => ei.get(i.code).uses < i.uses)
    const inviter = client.users.cache.get(invite.inviter.id)
    member.guild.channels.cache
      .get(config.greeting.channel)
      .send(
        `**${member} a rejoint le serveur !** Nous sommes désormais ${member.guild.memberCount} ! 🎉`,
        new Discord.MessageEmbed()
          .setTitle(`Bienvenue dans la **Rytale Community!**`)
          .setDescription(
            `Je t'invites à aller consulter le <#669877756712058891> et aller dans <#669879711672827917> afin de voir les informations à propos du serveur.\nVous pourrez aller consulter le salon <#670000656521625649> pour rejoindre la team **E-Sports**.\nEt pour finir, je vous conseille d'aller consulter <#670000507653455893> de temps en temps.`
          )
          .setAuthor(member.user.username, member.user.displayAvatarURL())
          .setColor("#00ff00")
          .setTimestamp()
          .setFooter(`Invité par ${inviter.tag} • Code: ${invite.code}`)
      )
    member.roles.add(config.greeting.role)
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`📥 ${member} **a rejoint le serveur.**`)
    .addField(`Création du compte`, `${moment(member.user.createdAt).fromNow()}.`)
    .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL()}`)
    .setFooter(`ID : ${member.id}`)
    .setTimestamp()
  )
  })
})
//Leave Message
client.on("guildMemberRemove", (member) => {
  guildID = ('529096130143846404')
  if(member.guild.id !== guildID) return
  let textChannel = member.guild.channels.cache.get('669894684797173761')
  member.guild.channels.cache.get(config.greeting.channel).send(
      new Discord.MessageEmbed()
        .setTitle("Aurevoir")
        .setDescription(`${member.user.tag} à quitté le serveur... Nous sommes plus que ${member.guild.memberCount} 😢`)
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setColor("#ff0000")
        .setTimestamp()
    )
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`📤 ${member} **a quitté le serveur.**`)
    .addField(`Membre depuis`, `${moment(member.joinedAt).fromNow()}.`)
    .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL()}`)
    .setFooter(`ID : ${member.id}`)
    .setTimestamp()
  )
})
//Reaction Add
client.on("messageReactionAdd", (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem) return
  const prop = reaction.emoji.id ? "id" : "name"
  const emoji = reactionRoleElem.emojis.find(
    (emoji) => emoji[prop] === reaction.emoji[prop]
  )
  if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
  else reaction.users.remove(user)
})
//Reaction Remove
client.on("messageReactionRemove", (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem || !reactionRoleElem.removable) return
  const prop = reaction.emoji.id ? "id" : "name"
  const emoji = reactionRoleElem.emojis.find(
    (emoji) => emoji[prop] === reaction.emoji[prop]
  )
  if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.on('voiceStateUpdate', (oldMember, newMember) => {

  let newUserChannel = newMember.channel
  let oldUserChannel = oldMember.channel

  if (!oldUserChannel && newUserChannel) {
    let textChannel = newMember.guild.channels.cache.get('669894684797173761')
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`${newMember.member} a rejoint le salon vocal **${newUserChannel.name}**`)
    .setAuthor(`${newMember.member.user.tag}`, `${newMember.member.user.displayAvatarURL()}`)
    .setFooter(`ID : ${newMember.id}`)
    .setTimestamp()
    )
  } else if (oldUserChannel && !newUserChannel){
      let textChannel = oldMember.guild.channels.cache.get('669894684797173761')
      textChannel.send(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`${oldMember.member} a quitté le salon vocal **${oldUserChannel.name}**`)
      .setAuthor(`${oldMember.member.user.tag}`, `${oldMember.member.user.displayAvatarURL()}`)
      .setFooter(`ID : ${oldMember.id}`)
      .setTimestamp()
    )
  } else if(oldUserChannel && newUserChannel) {
      if(oldUserChannel !== newUserChannel){
        let textChannel = newMember.guild.channels.cache.get('669894684797173761')
        textChannel.send(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`${newMember.member} a été déplacé.`)
      .addField(`Channel Avant`, oldUserChannel.name, true)
      .addField(`Channel Après`, newUserChannel.name, true)
      .setAuthor(`${newMember.member.user.tag}`, `${newMember.member.user.displayAvatarURL()}`)
      .setFooter(`ID : ${newMember.id}`)
      .setTimestamp()
      )
    } else {
      let textChannel = newMember.guild.channels.cache.get('669894684797173761')
      textChannel.send(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription(`${newMember.member} a été mute/demute.`)
      .setAuthor(`${newMember.member.user.tag}`, `${newMember.member.user.displayAvatarURL()}`)
      .setFooter(`ID : ${newMember.id}`)
      .setTimestamp()
      )
    }
  } 
})

client.on('guildBanAdd', async (guild, member) => {
  guildID = ('529096130143846404')
  if(guild.id !== guildID) return
  let textChannel = guild.channels.cache.get('669894684797173761')

	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
  })
  
	const banLog = fetchedLogs.entries.first()

	if (!banLog) return console.log(`${member.tag} was banned from ${guild.name} but no audit log could be found.`)

  const { executor, target } = banLog
  
	if (target.id === member.id) {
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`${member.tag} a été banni par ${executor.tag}.`)
    .setAuthor(`Bannissement`, `${member.displayAvatarURL()}`)
    .setThumbnail(member.displayAvatarURL())
    .setFooter(`ID : ${member.id}`)
    .setTimestamp()
  )
	} else {
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`${member.tag} a été banni.`)
    .setAuthor(`Bannissement`, `${member.displayAvatarURL()}`)
    .setThumbnail(member.displayAvatarURL())
    .setFooter(`ID : ${member.id}`)
    .setTimestamp()
  )
	}
})

/*client.on('guildBanRemove', async (guild, member) => {
  guildID = ('529096130143846404')
  if(guild.id !== guildID) return
  let textChannel = guild.channels.cache.get('669894684797173761')

	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
  })
  
	const banLog = fetchedLogs.entries.first()

	if (!banLog) return console.log(`${member.tag} was banned from ${guild.name} but no audit log could be found.`)

  const { executor, target } = banLog
  
	if (target.id === member.id) {
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`${member.tag} a été banni par ${executor.tag}.`)
    .setAuthor(`Bannissement`, `${member.displayAvatarURL()}`)
    .setThumbnail(member.displayAvatarURL())
    .setFooter(`ID : ${member.id}`)
    .setTimestamp()
  )
	} else {
    textChannel.send(new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`${member.tag} a été banni.`)
    .setAuthor(`Bannissement`, `${member.displayAvatarURL()}`)
    .setThumbnail(member.displayAvatarURL())
    .setFooter(`ID : ${member.id}`)
    .setTimestamp()
  )
	}
})*/