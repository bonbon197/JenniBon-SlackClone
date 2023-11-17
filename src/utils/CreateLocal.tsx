import { getDB, setDB } from "../db/DBLayer";
import { User } from "../db/models/models";

interface SessionData {
    uid: string;
    access_token: string;
    client: string;
    expiry: string;
    status: string;
    receiver_id: string;
    receiver_email: string;
    receiver_class: string;
}

function createLocalUser(name: string, data: any) {
    const newUser = new User(data.id, name.toString(), data.email, data.password);
    addUserToDB(newUser);
}

function addUserToDB(user: User) {
    const db = getDB();
    db.users.push(user);
    setDB(db);
}

function createLocalPrivateMessagesHistory(data: any) {
    const db = getDB();
    const currentUser = db.users.find((user: any) => user.id === db.session.uid);

    const receiver_id = data.receiver_id;
    const receiver_email = data.receiver_email;
    const messageBody = data.body;

    const message = {
        id: currentUser.id,
        email: currentUser.email,
        body: messageBody,
    };

    addMessageToDB(receiver_id, message);

    db.session = {
        uid: receiver_id,
        access_token: db.session.access_token,
        client: db.session.client,
        expiry: db.session.expiry,
        status: 'online',
        receiver_id: receiver_id,
        receiver_email: receiver_email,
        receiver_class: 'User',
    };

    setDB(db);
}

function addMessageToDB(receiverId: string, message: any) {
    const db = getDB();
    if (!db.messages[receiverId]) {
        db.messages[receiverId] = [];
    }
    db.messages[receiverId].push(message);
    setDB(db);
}

function createLocalSession(data: any) {
    const db = getDB();
    const { headers } = data;

    if (headers) {
        const { uid, access_token, client, expiry } = headers;

        db.session = {
            uid: uid || '',
            access_token: access_token || '',
            client: client || '',
            expiry: expiry || '',
            status: 'offline',
            receiver_id: '',
            receiver_email: '',
            receiver_class: 'User',
        };

        setDB(db);
    }
}



export { createLocalUser, 
         createLocalSession, 
         createLocalPrivateMessagesHistory 
        };
