const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.once('open',function(err){
    if(err){
        console.log("Database Not Connected");
    }
    console.log("Database Is Connected");
});
module.exports=db;