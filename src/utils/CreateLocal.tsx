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

//pass in the user id and some of the header data from the login response headers
function createLocalSession(data: { 
                                    id: any; 
                                    access_token: any; 
                                    client: any; 
                                    uid: any; 
                                    expiry: any; 
                                }){
    const db = getDB();
    db.session = {
        user_id: data.id,
        access_token: data.access_token,
        client: data.client,
        uid: data.uid,
        expiry: data.expiry
    }
    setDB(db);
}


export { createLocalUser };

