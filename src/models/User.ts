
interface Address {
    state: string
    city: string
    neighborhood: string
    street: string
    houseNumber: number
    adjunct: string
    postalCode: string
}
export default class Usuario {
    #id: string
    #name: string
    #email: string
    #token: string
    #provider: string
    #imageUrl: string
    #cpf: number
    #phone: string
    #address: Address
    #historic: Array<String>

    constructor(id: string, name: string, email: string, token: string, provider: string, imageUrl: string, cpf: number, phone: string, historic: Array<String>, address: Address) {
        this.#id = id
        this.#name = name
        this.#email = email
        this.#token = token
        this.#provider = provider
        this.#imageUrl = imageUrl
        this.#cpf = cpf
        this.#phone = phone
        this.#address = address
        this.#historic = historic
    }


    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    get email() {
        return this.#email
    }

    get token() {
        return this.#token
    }

    get provider() {
        return this.#provider
    }

    get imageUrl() {
        return this.#imageUrl
    }

    get cpf() {
        return this.#cpf
    }
    get phone() {
        return this.#phone
    }

    get address() {
        return this.#address
    }

    get historic() {
        return this.#historic
    }

    updateInfo(name: string, phone: string, address: Address, cpf: number) {
        this.#name = name;
        this.#phone = phone;
        this.#address = address;
        this.#cpf = cpf;
    }
}
