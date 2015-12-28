module.exports = {
    name: "ip",
    exec: function(data){
        if(typeof data === "undefined") return;
        
        if (typeof data.initialize !== "undefined" && data.initialize) {
            var http = require("http");
            
            var options = {
                host: 'ipinfo.io',
                port: 80,
                path: '/'
            };
            
            http.get(options, function(res) {
                res.on("data", function(chunk) {
                    console.log("[Dexonbot IP: "+JSON.parse(chunk).ip+"]");
                });
            });
        }
    }
};