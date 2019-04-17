import messageRoute from '../routers/message'
import { gql, PubSub } from 'apollo-server-express'

const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';
const message = [];

export const typeDefs = gql`
  type Message {
    id: ID
    message: String
  }

  type Query {
    messages: [Message]
  }

  input CreateMessageInput {
    id: Int
    message: String
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message
  }

  type Subscription {
    messageAdd: [Message]
  }
`

export const resolvers = {
    Subscription: {
      messageAdd: {
        subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
      },
    },
    Query: {
        messages() {
          return messageRoute.list()
        }
    },
    Mutation: {
        createMessage(source, args) {
          message.push(args.input)
          pubsub.publish(MESSAGE_ADDED, { messageAdd: message });
          return messageRoute.create(args.input)
        }
      }
}