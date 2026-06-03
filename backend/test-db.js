const mongoose = require("mongoose");

const uri =
  "mongodb+srv://dhanadevunoori_db_user:Admin1234@cluster0.qvslesi.mongodb.net/candidateportal?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed");
    console.error(err);
    process.exit(1);
  });