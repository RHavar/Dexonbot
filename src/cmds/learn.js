module.exports = {
    name: "learn",
    exec: function(data){
        if(typeof data === "undefined") return;
        
        var jsonf = require('json-file');
        
        var username = data.username,
            channelName = data.channelName,
            message = data.msg.message;
        
        if(username != "Dexon") return;
        
        var quotesFile = jsonf.read('db/quotes.json'),
            quotes = quotesFile.data.quotes;
            
        quotes.push(message.replace("!learn ", ""));
        quotesFile.set('quotes', quotes);
        quotesFile.writeSync();
    }
};