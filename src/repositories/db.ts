import {MongoClient} from 'mongodb'
import { FeedbackDBType, UserAccountDBType, ProductType } from './db-types.js'
import { settings } from '../settings.js'


const uri = settings.MONGO_URI

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
export const usersCollection = db.collection<UserAccountDBType>('users')
export const feedbacksCollection = db.collection<FeedbackDBType>('feedbacks')