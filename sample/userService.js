// simple user service (ES6)
class userService {
    constructor() {
    }

    getById(id) {
        return { id: 123, name: 'peter' }
    }
    getAll() {
        return [
            { id: 123, name: 'peter' },
            { id: 222, name: 'robbert' },
            { id: 222, name: 'jan' }
        ]
    }
}

// expose userService to other modules
module.exports = new userService();
