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
import { ProductCategory, TUser, TProduct, TPurchase, TPurchases_Products, TPurchaseWithProducts } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

//console.log(users);
//console.log(products);
//console.log(purchases);

//Exercicio 2: chamando funções
//user
//createUser("u004", "Mateus", "mateus@teste.com", "321", "")
//console.log(getAllUsers(users));

//product
createProduct("p007", "Manga", 6.00, ProductCategory.FRUITS, "Fruta fresca", "https://picsum.photos/200")
console.log(getAllProducts(products));
console.log(getProductById("p001"))

//Exercicio 3: chamando mais funções
//product
console.log(queryProductsByName("alface"));

//purchase
createPurchase("p006", "u004", 4.00, "", 0)
console.log(getAllPurchasesFromUserId("Edipo"));

//Continuação API e Express
//Exercício 1

//invocando a função express() dentro da variável app
//criação do app
const app = express()

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json
app.use(express.json())

//configuração do middleware que habilita o CORS
app.use(cors())

//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos que o servidor está de pé, através 
//do console.log que imprimirá a mensagem no terminal
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//Utilizamos o app, escolhemos o método get, indicamos o path ‘/ping’ e declaramos
// a função handler (que recebe nossos parâmetros req e res, respectivamente tipados como Request e Response)

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});


//Exercício 3 - 

