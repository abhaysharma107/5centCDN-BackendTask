var mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log("Connection Successful");
    }
    else {
        console.log("error in connection:"+JSON.stringify(err, undefined, 2));
    }
})

require('./users.model')
require('./post.model')