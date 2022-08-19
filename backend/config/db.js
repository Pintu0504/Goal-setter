const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        //const URI = "mongodb+srv://Pintu0504:Meenadevi0504%40@goalsetter.aphlpaf.mongodb.net/mernapp?retryWrites=true&w=majority"
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB