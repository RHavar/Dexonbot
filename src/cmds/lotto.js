module.exports = {
    name: "lotto",
    exec: function(data){
        if(typeof data === "undefined") return;
        var username = data.username,
            channelName = data.channelName,
            parameters = data.parameters;
        
        if(channelName == "english"){
            require("../bot.js").dexonbot.webClient.doSay("@"+username+" Please use another channel for that command.", channelName);
            return;
        }
        
        if(parameters.length === 0){
            require("../bot.js").dexonbot.webClient.doSay("[Lotto] Current pot: "+require("../bot.js").lotto.pot+" Bits | Cashout: "+require("../bot.js").lotto.cashout+".00x | Current amount of tickets: "+require("../bot.js").lotto.users.length+" (Type '!lotto help' for more details)", channelName);
        }else if(parameters.length === 1){
            if(parameters[0] == "pot"){
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] Current Pot: "+require("../bot.js").lotto.pot+" Bits", channelName);
            }else if(parameters[0] == "cashout"){
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] Current Cashout: "+require("../bot.js").lotto.cashout+".00x", channelName);
            }else if(parameters[0] == "next"){
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] Next draw in: "+(60-(new Date()).getUTCMinutes())+" mins", channelName);
            }else if(parameters[0] == "odds"){
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] Current amount of tickets: "+require("../bot.js").lotto.users.length+" "+(require("../bot.js").lotto.users.length>0?"| "+parseFloat(parseFloat((1/require("../bot.js").lotto.users.length)*100).toFixed(2))+"% of win for each tickets":""), channelName);
            }else if(parameters[0] == "help"){
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] To get tickets for the next draw, you must bet any amount of bits and cashout over the cashout point set by the lotto. Options: [help|pot|cashout|next|odds] (Example: !lotto odds)", channelName);
            }else if(parameters[0] == "forcedraw" && username == "Dexon"){
                require("../bot.js").lotto.mustDraw = true;
            }else{
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] Unknow command. Type '!lotto help' for more details", channelName);
            }
        }
        
        
    }
};