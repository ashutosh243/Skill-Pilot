import mongoose from "mongoose";
import config from '../config/config.js';


async function connection(){
        try{
            await mongoose.connect(config.mongoUrl)
            console.log("connected to database",mongoose.connection.name)
        }
        catch(e)
        {
            console.log("Error in database connection",e);
        }
}
export default connection;