module.exports = {
	name: "ping",
	exec: function(data){
		if(typeof data === "undefined") return;
		var username = data.username,
			channelName = data.channelName;

		this.webClient.doSay("pong", channelName);
	}
}