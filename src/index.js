// src/index.js

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})

server
  .listen(9000)
  .then(({ url }) => console.log('Server is running on localhost:9000'))