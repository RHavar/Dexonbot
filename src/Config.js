var sensitive = require('../../../sensitive_data/data');
module.exports = {
    GAMESERVER: "https://gs.bustabit.com",
    WEBSERVER: "https://www.bustabit.com",
    SESSION: process.env.BOT_SESSION || sensitive.BOT_SESSION || "",
    PASSWORD: process.env.BOT_PASSWORD || sensitive.BOT_PASSWORD || ""
};