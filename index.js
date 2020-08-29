const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzQ4ODc5OTg1Mzg0NjIwMTI1.X0j21g.9pkeYbHlaLoSA3BMHhg9SOENRgw';
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == 'embed') {
    let img = 'https://cdn.discordapp.com/attachments/732137832940044349/742707266762833920/image-5.png';
    let embed = new Discord.RichEmbed()
      .setTitle('DTX SCRIM')
      .setURL('https://cdn.discordapp.com/attachments/732137832940044349/742707266762833920/image-5.png')
      .setAuthor('DTX SCRIM BOT', img, 'https://cdn.discordapp.com/attachments/732137832940044349/742707266762833920/image-5.png')
      .setThumbnail(img)
      .addBlankField()
      .addField('DTX CRIM 3PM A조 로스터 ', '2시30분까지 SCRIM 통방에 전원 출첵 부탁드립니다. ( 사정떄문에 늦을 시 각 주관에게 DM주세요')
      .addField('SCRIM LURE', '전체 마이크 활성활 X, 국뽕 X, 인성질 X, SCRIM 진행중 SCRIM LURE를 어길 시 그 팀은 패널티가 있습니다.', true)
      .addField('SCRIM 주관 이름', 'F1_Windra', true)
      .addField('SCRIM 주관 이름', 'F!_Windra', true)
      .addField('3PM 로스터', `n1. < 우선권 >\n2. < 우선권 >\n3.\n4.\n5.\n6.\n7.\n8.\n9.\n10.\n11.\n12.\n13.\n14.\n15.')
      .addBlankField()
      .setTimestamp()
      .setFooter('DTX SCRIM SERVER 총괄', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);