//Dados do cliente cadastrado
export type TClient = {
    id: string
    email: string
    password: string
}

//Dados do produto cadastrado
export type TProduct = {
    id: string
    name: string
    price: number
    category: string
}

//Dados da compra que será realizada pelo cliente
export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}