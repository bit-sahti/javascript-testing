const sinon = require("sinon");
const Service = require("./service");
const { deepStrictEqual } = require("assert");

const baseUrl_1 = "https://swapi.dev/api/planets/1";
const baseUrl_2 = "https://swapi.dev/api/planets/2";

const mocks = {
    tatooine: require("./mocks/tatooine.json"),
    alderaan: require("./mocks/alderaan.json"),
};

(async () => {
    const api = new Service();

    const stub = sinon.stub(api, api.makeRequest.name);

    stub.withArgs(baseUrl_1).resolves(mocks.tatooine);
    stub.withArgs(baseUrl_2).resolves(mocks.alderaan);

    {
        const expected = {
            name: "Tatooine",
            surfaceWater: 1,
            population: 200000,
            moviesItAppearsIn: 5,
        };

        const result = await api.getPlanets(baseUrl_1);

        deepStrictEqual(result, expected);
    }

    {
        const expected = {
            name: "Alderaan",
            surfaceWater: 40,
            population: 2000000000,
            moviesItAppearsIn: 2,
        };

        const result = await api.getPlanets(baseUrl_2);

        deepStrictEqual(result, expected);
    }
})();
