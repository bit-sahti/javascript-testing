const sinon = require('sinon')
const Fibonacci = require('./fibonacci')
const { deepStrictEqual } = require('assert')
;

(async () => {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        for await (const i of fibonacci.execute(9)) {}
        
        const expectedCallCount = 10
        const spyCallCount = spy.callCount

        deepStrictEqual(spyCallCount, expectedCallCount)
    }

    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        const [...results] = fibonacci.execute(5)
        const expectedResults = [0, 1, 1, 2, 3]
        //0

        const { args } = spy.getCall(3)
        const expectedArgs = [2, 2, 3]

        deepStrictEqual(results, expectedResults)
        deepStrictEqual(args, expectedArgs)
    }
})()