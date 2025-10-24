import {MongoClient} from 'mongodb'

const uri = process.env.mongoURI || "mongodb://localhost:27017"

export const client = new MongoClient(uri)

export async function  runDb() {
    try {
        await client.connect()

        await client.db('products').command({ ping: 1 })
        console.log('Connected succesfully to mongo server')
    } catch {
        await client.close()
    }
}