class User {
    id: string;
    name: string;
    email: string;
    password: string;
    messages: {};
    
    constructor(id: string, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.messages = {};
    }
}

class Channel {
    id: string;
    name: string;
    members: {};
    messages: {};
    
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.messages = {};
        this.members = {};
    }
}

export { User,
         Channel };