
const BASE_URL = 'http://206.189.91.54/api/v1/auth/';

// register user data, function should only be passed an object with email, password, and password_confirmation
async function createUser(userData: { email: string; password: string; password_confirmation: string; }) {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": userData.email,
            "password": userData.password,
            "password_confirmation": userData.password_confirmation
        })
        
    })
    const data = await response.json();
    return data;
}


//login. save the response headers somewhere to use in the sendMessage function
async function loginUser(userData: { email: string; password: string; }) {

    const response = await fetch(`${BASE_URL}sign_in`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": userData.email,
            "password": userData.password,
        })
    });
    const data = await response.json();

    const headers = response.headers;

    const newData = {
        headers: {
        access_token: headers.get('access-token'),
        client: headers.get('client'),
        uid: headers.get('uid'),
        expiry: headers.get('expiry'),
        },
        data: data
    }


    console.log(newData)
    return newData;
}

//send message. Get header data from the login response headers
async function sendMessage(userData: { access_token: string; client: string; uid: number; expiry: Date; receiver_id: string; receiver_class: any; body: any; }) {
    const response = await fetch(`http://206.189.91.54/api/v1/messages`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid.toString(),
            'expiry': userData.expiry.toString(),
        },
        body: JSON.stringify({
            "receiver_id": userData.receiver_id,
            "receiver_class": userData.receiver_class,
            "body": userData.body,
        })
    });
    const data = await response.json();
    return data;
}


//get messages. Get header data from the login response headers 
async function getMessages(userData: { access_token: string; client: string; uid: number; expiry: Date; receiver_id:string}) {
    const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${userData.receiver_id}&receiver_class=User`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid.toString(),
            'expiry': userData.expiry.toString(),
        },
    });
    const data = await response.json();
    console.log(data)
        return data;
    
}

//create channel with members
async function createChannel(userData: { access_token: string; client: string; uid: number; expiry: number; name: string; user_ids: number; }) {
    const response = await fetch(`${BASE_URL}channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid.toString(),
            'expiry': userData.expiry.toString(),
        },
        body: JSON.stringify({
            "name": userData.name,
            "user_ids": userData.user_ids,
        })
    });
    const data = await response.json();
    return data;
}

//get all user's channels
async function getChannels(userData: { access_token: string; client: string; uid:number; expiry: number; }) {
    const response = await fetch(`${BASE_URL}channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid.toString(),
            'expiry': userData.expiry.toString(),
        },
    });
    const data = await response.json();
    return data;
}

//get channel details via channel id
async function getChannelDetails(userData: { channel_id: number; access_token: string; client: string; uid: number; expiry: number; }) {
    const response = await fetch(`${BASE_URL}channels/${userData.channel_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid.toString(),
            'expiry': userData.expiry.toString(),
        }
    });
    const data = await response.json();
    return data;
}

//add member to a channel
async function addMember(userData: { channel_id: number; access_token: string; client: string; uid: number; expiry: number; id: number; member_id: number; }) {
    const response = await fetch(`${BASE_URL}channels/${userData.channel_id}/add_member`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid.toString(),
            'expiry': userData.expiry.toString(),
        },
        body: JSON.stringify({
            "id": userData.id,
            "member_id": userData.member_id,
        })
    });
    const data = await response.json();
    return data;
}

//list of all users
async function getUsers(userData: { access_token: any; client: any; uid: any; expiry: any; }) {
    const response = await fetch(`http://206.189.91.54/api/v1/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'access-token': userData.access_token,
            'client': userData.client,
            'uid': userData.uid,
            'expiry': userData.expiry,
        }
    });
    const data = await response.json();
    return data;
}





export {
    createUser,
    loginUser,
    sendMessage,
    getMessages,
    createChannel,
    getChannels,
    getChannelDetails,
    addMember,
    getUsers,}