const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

module.exports = morgan(
    ':req[x-forwarded-for] - [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":req[x-requested-with]" ":referrer" ":user-agent"',
    {stream: fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), { flags: 'a' })}
);
