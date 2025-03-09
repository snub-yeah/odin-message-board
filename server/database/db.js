class Message {
    constructor() {
        this.messages = [
            {
                text: "Hi there!",
                user: "Amando",
                added: new Date()
              },
              {
                text: "Hello World!",
                user: "Charles",
                added: new Date()
              }
        ];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    getMessages() {
        return this.messages;
    }

    getMessage(id) {
        return this.messages[id];
    }

    deleteMessage(id) {
        this.messages = this.messages.filter((_, index) => index !== id);
    }
}


module.exports = new Message();
  