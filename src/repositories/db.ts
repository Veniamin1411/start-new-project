import {MongoClient} from 'mongodb'
import { UserAccountType, EmailConfirmationType } from './db-types.js'
import { settings } from '../settings.js'
import mongoose from 'mongoose'
import { addressSchema, feedbackSchema, productSchema, userSchema } from './mongoose-schemas.js'


const uri = settings.MONGO_URI

//const client = new MongoClient(uri)

export const dbName = 'shop'
export const ProductsModel = mongoose.model('products', productSchema)
export const UsersModel = mongoose.model('users', userSchema)
export const FeedbacksModel = mongoose.model('feedbacks', feedbackSchema)
export const AddressesModel = mongoose.model('addresses', addressSchema)


export async function runDb() {
    try {
        //await client.connect()
        await mongoose.connect(uri + "/" + dbName)
        console.log('Connected succesfully to mongo server')
    } catch {
        console.log('Cannot connect to db')
        //await client.close()
        await mongoose.disconnect()
    }
}

//const db = client.db('shop')
//export const productsCollection = db.collection<ProductType>('products')
//export const usersCollection = db.collection<UserAccountDBType>('users')
//export const feedbacksCollection = db.collection<FeedbackDBType>('feedbacks')