import { addressesRepository } from "../repositories/addresses-repository.js";
import { AddressDBType } from "../repositories/db-types.js";
import { ObjectId } from "mongodb";

export const addressesService = {
    async getAllAddresses(): Promise<AddressDBType[]> {
        return await addressesRepository.getAllAddresses()
    },

    async getAddressById(id: string): Promise<AddressDBType | null> {
        return await addressesRepository.getAddressById(id)
    },

    async createAddress(createData: Omit<AddressDBType, "_id">): Promise<AddressDBType> {
        const address = {
            _id: new ObjectId(),
            ...createData
        }
        return await addressesRepository.createAddress(address)
    },

    async updateAddress(id: string, updateData: Omit<AddressDBType, "_id">): Promise<AddressDBType | null> {
        return await addressesRepository.updateAddress(id, updateData)
    },

    async deleteAddress(id: string): Promise <Boolean> {
        return await addressesRepository.deleteAddress(id)
    }
}