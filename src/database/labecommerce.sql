-- Active: 1673886948299@@127.0.0.1@3306


-------------------------------------------------------------------------------------
-- CREATED TABLES (CRIAÇÃO DE TODAS AS TABELAS)
--(users, products, purchases, purchases_products)

--TABELA USERS
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

SELECT DATETIME("now", "localtime");

--TABELA PRODUCTS
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- TABELA PURCHASES
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

-- TABELA PURCHASES_PRODUCTS
CREATE TABLE IF NOT EXISTS purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
	FOREIGN KEY (product_id) REFERENCES products (id)
);


------------------------------------------------------------------------------------

--SELECT TABLES (VISUALIZAR AS TABELAS CRIADAS)

-- Get All Users
    -- retorna todos os usuários cadastrados
SELECT * FROM users;

-- Get All Products
    -- retorna todos os produtos cadastrados
SELECT * FROM products;

-- Get All Purchases
    -- retorna todas as compras cadastradas
SELECT * FROM purchases;

-- Get All Purchases_products
    -- retorna todos os produtos das compras cadastradas
SELECT * FROM purchases_products;


-------------------------------------------------------------------------------------

--DROP TABLES (OPÇÃO PARA EXCLUIR AS TABELAS)

--EXCLUINDO A TABELA--
DROP TABLE users;

DROP TABLE products;

DROP TABLE purchases;

DROP TABLE purchases_products;

------------------------------------------------------------------------------------

-- INSERT INTO (POPULANDO OS DADOS NAS TABELAS)

-- nessa opção o create_at não é populado, pq ele ja está automatico
INSERT INTO users (id, name, email, password) 
VALUES 
	("u001", "Edipo", "edipo@teste.com", "123"),
	("u002", "Pamela", "pamela@teste.com", "456"),
    ("u003", "Aurora", "aurora@teste.com", "789");


INSERT INTO products (id, name, price, category, description, image_url)
VALUES
    ("p001", "goiaba", 5.00, "Fruta", "fruta fresca", "https://picsum.photos/200"),
    ("p002", "alface", 1.00, "Verduras", "verdura fresca", "https://picsum.photos/200"),
    ("p003", "manga", 5.00, "Fruta", "fruta fresca", "https://picsum.photos/200"),
    ("p004", "rucúla", 1.00, "Verduras", "verdura fresca", "https://picsum.photos/200"),
    ("p005", "uva", 3.00, "Fruta", "fruta fresca", "https://picsum.photos/200");


-- No SQLite não aceita booleano (0 = false; 1 = true)
-- nessa opção o create_at não é populado, pq ele ja está automatico
INSERT INTO purchases (id, buyer, total_price) 
VALUES
    ("c001", "u001", 15.00),
    ("c002", "u002", 10.00),
    ("c003", "u003", 25.00),
    ("c004", "u001", 3.00),
    ("c005", "u002", 30.00),
    ("c006", "u003", 5.00);


INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("c001", "p001", 3),
    ("c002", "p002", 10),
    ("c003", "p003", 5),
    ("c004", "p004", 3),
    ("c005", "p005", 10),
    ("c006", "p002", 5);


--------------------------------------------------------------------------------

-- Create User
    -- mocke um novo usuário
    -- insere o item mockado na tabela users
INSERT INTO users (id, name, email, password)
VALUES 
    ("u005", "Antonio", "antonio@teste.com", "654");


-- Search Product by name
    -- mocke um termo de busca, por exemplo "monitor"
    -- retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name = "uva";


-- Create Product
    -- mocke um novo produto
    -- insere o item mockado na tabela products
INSERT INTO products (id, name, price, category, description, image_url)
VALUES
    ("p006", "almeirão", 3.00, "Verduras", "Verdura fresca", "https://picsum.photos/200");


---------------------------------------------------------------------------------------

-- EXERCÍCIO 2
-- Get Products by id
    -- mocke uma id
    -- busca baseada no valor mockado
SELECT * FROM users
WHERE id = "u002";

-- Delete User by id
    -- mocke uma id
    -- delete a linha baseada no valor mockado
DELETE FROM users
WHERE id = "u004";

-- Delete Product by id
    -- mocke uma id
    -- delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = "p006";

-- Edit User by id
    -- mocke valores para editar um user
    -- edite a linha baseada nos valores mockados
UPDATE users
SET password = "123456"
WHERE id = "u001";

-- Edit Product by id
    -- mocke valores para editar um product
    -- edite a linha baseada nos valores mockados
UPDATE products
SET 
    price = "10.0",
    category = "Verduras"
WHERE id = "p001";

---------------------------------------------------------

-- EXERCÍCIO 3
-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- Get All Products versão 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente

SELECT * FROM products
WHERE price > 1.00
AND price < 15.00
ORDER BY price ASC;

------------------------------------------------------------------------------------------

--EXERCÍCIO 2
-- POPULANDO A TABELA PURCHASES
-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes), devem iniciar com a data de entrega nula.

-- b) Edite o status da data de entrega de um pedido
UPDATE purchases SET created_at = DATETIME() WHERE id = "c001";

--EXERCÍCIO 3
-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
-- Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.
-- SELECT * FROM users
-- INNER JOIN purchases
-- ON purchases.buyer_id = users.id;

Select * From purchases
WHERE purchases.id = "c003";

--Deletar item
DELETE FROM purchases WHERE id = "c007";

---------------------------------------------------------------------------------

-- EXERCÍCIO 2
    -- Com a tabela de relações criada podemos finalmente realizar compras no banco de dados!
    -- Inserção dos dados
        -- Popule sua tabela purchases_products simulando 3 compras de clientes.

    -- Consulta com junção INNER JOIN
        --Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).

SELECT * FROM purchases
LEFT JOIN purchases_products -- tabela de relação
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON products.id = purchases_products.product_id;

SELECT 
    purchases.id AS purchaseId, 
    purchases.total_price AS totalPrice,
    purchases.paid,
    purchases.created_at,
    purchases.buyer AS buyerId,
    products.id AS productId,
    products.name AS productName,
    products.price,
    products.category,
    purchases_products.purchase_id AS purchaseId,
    purchases_products.product_id,
    purchases_products.quantity
FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON products.id = purchases_products.product_id;
