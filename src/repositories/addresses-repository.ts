import { AddressDBType } from "./db-types.js";
import { AddressesModel } from "./db.js";

export const addressesRepository = {
    async getAllAddresses(): Promise<AddressDBType[]> {
        return await AddressesModel.find({}).lean()
    },

    async getAddressById(id: string): Promise<AddressDBType | null> {
        return await AddressesModel.findById(id)
    },

    async createAddress(address: AddressDBType): Promise<AddressDBType> {
        return await AddressesModel.create(address)
    },

    async updateAddress(id: string, updateData: Omit<AddressDBType, "_id">): Promise<AddressDBType | null> {
        return await AddressesModel.findByIdAndUpdate(id, updateData, { new: true })
    },

    async deleteAddress(id: string): Promise<Boolean> {
        const result = await AddressesModel.findByIdAndDelete(id)
        return result !== null
    }
}