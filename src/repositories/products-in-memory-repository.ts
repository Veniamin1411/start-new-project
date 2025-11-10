import { ProductInMemoryType } from "./db-types.js" 

const products: ProductInMemoryType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductInMemoryType[]> {
        if (title) {
            let filteredProducts = products.filter(p => p.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return products
        }
    },

    async findProductById(id: number): Promise<ProductInMemoryType | null> {
        let foundProductById = products.find(p => p.id === id)
        if (foundProductById) {
            return foundProductById
        } else {
            return null
        }
    },

    async createProduct(title: string): Promise<ProductInMemoryType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },

    async updateProduct(id: number, title: string): Promise<Boolean> {
        let updatedProduct = products.find(p => p.id === id)

        if (updatedProduct) {
            updatedProduct.title = title
            return true
        } else {
            return false
        }
    },

    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i]?.id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}