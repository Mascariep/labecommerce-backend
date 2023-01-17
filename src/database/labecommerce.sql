-- Active: 1673886948299@@127.0.0.1@3306
--CRIANDO A TABELA users--
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

--EXCLUINDO A TABELA--
DROP TABLE users;

--INSERINDO DADOS--
INSERT INTO users (id, email, password)
VALUES 
	("Edipo", "teste1@teste.com", "123456"),
	("Pamela", "teste2@teste.com", "654321"),
    ("Aurora", "teste3@teste.com", "13579");

----------------------------------------------------------------

--CRIANDO A TABELA products--
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

--EXCLUINDO A TABELA--
DROP TABLE products;

--INSERINDO DADOS--
INSERT INTO products (id, name, price, category)
VALUES
    ("01", "goiaba", 5.00, "Fruta"),
    ("02", "alface", 1.00, "Verduras"),
    ("03", "manga", 5.00, "Fruta"),
    ("04", "rucúla", 1.00, "Verduras"),
    ("05", "uva", 3.00, "Fruta");

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
INSERT INTO users (id, email, password)
VALUES 
    ("Antonio", "teste4@teste.com", "02468");

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
WHERE id = "Pamela";

-- Delete User by id
    -- mocke uma id
    -- delete a linha baseada no valor mockado
DELETE FROM users
WHERE id = "Pamela";

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
WHERE id = "Edipo";

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
SELECT * FROM products
WHERE price > 1.0
	AND price < 5.0
ORDER BY price ASC;