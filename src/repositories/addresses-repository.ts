const addresses = [{id: 1, value: 'Sadova 15'}, {id: 2, value: 'Tsentralna 150'}]

export const addressesRepository = {
    findAddresses() {
        return addresses
    },

    findAddressById(id: number) {
        let foundAddress = addresses.find(p => p.id === id)
        return foundAddress
    }
}