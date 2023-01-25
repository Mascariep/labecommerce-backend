-- Active: 1673886948299@@127.0.0.1@3306
--CRIANDO A TABELA users--
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

SELECT DATETIME("now", "localtime");

--EXCLUINDO A TABELA--
DROP TABLE users;

--INSERINDO DADOS--
INSERT INTO users (id, name, email, password)
VALUES 
	("u001", "Edipo", "teste1@teste.com", "123456"),
	("u002", "Pamela", "teste2@teste.com", "654321"),
    ("u003", "Aurora", "teste3@teste.com", "13579");

----------------------------------------------------------------

--CRIANDO A TABELA products--
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

--EXCLUINDO A TABELA--
DROP TABLE products;

--INSERINDO DADOS--
INSERT INTO products (id, name, price, category, description, imageUrl)
VALUES
    ("01", "goiaba", 5.00, "Fruta", "fruta fresca", "https://picsum.photos/200"),
    ("02", "alface", 1.00, "Verduras", "verdura fresca", "https://picsum.photos/200"),
    ("03", "manga", 5.00, "Fruta", "fruta fresca", "https://picsum.photos/200"),
    ("04", "rucúla", 1.00, "Verduras", "verdura fresca", "https://picsum.photos/200"),
    ("05", "uva", 3.00, "Fruta", "fruta fresca", "https://picsum.photos/200");

-----------------------------------------------------
-- EXERCÍCIO 1
-- Get All Users
    -- retorna todos os usuários cadastrados
SELECT * FROM users;

-- Get All Products
    -- retorna todos os produtos cadastrados
SELECT * FROM products;

-- Search Product by name
    -- mocke um termo de busca, por exemplo "monitor"
    -- retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name = "manga";

-- Create User
    -- mocke um novo usuário
    -- insere o item mockado na tabela users
INSERT INTO users (id, name, email, password)
VALUES 
    ("u004", "Antonio", "teste4@teste.com", "02468");

-- Create Product
    -- mocke um novo produto
    -- insere o item mockado na tabela products
INSERT INTO products (id, name, price, category)
VALUES
    ("06", "almeirão", 3.00, "Verduras");

---------------------------------------------------------
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
WHERE id = "u002";

-- Delete Product by id
    -- mocke uma id
    -- delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = "04";

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
WHERE id = "01";

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
-- SELECT * FROM products
-- WHERE price > 1.0
-- 	AND price < 5.0
-- ORDER BY price ASC;

----------------------------------------------------------------
--RELAÇÕES SQL
--EXERCÍCIO 1

--CRIAR A TABELA PURCHASES
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    userId TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

SELECT * FROM purchases; -- VISUALIZAR
DROP TABLE purchases; --DELETAR

--EXERCÍCIO 2
-- POPULANDO A TABELA PURCHASES
-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes), devem iniciar com a data de entrega nula.
INSERT INTO purchases (id, total_price, paid, userId) -- No SQLite não aceita booleano (0 = false; 1 = true)
VALUES
    ("c001", 15.0, "0", "u001"),
    ("c002", 10.0, "1", "u002"),
    ("c003", 25.0, "1", "u003"),
    ("c004", 12.0, "0", "u001"),
    ("c005", 9.0, "1", "u002"),
    ("c006", 30.0, "1", "u003");


-- b) Edite o status da data de entrega de um pedido
UPDATE purchases SET delivered_at = DATETIME() WHERE id = "c001";

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

-- EXERCICÍO 1
    -- Criação da tabela de relações
    -- nome da tabela: purchases_products

CREATE TABLE IF NOT EXISTS purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
	FOREIGN KEY (product_id) REFERENCES products (id)
);

    -- DELETAR A TABELA
DROP TABLE purchases_products;

-- EXERCÍCIO 2
    -- Com a tabela de relações criada podemos finalmente realizar compras no banco de dados!
    -- Inserção dos dados
        -- Popule sua tabela purchases_products simulando 3 compras de clientes.
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("c001", "01", 3),
    ("c002", "02", 10),
    ("c003", "03", 5);

    -- VISUALIZAR A TABELA
SELECT * FROM purchases_products;

    -- Consulta com junção INNER JOIN
        --Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).

SELECT * FROM purchases
LEFT JOIN purchases_products -- tabela de relação
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON products.id = purchases_products.product_id;

-- SELECT 
--     purchases.id AS purchaseId, 
--     purchases.total_price AS totalPrice,
--     purchases.paid,
--     purchases.delivered_at,
--     purchases.buyer_id AS buyerId,
--     products.id AS productId,
--     products.name AS productName,
--     products.price,
--     products.category,
--     purchases_products.purchase_id AS purchaseId,
--     purchases_products.product_id,
--     purchases_products.quantity
--  FROM purchases
-- LEFT JOIN purchases_products
-- ON purchases_products.purchase_id = purchases.id
-- INNER JOIN products
-- ON products.id = purchases_products.product_id;
