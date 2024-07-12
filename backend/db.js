const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/gofoody'; // Replace with your actual database name

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const itemsData = await mongoose.connection.db.collection("items").find({}).toArray();
    const categoryData = await mongoose.connection.db.collection("category").find({}).toArray();

    global.items = itemsData;
    global.category = categoryData;

    // console.log(global.items);
    // console.log(global.category);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
