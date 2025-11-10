import { productsRepository } from "../repositories/products-db-repository.js"
import { ProductDBType } from "../repositories/db-types.js" 
import { ObjectId } from 'mongodb'

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductDBType[]> {
        return productsRepository.findProducts(title)
    },

    async findProductById(id: number): Promise<ProductDBType | null> {
        return productsRepository.findProductById(id)
    },

    async createProduct(title: string): Promise<ProductDBType> {
        const newProduct = {
            _id: new ObjectId,
            id: +(new Date()),
            title: title
        }
        const createdProduct = await productsRepository.createProduct(newProduct)
        return createdProduct
    },

    async updateProduct(id: number, title: string): Promise<Boolean> {
        return await productsRepository.updateProduct(id, title)
    },

    async deleteProduct(id: number): Promise<Boolean> {
        return await productsRepository.deleteProduct(id)
    }
}