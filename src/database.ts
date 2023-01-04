import { TClient, TProduct, TPurchase } from "./types";

export const user: TClient[] = [{
    id: "01",
    email: "teste1@teste.com",
    password: "123456",
},
{
    id: "02",
    email: "teste2@teste.com",
    password: "654321",  
}]

export const products:TProduct[]=[{
    id: "01",
    name: "goiaba",
    price: 10.00,
    category: "fruta"
},{
    id: "02",
    name: "laranja",
    price: 11.00,
    category: "fruta"
}
]

export const purchases:TPurchase[]=[{
    userId: "01",
    productId: "01",
    quantity: 1,
    totalPrice: 10.00,
},{
    userId: "02",
    productId: "01",
    quantity: 1,
    totalPrice: 11.00,
}

]