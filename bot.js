const idToCohort = require('./idToCohort')
const util = require('./util')
const Discord = require('discord.js');
const { extractComputingID } = require('./util');
const client = new Discord.Client();



const excludedIDs = [
    'mtl2mr',
    'mgb2gr'
]

// client.user.setUsername("RoleBot")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// client.on('ready', async() => {
//     let guild = (await client.guilds.fetch('750494025806643370'))
//     guild.roles.cache.forEach((role, key)=>{
//         if(role.name == 'cohort-g12'){
//             console.log(role.name);
//             console.log(role.id)
//         }
//     })

// });

// process dm
client.on('message', msg => {
    if(msg.channel.type !== 'dm'){return}
    if(msg.author.bot){return}
    console.log(`new dm message from ${msg.author.username}: ${msg}`);
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

});

// show discrepencies in CS 2110
client.on('message', async msg => {
    if (msg.channel.type !== 'dm') {
        return
    }
    if (msg.content !== 'show discrepencies') return;
    if (msg.author.username !== "Simeng Hao") return;
    let guild = (await client.guilds.fetch('750494025806643370'))
    let members = guild.members.cache;
    console.log("Discrepencies: ")
    members.forEach((member, id) => {
        const user = member.user;
        let nickname = member.nickname
        let username = user.username;

        // if the nickname contains a computing id then use that
        let computingID = extractComputingID(nickname);

        // otherwise see if the usernames contains computing id
        if (computingID === '') {
            computingID = extractComputingID(username)
        }

        // if not then there's nothing we can do. 
        if (computingID === '') {
            return;
        }

        // Or if we manually ignores it.
        if (excludedIDs.includes(computingID)) {
            return;
        }

        let cohort = idToCohort[computingID];

        // we don't know what cohort the person is in.
        if (!cohort) {
            return
        }

        cohort = cohort.toLowerCase();
        let role = guild.roles.cache.find(r => r.name === cohort);
        if (role == undefined) {
            return;
        }
        if (member.roles.cache.has(role.id)) {
            return;
        }
        console.log(`${computingID}, ${cohort}`)
    })


});


// 2110
client.on('guildMemberAdd', async (member) => {
    if (member.guild.id !== "750494025806643370") return;

    const user = member.user;
    user.send("Welcome to the CS 2110 Server! Please change your name to be in the format <First Name> <Last Name> (<Computing ID>) so I can assign you to your cohort.")
    console.log(`a new member is here: ${user.username}`)
    client.emit('guildMemberUpdate', member,member)
})

// master listener, everything else should trigger this.
client.on('guildMemberUpdate', async (oldmbr, newmbr)=>{
    if (newmbr.guild.id !== "750494025806643370"){
        return;
    }
    let guild = (await client.guilds.fetch('750494025806643370'))
    const member = newmbr
    const user = member.user;
    let nickname = member.nickname
    let username = user.username;

    // if the nickname contains a computing id then use that
    let computingID = extractComputingID(nickname);

    // otherwise see if the usernames contains computing id
    if(computingID === ''){
        computingID = extractComputingID(username)
    }

    // if not then there's nothing we can do. 
    if(computingID === ''){
        return;
    }

    // Or if we manually ignores it.
    if(excludedIDs.includes(computingID)){
        return;
    }

    let cohort = idToCohort[computingID];

    // we don't know what cohort the person is in.
    if(!cohort){
        return
    }

    cohort = cohort.toLowerCase();
    let role = guild.roles.cache.find(r => r.name === cohort);
    if (role == undefined) {
        return;
    }
    if (member.roles.cache.has(role.id)){
        return;
    }
    member.roles.add(role);
    console.log(`${name} has been added to cohort ${cohort}`);
})

client.login('NzUzODI4ODY4MzY4MTA1NTM0.X1r31w.pjzJDPE1RALxtpxIlsIvm-9OBoU');

// 750494025806643370 : CS 2110