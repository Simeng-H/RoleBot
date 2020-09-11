const idToCohort = require('./idToCohort')
const util = require('./util')
const Discord = require('discord.js');
const client = new Discord.Client();

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
    if (msg.channel.type !== 'dm'){
        return
    }
    if (msg.channel.type === 'dm') {
        if (msg.content === 'show discrepencies' && (msg.author.username === "Simeng Hao")){
            // console.log(await client.guilds)
            let guild = (await client.guilds.fetch('750494025806643370'))
            let members = guild.members.cache;
            // console.log(members);
            members.forEach((member, id) => {
                let name = member.nickname;
                if (name === null) {
                    name = member.user.username
                }
                if (name === null) {
                    return;
                }
                let cid = util.extractComputingID(name);
                let cohort = idToCohort[cid]
                if (cohort !== undefined) {
                    cohort = cohort.toLowerCase();
                }
                // console.log(`${cid}:${cohort}`);
                // guild.roles.cache.forEach((role)=>{
                //     console.log(role.name)
                // })
                let role = guild.roles.cache.find(r => r.name === cohort);
                if (role !== undefined) {
                    // console.log(`${cid}:${role.name}`);
                    // member.roles.add(role);
                    // console.log(role);
                    // console.log(member.roles.cache.has(role.id))
                    if (!member.roles.cache.has(role.id)) {
                        msg.reply(`${name}:${cohort}`)
                        // console.log(name)
                        // member.roles.cache.forEach((role)=>{
                        //     console.log(role.name)
                        //     console.log(role.id)
                        // })
                        // // console.log(cohort)
                        // console.log(role.name)
                        // console.log(role.id)
                    }
                }
            })
        }
    }
});

client.on('ready', async () => {
    // console.log(await client.guilds)
    let guild = (await client.guilds.fetch('753830434097463356'))
    let role = guild.roles.cache.find(r => r.name === "Test");
    let members = guild.members.cache
    // console.log(members);
    members.forEach((member, id) => {
        member.roles.add(role)
    })
})



// client.on('ready', async () => {
//     // console.log(await client.guilds)
//     let guild = (await client.guilds.fetch('753830434097463356'))
//     let role = guild.roles.cache.find(r => r.name === "Test");
//     let members = guild.members.cache
//     // console.log(members);
//     members.forEach((member, id) => {
//         member.roles.add(role)
//     })
// })

// CS 2110
client.on('ready', async () => {
    // console.log(await client.guilds)
    let guild = (await client.guilds.fetch('750494025806643370'))
    let members = guild.members.cache;
    // console.log(members);
    members.forEach((member, id)=>{
        let name = member.nickname;
        if(name === null){
            name = member.user.username
        }
        if(name === null){
            return;
        }
        let cid = util.extractComputingID(name);
        let cohort = idToCohort[cid]
        if(cohort !== undefined){
            cohort = cohort.toLowerCase();
        }
        // console.log(`${cid}:${cohort}`);
        // guild.roles.cache.forEach((role)=>{
        //     console.log(role.name)
        // })
        let role = guild.roles.cache.find(r => r.name === cohort);
        if(role !== undefined){
            // console.log(`${cid}:${role.name}`);
            // member.roles.add(role);
            // console.log(role);
            // console.log(member.roles.cache.has(role.id))
            // if(!member.roles.cache.has(role.id)){
            //     console.log(name)
            //     // member.roles.cache.forEach((role)=>{
            //     //     console.log(role.name)
            //     //     console.log(role.id)
            //     // })
            //     // // console.log(cohort)
            //     // console.log(role.name)
            //     // console.log(role.id)
            // }
        }
    })
})

// 2110
client.on('guildMemberAdd', (member)=>{
    if(member.guild.id == "750494025806643370"){
        const user = member.user;
        user.send("Welcome to the CS 2110 Server! Please change your name to be in the format <First Name> <Last Name> (<Computing ID>) so I can assign you to your cohort.")
        console.log(`a new member is here: ${user.username}`)
    }
})

// 2110 change nickname
client.on('guildMemberUpdate', async (oldmbr, newmbr) => {
    if (newmbr.guild.id == "750494025806643370") {
        let guild = (await client.guilds.fetch('750494025806643370'))
        if (oldmbr.nickname === newmbr.nickname) {
            return
        }
        const member = newmbr
        const user = member.user;
        let name = member.nickname;
        if (name === null) {
            name = user.username
        }
        if (name === null) {
            return;
        }
        let cid = util.extractComputingID(name);
        let cohort = idToCohort[cid]
        if (cohort !== undefined) {
            cohort = cohort.toLowerCase();
        }
        // console.log(`${cid}:${cohort}`);
        // guild.roles.cache.forEach((role)=>{
        //     console.log(role.name)
        // })
        let role = guild.roles.cache.find(r => r.name === cohort);
        if (role !== undefined) {
            // console.log(`${cid}:${role.name}`);
            member.roles.add(role);
            console.log(`${name} has been added to cohort ${cohort}`);
            // console.log(role);
            // console.log(member.roles.cache.has(role.id))
            // if (!member.roles.cache.has(role.id)) {
            //     console.log(name)
            //     // member.roles.cache.forEach((role)=>{
            //     //     console.log(role.name)
            //     //     console.log(role.id)
            //     // })
            //     // // console.log(cohort)
            //     // console.log(role.name)
            //     // console.log(role.id)
            // }
        }
    }
})

// client.on('guildMemberAdd', (member)=>{
//     if(member.guild.id == "753830434097463356"){
//         const user = member.user;
//         user.send("hi")
//     }
// })

// client.on('guildMemberUpdate', async (oldmbr, newmbr)=>{
//     if(newmbr.guild.id == "753830434097463356"){
//         const user = newmbr.user;
//         user.send("Welcome to the CS 2110 Server! Please change your name to be in the format <First Name> <Last Name> (<Computing ID>) so I can assign you to your cohort.")
//     }
// })

client.login('NzUzODI4ODY4MzY4MTA1NTM0.X1r31w.pjzJDPE1RALxtpxIlsIvm-9OBoU');

// 750494025806643370 : CS 2110