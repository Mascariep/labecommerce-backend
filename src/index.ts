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
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    } 
    });
    
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
        try {
            const id = req.body.id;
            const email = req.body.email;
            const password = req.body.password;
    
            if (password.length < 1 || email.length < 1 || id.length < 1) {
                res.status(404);
                throw new Error("Por favor, preencha todos os campos (id, email e password)");
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
    
            users.map((users) => {
                
            })

            const newUser:TUser = {
                id,
                email,
                password,
            }
        
            users.push(newUser)
        
            res.status(201).send("Cadastro realizado com sucesso")

        } catch (error: any) {
            console.log(error)
            if(res.statusCode === 200){
                res.status(500)
            }
            res.send(error.message)
        } 
    })



/*=================================================================*/
//Product
//Requisição GET com query
    app.get("/products", (req: Request, res: Response)=>{
        try {
            res.status(200).send(products)
        } catch (error: any) {
            console.log(error);

            if (res.statusCode === 200){
                res.status(500);
            }
            res.send(error.message);
        }
    })
    
//Requisição GET com query
    app.get("/products/search", (req: Request, res: Response)=>{
        try {
            const q = req.query.q as string
            if (q.length <= 1){
                res.status(400)
                throw new Error("O parâmetro deve possuir pelo menos um caractere")
            }
            const productFilter = products.filter((product) => {
                return product.name.toLowerCase().includes(q.toLowerCase())
            })

            res.status(200).send(productFilter)

            } catch (error: any) {
                console.log(error)
        
            if (res.statusCode == 200) {
                    res.status(500)
                }
                res.send(error.message)
            }
        })
        
        

    //Requisição POST com body
    
    app.post("/products",(req: Request, res: Response)=>{
        try {
            const id = req.body.id;
            const name = req.body.name;
            const price = req.body.price;
            const category = req.body.category;
    
            if (category.length < 1 || name.length < 1 || price.length < 1 || id.length < 1) {
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

        const newProduct:TProduct = {
            id,
            name,
            price,
            category,
        }

        products.push(newProduct)

        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error) {
        console.log(error)

        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
        
        })

/*=================================================================*/
//Purchases
//Requisição GET com query
        app.get("/purchases", (req: Request, res: Response)=>{
            try {
                res.status(200).send(purchases)
            } catch (error: any) {
                console.log(error);
    
            if (res.statusCode === 200) {
                res.status(500);
            }
        
            res.send(error.message);
            }
            
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
        try {
            const userId = req.body.userId as string;
            const productId = req.body.productId as string;
            const quantity = req.body.quantity as number;
            const totalPrice = req.body.totalPrice as number;
    
            if (totalPrice < 1 || productId.length < 1 || quantity < 1 || userId.length < 1) {
                res.status(404);
                throw new Error("Por favor, preencha todos os campos (userId, productId, quantity e totalPrice)");
            }
    
            const findUser = users.find((user) => user.id === userId)
                   
            if (!findUser) {
                res.status(404);
                throw new Error("Esse 'userId' não existe. Por favor, tente novamente");
            }
    
            const findProduct = products.find((product) => product.id === productId)
                    
            if (!findProduct) {
                res.status(404);
                throw new Error("Esse 'productId' não existe. Por favor, tente novamente");
            }
    
            if (totalPrice !== quantity*findProduct.price) {
                res.status(404);
                throw new Error("O valor total da compra não condiz com a quantity e o price do produto. Por favor, tente novamente");
            }
          
        const newPurchase:TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice,
        }

        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")
    
        } catch (error:any) {
        console.log(error)

        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
        
        })

//=================================================================================

// 1) validar um produto por id
app.get("/products/:id", (req: Request, res: Response) => {
    try {
    const id = req.params.id

    const findProduct = products.find((products) => products.id === id)
    if(!findProduct){
        res.status(400)
        throw new Error("Produto não encontrado")
    }

    const result = products.find((products) => products.id === id)
    res.status(200).send(result)
    console.log("Produto encontrado")

     } catch (error:any) {
        console.log(error)

        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//validar a compra por usuario id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findUser = purchases.filter((purchase) => purchase.userId === id)
        if(!findUser){
            res.status(404) //res.statusCode = 404
            throw new Error("Compra não encontrada. Verifique a 'id'.")
        }
        const result = purchases.filter((purchase) => purchase.userId === id)
        res.status(200).send(result)
        console.log("Array de compras do user procurado")
    
    } catch (error: any) {
        console.log(error)

        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
    
    
})





//=================================================================================
// 2) Deletando

    //======delete de usuario======
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
    const id = req.params.id

    const findUser = users.find((users) => users.id === id)
    if (!findUser){
        res.status(400)
        throw new Error("Usuario não encontrado")
    }
    //encontrar o indice do item a ser removido
    const indexToRemove = users.findIndex((user) => user.id === id)
    
    //só deleter caso o indice seja válido (ou seja, encontrou o item)
    if (indexToRemove >= 0){
        users.splice(indexToRemove, 1)
    }

    res.status(200).send("Usuário apagado com sucesso")
   
    } catch (error: any) {
    console.log(error)

    if (res.statusCode == 200) {
        res.status(500)
    }
    res.send(error.message)
}
   
   
})

    //======delete de produto=======
