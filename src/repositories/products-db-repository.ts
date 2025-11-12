import { ProductsModel } from "./db.js"
import { ProductDBType } from "./db-types.js"

export const productsRepository = {
    async getAllProducts(): Promise<ProductDBType[]> {
        return ProductsModel.find({}).lean()
    },

    async getProductById(id: string): Promise<ProductDBType | null> {
        return await ProductsModel.findById(id)
    },

    async createProduct(product: ProductDBType): Promise<ProductDBType> {
        return await ProductsModel.create(product)
    },

    async updateProduct(id: string, title: string): Promise<ProductDBType | null> {
        return await ProductsModel.findByIdAndUpdate({_id: id}, {title: title}).lean()
    },

    async deleteProduct(id: string): Promise<Boolean> {
        const result = await ProductsModel.findByIdAndDelete(id)
        return result !== null
    }
}