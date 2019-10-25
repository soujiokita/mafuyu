const Eris = require("eris");


var bot = new Eris.CommandClient("owo", {}, {
    description: "SimpleHelper maybe can help your coding time",
    owner: "sin",
    prefix: "$"
});



bot.on("ready", () => {
    console.log("I am up and running");
    
    bot.editStatus("online", {
        name:"$mafu = help | $stuck = debug instead",
        type: 0 // 0 = playing | 1 = streaming (Twitch only) | 2 = listening | 3 = watching
    });
});
bot.registerCommandAlias("mafuyu", "mafu"); // Alias ganti neng eris client


var echoCommand = bot.registerCommand("stuck", (msg, args) => { // Make an echo command
    if(args.length === 0) { // trigger nek kosong
        return "Invalid input";
    }
    dog = String(args).replace(/,/g, "+") // filteran string
    var text = bot.createMessage(msg.channel.id, {
        embed: {
            title: "Mafuyuhelper is here," + "\nReverse your code debug/stuck or fixing from each vendor.",
            description: ":bulb:https://stackoverflow.com/search?q="+dog +
            "\n:bulb:https://unix.stackexchange.com/search?q="+dog +
            "\n:bulb:https://www.quora.com/search?q="+dog +
            "\n:bulb:https://www.queryhome.com/search?q="+dog +
            "\n:bulb:https://www.reddit.com/search/?q="+dog +
            "\n:bulb:https://github.com/search?q="+dog+"&type=Issues" +
            "\n:bulb:https://www.codeproject.com/search.aspx?q="+dog +
            "\n:bulb:https://www.question2answer.org/qa/search?q="+dog,
            author: { // Author property
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            color: 15105570, // Color, either in hex (show), or a base-10 integer
         
            footer: { // Footer text
                text: "with Eris, invoked by " + msg.author.username,
            }
        }
    });+ args.join(" "); 
    return text; 
}, {
    description: "Code debug,ie example query: regex preg_match() extract image urls from text?\n> $stuck <args> <your stuck query>\n> **$stuck** regex preg_match() extract image urls from text?",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { 
    if(args.length === 0) { 
        return "Invalid input";
    }
    var text = args.join(" "); 
    text = text.split("").reverse().join(""); 
    return text; 
}, {
    description: "Make the bot say something in reverse",
    fullDescription: "Reverse your code debug/stuck or fixing from each vendor.",
    usage: "<text>" // Alias ganti neng eris client ngisor dewe
});

echoCommand.registerSubcommandAlias("backwards", "reverse"); 

bot.connect();