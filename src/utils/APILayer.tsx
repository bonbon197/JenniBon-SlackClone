const BASE_URL = 'http://206.189.91.54/';

async function fetchWithHeaders(url: string, method: string, userData: any) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(userData.headers || {}),
            },
            body: JSON.stringify(userData.body),
        });

        const data = await response.json();

        return {
            headers: {
                access_token: response.headers.get('access-token') || '',
                client: response.headers.get('client') || '',
                uid: response.headers.get('uid') || '',
                expiry: response.headers.get('expiry') || '',
            },
            data: data,
        };
    } catch (error) {

        console.error('Error in fetchWithHeaders:', error);

        return {
            headers: {},
            data: {},
        };
    }
}


async function loginUser(userData: { email: string; password: string; }) {
    try {
        const { headers, data } = await fetchWithHeaders('api/v1/auth/sign_in', 'POST', {
            body: {
                "email": userData.email,
                "password": userData.password,
            }
        });

        return { headers: headers || {}, data };
    } catch (error) {

        console.error('Error in loginUser:', error);

        return {
            headers: {},
            data: {},
        };
    }
}

async function createUser(userData: { email: string; password: string; password_confirmation: string; }) {
    return fetchWithHeaders('api/v1/auth/', 'POST', { body: userData });
}


async function sendMessage(userData: { access_token: string; client: string; uid: number; expiry: string; receiver_id: string; receiver_class: any; body: any; }) {
    return fetchWithHeaders('/api/v1/messages', 'POST', userData);
}

async function getMessages(userData: { access_token: string; client: string; uid: number; expiry: string; receiver_id: string }) {
    return fetchWithHeaders(`/api/v1/messages?receiver_id=${userData.receiver_id}&receiver_class=User`, 'GET', userData);
}

async function createChannel(userData: { access_token: string; client: string; uid: number; expiry: string; name: string; user_ids: number[]; }) {
    return fetchWithHeaders('/api/v1/channels', 'POST', userData);
}

async function getChannels(userData: { access_token: string; client: string; uid: number; expiry: string; }) {
    return fetchWithHeaders('/api/v1/channels', 'GET', userData);
}

async function getChannelDetails(userData: { channel_id: number; access_token: string; client: string; uid: number; expiry: string; }) {
    return fetchWithHeaders(`/api/v1/channels/${userData.channel_id}`, 'GET', userData);
}

async function addMember(userData: { channel_id: number; access_token: string; client: string; uid: number; expiry: string; id: number; member_id: number; }) {
    return fetchWithHeaders('/api/v1/channel/add_member', 'POST', userData);
}

async function getUsers(userData: { access_token: string; client: string; uid: string; expiry: string; }) {
    return fetchWithHeaders('/api/v1/users', 'GET', userData);
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
    getUsers,
};
