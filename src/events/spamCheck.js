module.exports = {
    name: "spamCheck",
    exec: function(data){
        if(typeof data === "undefined") return;
        
        var msg = data,
            spamList = require("../bot.js").spamList;
        
        var excludes = ["DexonBot", "Shiba"];
        if(excludes.indexOf(msg.username)>-1) return;
        
        spamList.push({
            username: msg.username,
            time: Date.parse(msg.date),
            message: msg.message
        });
        
        var tempUserSpamRecords = [];
        for(var i=0; i<spamList.length; i++){
            if((new Date()).getTime() - spamList[i].time > 3000){
                spamList.splice(i, 1);
            }
            
            if(spamList[i].username == msg.username){
                tempUserSpamRecords.push(spamList[i]);
            }
        }
        
        var spamStreak = 0;
        if(tempUserSpamRecords.length > 0){
            for(var i=0; i<tempUserSpamRecords.length; i++){
                if(tempUserSpamRecords[i].message == msg.message){
                    if(i!=tempUserSpamRecords.length-1 && tempUserSpamRecords[i+1].time-tempUserSpamRecords[i].time <= 3000) spamStreak++;
                }else{
                    if(i!=tempUserSpamRecords.length-1 && tempUserSpamRecords[i+1].time-tempUserSpamRecords[i].time <= 1000) spamStreak++;
                }
            }
        }
        
        if(spamStreak >= 3){
            spamStreak = 0;
            require("../bot.js").dexonbot.webClient.doSay("/mute "+msg.username+" 3m", msg.channelName);
            require("../bot.js").dexonbot.webClient.doSay("@"+msg.username+" don't spam please.", msg.channelName);
            console.log("Muted "+msg.username+" for Spamming channel '"+msg.channelName+"'");
        }
        
    }
}