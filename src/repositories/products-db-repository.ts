import { productsCollection } from "./db.js"
import { ProductType } from "./db.js"

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        
        return productsCollection.find(filter).toArray()
    },

    async findProductById(id: number): Promise<ProductType | null> {
        let foundProductById: ProductType | null = await productsCollection.findOne({id: id})
        if (foundProductById) {
            return foundProductById
        } else {
            return null
        }
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
    },

    async updateProduct(id: number, title: string): Promise<Boolean> {
        const result = await productsCollection.updateOne({id: id}, {$set: {title: title}})

        return result.matchedCount === 1
    },

    async deleteProduct(id: number): Promise<Boolean> {
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}