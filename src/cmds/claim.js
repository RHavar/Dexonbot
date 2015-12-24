module.exports = {
    name: "claim",
    exec: function(data){
        if(typeof data === "undefined") return;
        
        var uuid = require('node-uuid'),
            https = require("https");
        
        var username = data.username,
            channelName = data.channelName,
            isBot = data.msg.bot;
        
        if(isBot){
            require("../bot.js").dexonbot.webClient.doSay("[Lotto] Looks like @"+username+" is a bot! Ignoring his request :D", channelName);
            return;
        }
        
        if(require("../bot.js").lotto.winner && require("../bot.js").lotto.winner.username == username && require("../bot.js").lotto.winner.canClaim){
            require("../bot.js").lotto.winner.canClaim = false;
            
            var Config = require("../bot.js").dexonbot.Config;
            try{
                var bounty = parseInt(require("../bot.js").lotto.pot);
                // Build the post string from an object
                var post_data = encodeURI("amount="+bounty+
                    "&to-user="+username+
                    "&password="+Config.PASSWORD+
                    "&transfer-id="+uuid.v4());
                // An object of options to indicate where to post to
                var post_options = {
                    host: 'www.bustabit.com',
                    port: '443',
                    path: '/transfer-request',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': post_data.length,
                        'Access-Control-Allow-Credentials': true,
                        'Cookie': "id="+Config.SESSION
                    }
                };
                
                // Set up the request
                var post_req = https.request(post_options, function(res) {
                    res.setEncoding('utf8');
                });
                
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] @"+username+" claimed "+require("../bot.js").lotto.pot+" Bits!", channelName);
                require("../bot.js").lotto.users = [];
                require("../bot.js").lotto.cashout = getRandomInt(1, 15);
                console.log("[Lotto] "+require("../bot.js").lotto.winner.username+" claimed the lotto ("+require("../bot.js").lotto.pot+" Bits) -> new pot: "+require("../bot.js").lotto.basePot+" Bits | new Cashout: "+require("../bot.js").lotto.cashout+"x");
                require("../bot.js").lotto.pot = require("../bot.js").lotto.basePot;
                require("../bot.js").dexonbot.webClient.doSay("[Lotto] To participate to the next lotto, you must now cashout over: "+require("../bot.js").lotto.cashout+"x  (Type '!lotto' in chat for more details)", channelName);
                clearTimeout(require("../bot.js").lotto.winner.timeout);
                require("../bot.js").lotto.winner = false;
                
                // post the data
                post_req.write(post_data);
                post_req.end();
            }catch(e){
                console.error("[claim Error] ", e.message);
            }
        }
        
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}