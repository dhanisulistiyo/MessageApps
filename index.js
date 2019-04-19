import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import http from 'http';
import { resolvers, typeDefs } from './schema/message'

const PORT = process.env.PORT || 3500
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.get('/', (req, res) => {
  res.send({ hello: 'This Apps' })
})

httpServer.listen(PORT, () =>{
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

