const http = require('http')

const defaultUser = {
    id: 1,
    password: 'pass123'
}

const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact us page')

        return response.end()
    },
    '/login:post' : async (request, response) => {
        //request é um async iterator e, por isso, podemos obtê-lo dessa forma se não quiseremos usar as funções on
        for await (const data of request) {
            const { id, password } = JSON.parse(data)

            if (id !== defaultUser.id || password !== defaultUser.password) {
                response.writeHead(401)
                response.write('Unauthorized.')
                return response.end()
            }
    
            response.write('Login succeeded.')
    
            return response.end()        }
    },
    default: (request, response) => {
        response.write('Hello World')

        return response.end()
    }
}

const handler = function (request, response) {
    const { url, method } = request

    const route = `${url}:${method.toLowerCase()}`

    const chosenRoute =  routes[route] || routes.default

    return chosenRoute(request, response)
} 

const app = http.createServer(handler).listen(3000, () => console.log('App listening on port 3000'))

module.exports = app