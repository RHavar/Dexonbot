module.exports = {
    name: "quote",
    exec: function(data){
        if(typeof data === "undefined") return;
        
        var jsonf = require('json-file');
        
        var username = data.username,
            channelName = data.channelName,
            message = data.msg.message;
        
        var quotesFile = jsonf.read('db/quotes.json'),
            quotes = quotesFile.data.quotes;
        
        if(quotes.length>0){
            if(message.replace("!quote ", "").replace("!quote", "") != ""){
                var tempQuotes = [];
                for(var i=0; i<quotes.length; i++){
                    if(quotes[i].toLowerCase().indexOf(message.replace("!quote ", "").toLowerCase())>-1){
                        tempQuotes.push(quotes[i]);
                    }
                }
                if(tempQuotes.length>0){
                    var rand = getRandomInt(0, tempQuotes.length-1);
                    require("../bot.js").dexonbot.webClient.doSay('[Quote] '+tempQuotes[rand], channelName);
                }else{
                    require("../bot.js").dexonbot.webClient.doSay('[Quote] No quotes found :(', channelName);
                }
            }else{
                var rand = getRandomInt(0, quotes.length-1);
                require("../bot.js").dexonbot.webClient.doSay('[Quote] '+quotes[rand], channelName);
            }
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}