import { getDB, setDB } from "../db/DBLayer";
import { User } from "../db/models/user_model";

function createLocalUser(name: string, response: any) {
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


export { createLocalUser };

