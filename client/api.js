
var Promise = global.Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);

const responseBody = res => res.body;
let cookies = null;


const api = {
    del: url => 
        superagent
            .del(url)
            .then(responseBody),
    get: url =>
        superagent
            .get(url)
            .set('Content-type', 'application/json')
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(url)
            .send(body)
            .set('Content-type', 'application/json')
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(url)
            .send(body)
            .set('Content-type', 'application/json')
            .then(responseBody),
};

const auth = {
    current: () =>
        api.get(''),
    login: (email, password, rememberMe)  =>
        api.post('/Account/Login', { email, password, rememberMe }),
    register: (user) => 
        api.post('/Account/Register', user),
    logout: () =>
        api.post('/Account/LogOff'),
    update: (user) =>
        api.post('/Users/Edit', user),
};
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const presents = {
    all: () =>
        api.get(`/api/Presents?limit=5&offset=3`),
     get: id =>
        api.get(`/api/Presents/${id}`),
     add: present => 
         api.post(`/api/Presents`, present),
     del: id =>
         api.del(`/api/Presents/${id}`),
     edit: present =>
         api.put(`/api/Presents/${present.id}`, present),
     search: present =>
       superagent
             .post('/api/Presents/Search')
             .send(present)
             .responseType('blob')
             .set('Content-type', 'application/json')
             .then(responseBody)
};

const tag = {
    all: () =>
        api.get(`/api/Tags`),
    get: tag =>
        api.get(`/api/Tags/${tag.id}`),
    add: tag =>
        api.post(`/api/Tags`, tag),
    del: id =>
        api.del(`/api/Tags/${id}`),
    edit: tag =>
        api.put(`/api/Tags/${tag.id}`, tag)

};

export default {
    auth,
    presents,
    tag,
    setCookies: _cookies => { cookies = _cookies; }
};

