const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://oussama:Ipozoxvo123@clustertoutoucare.igrzp4q.mongodb.net/toutoucare?retryWrites=true&w=majority'

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
