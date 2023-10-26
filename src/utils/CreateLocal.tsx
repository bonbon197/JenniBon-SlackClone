import { getDB, setDB } from "../db/DBLayer";
import { User } from "../db/models/models";

function createLocalUser(name: string, 
                         response: any) {
    const userData = JSON.parse(JSON.stringify(response));


    const newUser = new User(
                             userData.data.id, 
                             name.toString(), 
                             userData.data.email, 
                             userData.data.password
                            );

    const db = getDB();
    db.users.push(newUser);
    setDB(db);

}

function createLocalChannels(){}
function createLocalMessages(){}
function createLocalPrivateMessagesHistory(data: any){
    const db = getDB();
    const currentUser = db.users.find((user: any) => user.id === db.session.uid);

    //get the receiver id from the data passed in
    const receiver_id = data.receiver_id;
    //get the receiver email from the data passed in
    const receiver_email = data.receiver_email;
    //get the body of the message from the data passed in
    const messageBody = data.body;

    //create an object that uses the receiver id as the key and the value is an array of messages
    const messages = {
        [receiver_id]: [
            {
                id: currentUser.id,
                email: currentUser.email,
                body: messageBody
            }
        ]
    }
    //if the receiver id already exists in the messages object, push the new message to the array
    if(db.messages[receiver_id]){
        db.messages[receiver_id].push({
            id: currentUser.id,
            email: currentUser.email,
            body: messageBody
        })
    }
    //if the receiver id does not exist in the messages object, add the receiver id as a key and the new message as an array
    else{
        db.messages[receiver_id] = [
            {
                id: currentUser.id,
                email: currentUser.email,
                body: messageBody
            }
        ]
    }
    //set the receiver id and email in the session
    db.session.receiver_id = receiver_id;
    db.session.receiver_email = receiver_email;
    //set the messages in the session
    db.session.messages = messages;
    //set the active user in the session
    db.session.activeUser = currentUser;
    //set the status of the active user to online
    db.session.status = 'online';
    //save the db
    setDB(db);
}

//pass in the user id and some of the header data from the login response headers. Local session specifies who is logged in. Data saved can be used to be a reference when sending requests to external endpoints
function createLocalSession(data: any){
    const db = getDB();
    db.session = {
        uid: data.headers.uid,
        access_token: data.headers.access_token,
        client: data.headers.client,
        expiry: data.headers.expiry,
        //integrated activeUser in session instead of a separate thing. Not sure if this is a good idea
        status: 'offline',
        receiver_id: '',
        receiver_email: '',
        receiver_class: 'User'
    }
    setDB(db);
}


export { 
        createLocalUser,
        createLocalSession,
        createLocalPrivateMessagesHistory
       };

