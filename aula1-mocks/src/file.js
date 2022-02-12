const { readFile } = require('fs/promises')
const { join } = require('path')
const { errors } = require('../constants/errors')
const { User } = require('./user')

class File {
    //if build with a constructor, they will belong to the instance, and so won't be available on static methods
    static defaultOptions = {
        maxLines: 3,
        allowEndingSpace: false,
        options: ['id', 'name', 'profession', 'age']
    }

    static async csvToJson(fileName) {
        const filePath = join(__dirname, fileName)
        const file = await File.getFileContent(filePath)

        const { headers, rows } = File.parseCsvFile(file)        
        
        const validations = File.isValid({ headers, rows })

        if (!validations.isValid) throw new Error(validations.message)

        const jsonFile = File.convertToJson({ headers, rows })

        return jsonFile
    }

    static async getFileContent(filePath) {
        return readFile(filePath, { encoding: "utf8" })
    }

    static parseCsvFile(csvFile) {
        const rows = csvFile.split('\n')
        const headers = rows.shift()

        return {
            headers,
            rows
        }
    }

    static isValid({ headers, rows }) {
        const expectedHeaders = File.defaultOptions.options.join(',')

        if (headers !== expectedHeaders) {
            return {
                isValid: false,
                message: errors.invalidHeaders
            }
        }

        if (rows.length <= 0 || rows.length > 3) {
            return {
                isValid: false,
                message: errors.invalidLength
            }
        }

        for (const row of rows) {
            const columns = row.split(',')

            if (columns.length !== 4) {
                return {
                    isValid: false,
                    message: errors.invalidFormat
                }
            }
        }
        
        return { isValid: true }
    }

    static convertToJson({ headers, rows }) {
        const columnNames = headers.split(',')

        const users = rows.map(row => {
            const columnValues = row.split(',')
            const user = {}

            //for... in iterates over an object properties. For arrays, it's the index
            for (const index in columnNames) {
                user[columnNames[index]] = columnValues[index]
            }

            return new User(user)
        })

        return users
    }
}

module.exports = { File }