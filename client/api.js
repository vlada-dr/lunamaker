
const Promise = global.Promise = require('promise')
const superagent = require('superagent-promise')(require('superagent'), Promise)


const responseBody = (res) => res.body

const baseUrl = 'https://my-json-server.typicode.com/mouire/surpriseu-server'
const api = {
  del: (url) => superagent
    .del(baseUrl + url)
    .then(responseBody),
  get: (url) => superagent
    .get(baseUrl + url)
    .set('Content-type', 'application/json')
    .then(responseBody),
  put: (url, body) => superagent
    .put(baseUrl + url)
    .send(body)
    .set('Content-type', 'application/json')
    .then(responseBody),
  post: (url, body) => superagent
    .post(baseUrl + url)
    .send(body)
    .set('Content-type', 'application/json')
    .then(responseBody),
}

const auth = {
  current: () => api.get(''),
  login: (email, password, rememberMe) => api.post('/Account/Login', { email, password, rememberMe }),
  register: (user) => api.post('/Account/Register', user),
  logout: () => api.post('/Account/LogOff'),
  update: (user) => api.post('/Users/Edit', user),
}
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`

const presents = {
  all: () => api.get('/presents?_page=1&_limit=5'),
  get: (id) => api.get(`/presents/${id}`),
  add: (present) => api.post('/presents', present),
  del: (id) => api.del(`/presents/${id}`),
  edit: (present) => api.put(`/presents/${present.id}`, present),
  search: (present) => api.get(`/presents?${present}`),
}

const tag = {
  all: () => api.get('/tags'),
  get: (tg) => api.get(`/tags/${tg.id}`),
  add: (tg) => api.post('/tags', tg),
  del: (id) => api.del(`/tags/${id}`),
  edit: (tg) => api.put(`/tags/${tg.id}`, tg),

}

export {
  auth,
  presents,
  tag,
}
