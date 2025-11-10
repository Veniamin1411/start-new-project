import { ProductsModel } from "./db.js"
import { ProductDBType } from "./db-types.js"

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductDBType[]> {
        
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        
        return ProductsModel.find(filter).lean()
    },

    async findProductById(id: number): Promise<ProductDBType | null> {
        let foundProductById: ProductDBType | null = await ProductsModel.findOne({id: id})
        return foundProductById
    },

    async createProduct(newProduct: ProductDBType): Promise<ProductDBType> {
        await ProductsModel.insertOne(newProduct)
        return newProduct
    },

    async updateProduct(id: number, title: string): Promise<Boolean> {
        const result = await ProductsModel.updateOne({id: id}, {$set: {title: title}})

        return result.matchedCount === 1
    },

    async deleteProduct(id: number): Promise<Boolean> {
        const result = await ProductsModel.deleteOne({id: id})
        return result.deletedCount === 1
    }
}