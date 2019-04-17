import axios from 'axios'

class Message {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  list() {
    return this.api.get('/messages').then(res => res.data)
  }

  create(data) {
    return this.api.post('/messages', data).then(res => res.data).catch(err => err)
  }
}

export default new Message()