//User
//Requisição GET - REFATORADO PARA QUERY BUILDER
app.get("/users", async (req: Request, res: Response)=>{
    try {
        
        //const result = await db.raw(`
        //    SELECT * FROM users;
        //`)
        
        const searchTerm = req.query.q as string | undefined

        if (searchTerm === undefined) {
            const result = await db("users")
            res.status(200).send(result)
        } else {
            const result = await db("users").where("name", "LIKE", `%${searchTerm}%`)
            res.status(200).send({users: result})
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});
    
//Requisição POST
app.post("/users", async (req: Request, res: Response)=>{
    try {
        const {id, name, email, password} = req.body;
    
        if (id.length < 1 || name.length < 1 || email.length < 1 || password.length < 1) {
            res.status(404);
            throw new Error("Por favor, preencha todos os campos (id, email e password)");
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }
    
        users.map((users) => {
            if (users.id === id) {
                res.status(404);
                throw new Error("Esse 'id' já existe. Por favor, tente novamente");
        } else if (users.email === email) {
                    res.status(404);
                    throw new Error("Esse 'email' já existe. Por favor, tente novamente");
                }
        })
    
        await db.raw (`
            INSERT INTO users (id, name, email, password)
            VALUES
                ("${id}", "${name}", "${email}", "${password}")
        `)
        
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        console.log(error)
    
        if (req.statusCode === 200) {
            res.status(500)
        }
    
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        }
});

//===================================================================================

//Product
//Requisição GET - REFATORADO PARA QUERY BUILDER
app.get("/products", async (req: Request, res: Response)=>{
    try {
        
        //const result = await db.raw(`
        //    SELECT * FROM products;
        //`)
        
        const searchTerm = req.query.q as string | undefined

        if (searchTerm === undefined) {
            const result = await db("products")
            res.status(200).send(result)
        } else {
            const result = await db("products")
                .where("title", "LIKE", `%${searchTerm}%`)
                .orWhere("description", "LIKE", `%${searchTerm}%`)

        res.status(200).send({products: result})
        }
    } catch (error) {
        console.log(error)
    
    if (req.statusCode === 200) {
        res.status(500)
    }
    
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
    }
});

//Requisição GET com query
app.get("/products/search", async (req: Request, res: Response)=>{
    try {
        const q = req.query.q as string
            
        if (q.length <= 1){
            res.status(400);
            throw new Error("O parâmetro deve possuir pelo menos um caractere");
        }
        
        const [products] = await db.raw(`
            SELECT * FROM products
            WHERE LOWER (name) LIKE ("%${q}%");
        `);

        res.status(200).send ({product: products});

    } catch (error) {
        console.log(error)
    
        if (req.statusCode === 200) {
            res.status(500)
        }
    
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//Requisição POST com body
app.post("/products", async (req: Request, res: Response)=>{
    try {
        const {id, name, price, category, description, image_url} = req.body
    
        if (id.length < 1 || name.length < 1 || price.length < 1 || category.length < 1 || description.length < 1) {
            res.status(404);
            throw new Error("Por favor, preencha todos os campos (id, name, price e category)");
        } else if (typeof price !== "number") {
            res.status(404);
            throw new Error("'price' deve ser um number");
        }
    
        products.map((product) => {
        if (product.id === id) {
            res.status(404);
            throw new Error("Esse 'id' de produto já existe. Por favor, tente novamente");
            }
        })

        await db.raw (`
        INSERT INTO products (id, name, price, category, description, image_url)
        VALUES
            ("${id}", "${name}", "${price}", "${category}", "${description}", "${image_url}")
        `)

        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
        
});

//===================================================================================

//Purchases
//Requisição GET - REFATORADO PARA QUERY BUILDER
app.get("/purchases", async(req: Request, res: Response)=>{
    try {
        
        //const result = await db.raw(`
        //SELECT * FROM purchases;
        //`)

        const searchTerm = req.query.q as string | undefined

        if (searchTerm === undefined) {
            const result = await db("purchases")
            res.status(200).send(result)
        } else {
            const result = await db("purchases")
                .where("title", "LIKE", `%${searchTerm}%`)
                .orWhere("description", "LIKE", `%${searchTerm}%`)

        res.status(200).send({purchases: result})
        }
        
    } catch (error) {
        console.log(error)
        
        if (req.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
            } else {
            res.send("Erro inesperado")
            }
        }
});

//Requisição GET com query
app.get("/purchases/search", async (req: Request, res: Response)=>{
    try {
        const q = req.query.q as string
        
        if (q.length <= 1){
            res.status(400);
            throw new Error("O parâmetro deve possuir pelo menos um caractere");
        }
        const [purchases] = await db.raw(`
            SELECT * FROM purchases
            WHERE LOWER (name) LIKE ("%${q}%");
        `);

        res.status(200).send ({purchase: purchases});

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//Requisição POST com body   //falta finalizar esse
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const {id, buyer, total_price, created_at, paid, products} = req.body
        const [filterUser]:TUser[] | undefined[] = await db("users").where({id:buyer})
       
        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("Id do usuário precisa ser uma string");
            }
            
        } else {
            res.status(400);
            throw new Error ("Favor, inserir id de usuário.");
        }

        if (total_price !== undefined){
            if (typeof total_price !== "number"){
                res.status(400);
                throw new Error ("Valor de Preço Total inválido! Favor, informar um numero.");
            }

        } else {
            res.status(400);
            throw new Error ("Valor final da compra não informado.");
        }

        if (paid !== undefined){
            if (typeof paid !== "number"){
                res.status(400);
                throw new Error ("Confirmação de compra inválido! Favor, informar um numero.");
            }

        } else {
            res.status(400);
            throw new Error ("Confirmação de compra não informado.");
        }

        if (buyer === undefined){
            res.status(400);
            throw new Error ("Id de cliente não informado.");
        }

        if (total_price !== undefined){
            if (typeof total_price !== "number"){
                res.status(400);
                throw new Error ("Valor de Preço Total inválido! Favor, informar um numero.");
            }

        } else {
            res.status(400);
            throw new Error ("Valor final da compra não informado.");
        }

        if (products[0].id !== undefined){
            if (typeof products[0].id !== "string"){
                res.status(400);
                throw new Error ("'id' de produto inválido! Favor, informar uma string.");
            }

        } else {
            res.status(400);
            throw new Error ("'id' de produto não informado.");
        }

        if (products[0].quantity !== undefined){
            if (typeof products[0].quantity !== "number"){
                res.status(400);
                throw new Error ("Quantidade de produtos inválido! Favor, informar um numero.");
            }

        } else {
            res.status(400);
            throw new Error ("Valor final da compra não informado.");
        }

        if(!filterUser){
            res.status(400);
            throw new Error ("Id de cliente não existe.");
        }
        
        const newPurchase:TPurchase={
            id,
            buyer,
            total_price,
            created_at,
            paid
        }

        const newPurchasesProducts:TPurchases_Products={
            purchase_id:id, 
            product_id: products[0].id,
            quantity: products[0].quantity,
        }

        await db("purchases").insert(newPurchase)
        await db("purchases_products").insert(newPurchasesProducts)
	
	    res.status(201).send({message:"Compra realizada com sucesso",purchase:newPurchase});

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//===================================================================================

// 1) validar um produto por id
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
    const id = req.params.id

    const result = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
    `)

    res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//validar a compra por usuario id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        
        const result = await db.raw(`
            SELECT * FROM purchases
            WHERE userId = "${id}";
        `)

        res.status(200).send(result)
    
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//===================================================================================

// 2) DELETANDO

//======delete de usuario======
app.delete("/users/:id", async(req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete[0] !== "u") {
            res.status(400)
            throw new Error("'id' deve iniciar com a letra 'u'")
        }

        const [ userIdAlreadyExists ]: TUser[] | undefined[] = await db("users").where({ id: idToDelete })

        if (!userIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("users").del().where({ id: idToDelete })

        res.status(200).send({ message: "User deletado com sucesso" })

   
    } catch (error) {
        console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
    }
});

//======delete de produto=======
app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete[0] !== "p") {
            res.status(400)
            throw new Error("'id' deve iniciar com a letra 'u'")
        }

        const [ productIdAlreadyExists ]: TProduct[] | undefined[] = await db("products").where({ id: idToDelete })

        if (!productIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("products").del().where({ id: idToDelete })

        res.status(200).send({ message: "Product deletado com sucesso" })

    } catch (error: any) {
        console.log(error)
    
        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
});    

//======delete de compra======
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id precisa ser um string");
        }
        if (id[0] !== "c") {
            res.status(400)
            throw new Error("Id de purchases precisa comecar com c");
        }
        await db("purchases_products").del().where({ purchase_id: id })  
        await db("purchases").del().where({ id: id })
        res.status(200).send({ message: "Pedido cancelado com sucesso" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected Error")
        }
    }
});

//===================================================================================

// 3) EDITANDO

//======editando um user======
app.put("/users/:id", async (req: Request, res: Response) => {
    try {     
        const id = req.params.id  

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPass = req.body.password as string | undefined
        const newCreatedAt = req.body.created_at as string | undefined
        const [filterUser]: TUser[] | undefined[]= await db("users").where({id:id})
    
        if (newName !== undefined){
            if (typeof newName !== "string"){
                res.status(400);
                throw new Error ("'Name' deve ser uma string");
            }
        }

        if (newEmail !== undefined){
            if (typeof newEmail !== "string"){
                res.status(400);
                throw new Error ("'Email' deve ser uma string");
            }
        }
        
        if (newPass !== undefined){
            if (typeof newPass !== "string"){
                res.status(400);
                throw new Error ("'Password' deve ser uma string");
            }
        }
        
        if(filterUser){
    
            const updateUser:TUser={
                id: newId || filterUser.id,
                name: newName || filterUser.name,
                email: newEmail || filterUser.email,                
                password: newPass || filterUser.password,
                created_at: newCreatedAt || filterUser.created_at
            }
    
            await db("users").update(updateUser).where({id:id})
    
            res.status(200).send({message:"Atualização realizada com sucesso!", user: updateUser })
        }else{
            res.status(404);
            throw new Error ("Usuário não cadastrado!");
        }
    
        } catch (error) {
            console.log(error)
    
            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }          
        }
    
    })

//======editando um produto======
app.put("/products/:id", async (req: Request, res: Response) => {
    try {     
        const id = req.params.id  

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as ProductCategory | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.image_url as string | undefined
        const [filterProduct]: TProduct[] | undefined[]= await db("products").where({id:id})
    
        if (newName !== undefined){
            if (typeof newName !== "string"){
                res.status(400);
                throw new Error ("'Name' deve ser uma string");
            }
        }

        if (newPrice !== undefined){
            if (typeof newPrice !== "number"){
                res.status(400);
                throw new Error ("'Price' deve ser uma string");
            }
        }
        
        if (newDescription !== undefined){
            if (typeof newDescription !== "string"){
                res.status(400);
                throw new Error ("'Description' deve ser uma string");
            }
        }
        
        if(filterProduct){
    
            const updateProduct:TProduct={
                id: newId || filterProduct.id,
                name: newName || filterProduct.name,
                price: newPrice || filterProduct.price,                
                category: newCategory || filterProduct.category,
                description: newDescription || filterProduct.description,
                image_url: newImageUrl || filterProduct.image_url
            }
    
            await db("products").update(updateProduct).where({id:id})
    
            res.status(200).send({message:"Atualização realizada com sucesso!", product: updateProduct })
        }else{
            res.status(404);
            throw new Error ("Usuário não cadastrado!");
        }
    } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
            res.status(500);
        }
    
        res.send(error.message);
    }
});

//===================================================================================

//CRIANDO UM EDNPOINT COM QUERY BUILDER PARA "GET PURCHASE BY ID"

// app.get("/purchases/:id", async (req: Request, res: Response) => {
// try {
//     const purchaseId = req.params.id;
//     const [result] = await db
//         .select("purchases.*", "users.email", "users.name")
//         .from("purchases")
//         .leftJoin("users", "purchases.userId", "users.id")
//         .where({"purchases.id": purchaseId})
        
//         res.status(200).send({
//             purchaseId: result.id,
//             total_price: result.total_price,
//             paid: result.paid,
//             userId: result.userId,
//             createdAt: result.createdAt,
//             name: result.name,
//             email: result.email
// })
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// });

// REFATORANDO O ENDPOINT CRIADO NO EXERCÍCIO ANTERIOR PARA QUE O RESULTADO TAMBÉM RETORNE A LISTA DE PRODUTOS REGISTRADOS NA COMPRA

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const purchases: TPurchase[] = await db("purchases")

        const result: TPurchaseWithProducts[] = []

        for (let purchase of purchases) {
            const listOfProducts = []
            const purchases_products: TPurchases_Products[] = await db("purchases_products").where({ purchase_id: purchase.id })
            
            for (let purchases_product of purchases_products) {
                const [ product ]: TProduct[] = await db("products").where({ id: purchases_product.product_id })
                listOfProducts.push(product)
            }

            const newPurchaseWithProducts: TPurchaseWithProducts = {
                ...purchase,
                listOfProducts
            }

            result.push(newPurchaseWithProducts)
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});


