const mongoose = require('mongoose')
const connectDb = async () => {

    try {
        await mongoose.connect(process.env.MongoUrl, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,

        });
        console.log('mongodb connected');
    } catch (error) {
        console.log('error connecting to db');
    }
};

module.exports = connectDb;