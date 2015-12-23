/* MODULES
-----------------*/


/* BOT
-----------------*/
function DexonBot(){
    var self = this,
        Config = require('./Config'),
        GameClient = require('./GameClient'),
        WebClient = require('./WebClient');

    // Set bot's session cookie for connections
    require('socket.io-client-cookie').setCookies('id=' + Config.SESSION);

    // Connect to the game server.
    //self.gameClient = new GameClient(Config);

    // Connect to the web server.
    self.webClient = new WebClient(Config);

    // New message in chat.
    self.webClient.on('msg', function(msg) {
        if(msg.message[0] == "!"){ // User calling a bot command
            var cmd = msg.message.split(" ")[0].replace("!", ""),
                username = msg.username,
                channelName = msg.channelName,
                parameters = [];
            for(var i=1; i<msg.message.split(" ").length; i++){
                var parameter = msg.message.split(" ")[i];
                parameters.push(parameter);
            }
            self.onCmd(cmd, {
                username: username,
                channelName: channelName,
                msg: msg,
                parameters: parameters
            });
        }
    });

    self.onCmd = function(cmd, data){
        try{
            switch(cmd.toLowerCase()) {
                case "ping":
                    require("./cmds/ping.js").exec(data);
                    break;
            }
        }catch(e){
            console.error("[onCMD Error] ", e.message);
        }
    }
}
module.exports.dexonbot = new DexonBot();

/* UNCAUGHT EXCEPTIONS
-----------------*/
process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});