//Exercicio 1
//Refatore o type da entidade product no types.ts
export enum ProductCategory {
    GREENERIES = "Verduras",
    FRUITS = "Fruta"
}

// // user
// export type TUser = {
//     id: string
//     email: string
//     password: string
// }

// // product
// export type TProduct = {
//     id: string
//     name: string
//     price: number
//     category: ProductCategory
// }

// // purchase
// export type TPurchase = {
//     userId: string
//     productId: string
//     quantity: number
//     totalPrice: number
// }


// user
export type TUser = {
    id: string
    name: string
    email: string
    password: string
    created_at: string
}

// product
export type TProduct = {
    id: string
    name: string
    price: number
    category: ProductCategory
    description: string
    image_url: string
}

// purchase
export type TPurchase = {
    id: string
    buyer: string
    total_price: number
    created_at: string
    paid: number
}

//purchases_products
export type TPurchases_Products = {
    purchase_id: string, 
    product_id: string,
    quantity: number
}

export type TPurchaseWithProducts = {
    id: string
    buyer: string
    total_price: number
    paid: number
    created_at: string
    listOfProducts: TProduct[]
}