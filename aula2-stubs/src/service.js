const https = require('https')

class Service {
    makeRequest(url) {
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                let responseData = ''

                response.on('data', data => responseData += data)

                response.on('end', () => resolve(JSON.parse(responseData)))

                response.on('error', error => reject(error))
            })
        })
    }

    async getPlanets(url) {
        const planet = await this.makeRequest(url)

        return {
            name: planet.name,
            surfaceWater: parseInt(planet.surface_water),
            population: parseInt(planet.population),
            moviesItAppearsIn: planet.films.length
        }
    }
}

module.exports = Service