
require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const session = require('express-session')
const http = require('http');


//Type defs import
const typeDefs = require('./src/typeDefs/index')
const resolvers = require('./src/resolvers/index')

// mongoose.set('useCreateIndex', true);
mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to mongo', err));


const index = express();

//Initializing things
index.use(cookieParser());
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)

module.exports = index;
