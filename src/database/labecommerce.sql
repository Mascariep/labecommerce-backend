--CRIANDO A TABELA users--
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

--EXCLUINDO A TABELA--
DROP TABLE users;

--VISUALIZANDO A TABELA--
SELECT * FROM users;

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

--VISUALIZANDO A TABELA--
SELECT * FROM products;
