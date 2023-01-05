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
import { ProductCategory } from "./types";

// console.log(users);
// console.log(products);
// console.log(purchases);

//Exercicio 2: chamando funções
//user
createUser("Aurora", "teste3@teste.com", "654321")
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