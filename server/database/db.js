const crypto = require('crypto');

class Message {
    constructor() {
        this.initialMessages = [
            {
                text: "Hi there!",
                user: "Amando",
                added: new Date(),
                image: "onizuka.png",
                id: crypto.randomUUID(),
            },
            {
                text: "Hello World!",
                user: "Charles",
                added: new Date(),
                image: "dandy.jpg",
                id: crypto.randomUUID()
            }
        ];
        
        this.messages = [...this.initialMessages];
        
        // stole this idea from Ryan, it resets every 5 minutes
        setInterval(() => {
            this.resetMessages();
        }, 5 * 60 * 1000);
    }

    resetMessages() {
        this.messages = [...this.initialMessages];
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

    // this isn't ever used lol
    deleteMessage(id) {
        this.messages = this.messages.filter((_, index) => index !== id);
    }
}

module.exports = new Message();
  