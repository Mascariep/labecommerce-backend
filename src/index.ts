import { users, 
        products,
        purchases,
        createUser,
        getAllUsers,
        createProduct,
        getAllProducts,
        getProductById,
        queryProductsByName,
        createPurchase,
        getAllPurchasesFromUserId } from "./database";
import { ProductCategory, TUser, TProduct, TPurchase } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'

// console.log(users);
// console.log(products);
// console.log(purchases);

//Exercicio 2: chamando funções
//user
createUser("Aurora", "teste3@teste.com", "13579")
console.log(getAllUsers(users));

//product
createProduct("03", "Manga", 6.00, ProductCategory.FRUITS)
console.log(getAllProducts(products));
console.log(getProductById("01"))

//Exercicio 3: chamando mais funções
//product
console.log(queryProductsByName("alface"));

//purchase
createPurchase("Aurora", "01", 2, 4.00)
console.log(getAllPurchasesFromUserId("Edipo"));



//Continuação API e Express
//Exercício 1

//invocando a função express() dentro da variável app
const app = express()

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json
app.use(express.json())

//configuração do middleware que habilita o CORS
app.use(cors())

//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//Utilizamos o app, escolhemos o método get, indicamos o path ‘/ping’ e declaramos
// a função handler (que recebe nossos parâmetros req e res, respectivamente tipados como Request e Response)
// app.get('/ping', (req: Request, res: Response) => {
//         res.send('Pong!')
//       });



//Exercício 3 - 

//User
//Requisição GET com query
app.get("/users", (req: Request, res: Response)=>{
        res.status(200).send(users)
    })
    
    //Requisição GET com query
    app.get("/users/search", (req: Request, res: Response)=>{
        const q = req.query.q as string
    
        const usersFilter = users.filter(
        (users)=>users.id.toLowerCase().includes(q.toLowerCase())
        )
        res.status(200).send(usersFilter)
    })
    
    //Requisição POST com body
    app.post("/users",(req: Request, res: Response)=>{
    
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password
    
        const newUser:TUser = {
            id,
            email,
            password,
        }
    
        users.push(newUser)
    
        res.status(201).send("Cadastro realizado com sucesso")
    })
/*=================================================================*/
//Product
//Requisição GET com query
        app.get("/products", (req: Request, res: Response)=>{
        res.status(200).send(products)
    })
    
//Requisição GET com query
    app.get("/products/search", (req: Request, res: Response)=>{
        const q = req.query.q as string
    
        const productsFilter = products.filter(
        (products)=>products.id.toLowerCase().includes(q.toLowerCase())
        )
        res.status(200).send(productsFilter)
    })
    
    //Requisição POST com body
    app.post("/products",(req: Request, res: Response)=>{
    
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category

        const newProduct:TProduct = {
            id,
            name,
            price,
            category,
        }

        products.push(newProduct)

        res.status(201).send("Produto cadastrado com sucesso")
        })

/*=================================================================*/
//Purchases
//Requisição GET com query
        app.get("/purchases", (req: Request, res: Response)=>{
        res.status(200).send(purchases)
        })

//Requisição GET com query
        app.get("/purchases/search", (req: Request, res: Response)=>{
        const q = req.query.q as string

        const purchasesFilter = purchases.filter(
        (purchases)=>purchases.userId.toLowerCase().includes(q.toLowerCase())
        )
        res.status(200).send(purchasesFilter)
        })

//Requisição POST com body
        app.post("/purchases",(req: Request, res: Response)=>{

        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const totalPrice = req.body.totalPrice

        const newPurchase:TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice,
        }

        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")
        })