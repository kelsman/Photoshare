const mongoose = require('mongoose')
const connectDb = async () => {

    try {
        await mongoose.connect(process.env.MongoUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false

        });
        console.log('mongodb connected');
    } catch (error) {
        console.log('error connecting to db');
    }
};

module.exports = connectDb;