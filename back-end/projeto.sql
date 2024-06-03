
SELECT * FROM usuarios
SELECT * FROM filmes
SELECT * FROM salas
SELECT * FROM reservas
SELECT * FROM cidades

INSERT INTO Reservas (usuario_id, sala_id, filme_id, cidade_id, ingressos, horario, cadeiras)
VALUES (1, 1, 1, 1, 2, '14:30', '12');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Client (  
    Client_id uuid DEFAULT uuid_generate_v4 (),  
    client_first_name VARCHAR NOT NULL,  
    client_last_name VARCHAR NOT NULL,  
    client_email_id VARCHAR NOT NULL,  
    Client_address VARCHAR,  
    PRIMARY KEY (Client_id)  
);

INSERT INTO Client (client_first_name, client_last_name,   
client_email_id, Client_address)  
VALUES('Mike','Ross', 'ross.mike@hotmail.com','Houston'),  
('Hannah','Garcia','hannahgarcia@gmail.com','San Diego'),  
('Maria ','Hernandez','Maira.hernandez@gmail.com','Seattle'),  
('Robert','Smith','smith.robert@hotmail.com','Dallas');  
 
  
SELECT * from filmes where id = 'c58a9da0-fafd-486b-bb22-22e1cf746069'
