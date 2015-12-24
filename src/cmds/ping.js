module.exports = {
    name: "ping",
    exec: function(data){
        if(typeof data === "undefined") return;
        var username = data.username,
            channelName = data.channelName,
            messageDate = Date.parse(data.msg.date),
            now = new Date().getTime();
        
        require("../bot.js").dexonbot.webClient.doSay("pong ("+(now - messageDate)+" ms)", channelName);
    }
};