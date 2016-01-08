module.exports = {
    name: "reminders",
    exec: function(data){
        if(typeof data === "undefined") return;
        
        if (typeof data.initialize !== "undefined" && data.initialize) {
            
            var reminders = [
                "Reminder: Use unique passwords. Using the same password at many places will make you end up getting hacked."
            ];
            
            setTimeout(function(){
                var rand = getRandomInt(0, reminders.length-1);
                doRemind(reminders[rand]);
            }, 10000);
            
            
            setInterval(function(){
                var rand = getRandomInt(0, reminders.length-1);
                doRemind(reminders[rand]);
            }, (1000*60)*30);
            
        }
        
        
    }
};

function doRemind(string){
    require("../bot.js").dexonbot.webClient.doSay(string, 'english');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
