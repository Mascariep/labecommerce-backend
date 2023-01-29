import { TUser, TProduct, TPurchase, ProductCategory } from "./types"

export const users: TUser[] = [
    {
        id: "u001",
        name: "Edipo",
        email: "edipo@teste.com",
        password: "123",
        created_at: ""
    },
    {
        id: "u002",
        name: "Pamela",
        email: "pamela@teste.com",
        password: "456",
        created_at: ""  
    },
    {
        id: "u003",
        name: "Aurora",
        email: "aurora@teste.com",
        password: "987",
        created_at: ""  
    }
]

//Refatore o mock de products no database.ts
export const products: TProduct[] = [
    {
        id: "p001",
        name: "goiaba",
        price: 5.00,
        category: ProductCategory.FRUITS,
        description: "Fruta fresca",
        image_url: "https://picsum.photos/200"
    },
    {
        id: "p002",
        name: "alface",
        price: 1.00,
        category: ProductCategory.GREENERIES,
        description:"Verdura fresca",
        image_url: "https://picsum.photos/200"
    },
    {
        id: "p003",
        name: "manga",
        price: 5.00,
        category: ProductCategory.FRUITS,
        description:"Fruta fresca",
        image_url: "https://picsum.photos/200"
    },
    {
        id: "p004",
        name: "rucúla",
        price: 1.00,
        category: ProductCategory.GREENERIES,
        description:"Verdura fresca",
        image_url: "https://picsum.photos/200"
    },
    {
        id: "p005",
        name: "uva",
        price: 3.00,
        category: ProductCategory.FRUITS,
        description:"Fruta fresca",
        image_url: "https://picsum.photos/200"
    }
]

export const purchases: TPurchase[] = [
    {
        id: "c001",
        buyer: "u001",
        total_price: 15.00,
        created_at: "",
        paid: 0,
    },
    {
        id: "c002",
        buyer: "u002",
        total_price: 10.00,
        created_at: "",
        paid: 0,
    }
]


//User
    // createUser (cria uma nova pessoa na lista de users)
// input: três parâmetros (id, email e password)
// output: frase de sucesso ("Cadastro realizado com sucesso")
// exemplo de chamada: createUser("u003", "beltrano@email.com", "beltrano99")
export function createUser(id: string, name: string, email: string, password: string, created_at: string) {
    const newUser : TUser = {id, name, email, password, created_at}
    users.push(newUser)
    console.log("Usuário cadastrado com sucesso");
}


    // getAllUsers (busca todas as pessoas da lista de users)
// input: nenhum
// output: lista atualizada de users
// exemplo de chamada: getAllUsers()
export function getAllUsers (users: TUser[]) : TUser[] {
    return users
}


//Exercicio 2: criando funções
// Product
    // createProduct (cria um novo produto na lista de products)
// input: três parâmetros (id, name, price e category)
// output: frase de sucesso ("Produto criado com sucesso")
// exemplo de chamada: createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS)

export function createProduct(id: string, name: string, price: number, category: ProductCategory, description: string, image_url: string ) {
        const newProduct : TProduct = {id, name, price, category, description, image_url}
        products.push(newProduct)
        console.log("Produto cadastrado com sucesso");
}

//     getAllProducts (busca todos os produtos da lista de products)
// input: nenhum
// output: lista atualizada de products
// exemplo de chamada: getAllProducts()

export function getAllProducts (products: TProduct[]) : TProduct[] {
    return products
}

    // getProductById (busca por produtos baseado em um id da lista de products)
// input: um parâmetro (idToSearch)
// output: o produto encontrado ou undefined
// exemplo de chamada: getProductById("p004")

export function getProductById (idToSearch: string) : TProduct[] | undefined {
    return products.filter((product: TProduct) => {
        return product.id === idToSearch
    })
}


//Exercicio 3: criando funções
// Product
    // queryProductsByName (busca por produtos baseado em um nome da lista de products)
// input: um parâmetro (q) - q é a abreviação de query (termo de busca/consulta)
// output: lista de produtos com nomes que contenham o termo de busca
// extra: o resultado da busca deve ser case insensitive
// exemplo de chamada: queryProductsByName("monitor")
export function queryProductsByName (q: string) : TProduct[] | undefined {
    return products.filter((product: TProduct) => {
        return product.name.toLowerCase() === q
    })
}

// Purchase
    // createPurchase (cria uma nova compra na lista de purchases)
// input: quatro parâmetros (userId, productId, quantity e totalPrice)
// output: frase de sucesso ("Compra realizada com sucesso")
// exemplo de chamada: createPurchase("u003", "p004", 2, 1600)
export function createPurchase (id: string, buyer: string, total_price: number, created_at: string, paid: number) {
    const newPurchase : TPurchase = {id, buyer, total_price, created_at, paid}
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso");
}

    // getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
// input: userIdToSearch
// output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
// exemplo de chamada: getAllPurchasesFromUserId("u003")
export function getAllPurchasesFromUserId (buyerToSearch: string) : TPurchase[] | undefined {
    return purchases.filter((purchase) => {
        return purchase.buyer === buyerToSearch
    })
}