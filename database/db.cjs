const mongoose = require("mongoose");
const connectToDB = async () => {
  await mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  });
};
module.exports = connectToDB;
