module.exports = {
    name: "8ball",
    exec: function(data){
        if(typeof data === "undefined") return;
        var username = data.username,
            channelName = data.channelName,
            parameters = data.parameters;
        
        var outcomes = ["It is certain", "It is decidedly so", "Without a doubt", "Yes - definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Signs point to yes", "Yes", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
        
        if(parameters.length>0){
            var rand = getRandomInt(0, outcomes.length-1);
            require("../bot.js").dexonbot.webClient.doSay(outcomes[rand]+', @'+username, channelName);
        }
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}