app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
    
        const findProduct = products.find((products) => products.id === id)
        if (!findProduct){
            res.status(400)
            throw new Error("Produto não encontrado")
        }
        //encontrar o indice do item a ser removido
        const indexToRemove = products.findIndex((products) => products.id === id)
        
        //só deleter caso o indice seja válido (ou seja, encontrou o item)
        if (indexToRemove >= 0){
            products.splice(indexToRemove, 1)
        }
    
        res.status(200).send("Produto apagado com sucesso")
       
    } catch (error: any) {
        console.log(error)
    
        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
       
       
    })    





//===================================================================================

// 3) Editando

    //======editando um user======

app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const newId = req.body.id as string | undefined;
        const newEmail = req.body.email as string | undefined;
        const newPassword = req.body.password as string | undefined;

        if (newId !== undefined) {
            users.map((user) => {
                if (user.id === newId) {
                    res.status(404);
                    throw new Error("Esse 'id' já existe. Por favor, tente novamente");
                }
            })
        }

        if (newEmail !== undefined) {
            users.map((user) => {
                if (user.email === newEmail) {
                    res.status(404);
                    throw new Error("Esse 'email' já existe. Por favor, tente novamente");
                }
            })
        }
      
        const user = users.find((user) => user.id === id);
      
        if (user) {
          user.id = newId || user.id;
          user.email = newEmail || user.email;
          user.password = newPassword || user.password;
        } else { 
          res.status(404);
          throw new Error("Usuário não encontrado. Verifique a 'id'");
        }
      
        res.status(200).send("Cadastro atualizado com sucesso");
    
    } catch (error: any) {
        console.log(error)

        if (res.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)
    }
    
  
})


    //======editando um produto======

app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const newId = req.body.id as string | undefined;
        const newName = req.body.name as string | undefined;
        const newPrice = req.body.price as number | undefined;
        const newCategory = req.body.category as ProductCategory | undefined;

        if (newId !== undefined) {
            users.map((user) => {
                if (user.id === id) {
                    res.status(404);
                    throw new Error("Esse 'id' já existe. Por favor, tente novamente");
                }
            })
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(404);
                throw new Error("'price' deve ser um number");
            }
        }

        const product = products.find((product) => product.id === id);
      
        if (product) {
          product.id = newId || product.id;
          product.name = newName || product.name;
          product.price = isNaN(newPrice) ? product.price : newPrice;
          product.category = newCategory || product.category;
        } else { 
          res.status(404);
          throw new Error("Produto não encontrado. Verifique a 'id'");
        }
      
        res.status(200).send("Produto atualizado com sucesso");
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }

});