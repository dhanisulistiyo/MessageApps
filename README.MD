# MessageApp


How to run:
- npm install
- npm run dev
- go to link http://localhost:3500/graphql in browser
- for get list all message use syntax:
query Message {
  messages {
    id
    message
  }
}

- for create message use syntax:
mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    message 
  }
}

- and query varible:
{
  "input": {
    "id": 2,
    "message": "test"
  }
}
- note ID cannot be same.

- for websocket use syntax (still error):
subscription {
  messageAdd {
    id
    message
  }
}

