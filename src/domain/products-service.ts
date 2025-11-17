import { productsRepository } from "../repositories/products-db-repository.js"
import { ProductDBType } from "../repositories/db-types.js" 
import { ObjectId } from 'mongodb'

export const productsService = {
    async getAllProducts(): Promise<ProductDBType[]> {
        return await productsRepository.getAllProducts()
    },

    async getProductById(id: string): Promise<ProductDBType | null> {
        return await productsRepository.getProductById(id)
    },

    async createProduct(title: string): Promise<ProductDBType> {
        const product: ProductDBType = {
            _id: new ObjectId(),
            title: title
        }
        return await productsRepository.createProduct(product)
    },

    async updateProduct(id: string, title: string): Promise<ProductDBType | null> {
        return await productsRepository.updateProduct(id, title)
    },

    async deleteProduct(id: string): Promise<Boolean> {
        return await productsRepository.deleteProduct(id)
    }
}