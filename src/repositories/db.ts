import {MongoClient} from 'mongodb'
import { ProductType } from './types.js'
import { UserDBType } from './types.js'


const uri = process.env.mongoURI || "mongodb://127.0.0.1:27017"

const client = new MongoClient(uri)

export async function runDb() {
    try {
        await client.connect()

        await client.db('products').command({ ping: 1 })
        console.log('Connected succesfully to mongo server')
    } catch {
        console.log('Cannot connect to db')

        await client.close()
    }
}

const db = client.db('shop')
export const productsCollection = db.collection<ProductType>('products')
export const usersCollection = db.collection<UserDBType>('users')