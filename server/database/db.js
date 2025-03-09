const crypto = require('crypto');

class Message {
    constructor() {
        this.messages = [
            {
                text: "Hi there!",
                user: "Amando",
                added: new Date(),
                id: crypto.randomUUID(),
              },
              {
                text: "Hello World!",
                user: "Charles",
                added: new Date(),
                id: crypto.randomUUID()
              }
        ];
    }

    addMessage(message) {
        message.id = crypto.randomUUID();
        this.messages.push(message);
    }

    getMessages() {
        return this.messages;
    }

    getMessage(id) {
        return this.messages.find(message => message.id === id);
    }

    deleteMessage(id) {
        this.messages = this.messages.filter((_, index) => index !== id);
    }
}


module.exports = new Message();
  