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

//pass in the user id and some of the header data from the login response headers. Local session specifies who is logged in. Data saved can be used to be a reference when sending requests to external endpoints
function createLocalSession(data: {
                                    headers: any; 
                                }){
    const db = getDB();
    db.session = {
        uid: data.headers.uid,
        access_token: data.headers.access_token,
        client: data.headers.client,
        expiry: data.headers.expiry
    }
    setDB(db);
}


export { 
        createLocalUser,
        createLocalSession
       };

