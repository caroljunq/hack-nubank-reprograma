# hack-nubank-reprograma

Hackathona Reprograma Nubank

# Protótipo Navegável
* Link INVISION:

# NodeJs API
* Conexão com **MongoDB na AWS Plan Sandbox do Mongolab** (free) e nodejs rodando na **AWS EC2**;
* Dados ficticios e modelos da aplicação.
* Rodando na **Digital Ocean** http://138.197.170.34:3018/ 
* Rotas:
   * /empreendedoras - GET
   * /post-empreend - POST (name,birth_date,address)
   * /facilitadoras - GET 
   * /post-facil - POST (name,birth_date,address)
   * /ofertas - GET
   * /post-oferta - POST (name, description, value_contract, rate, periods)

## Rodar
* git clone
* cd path_pasta
* npm install
* node server.js
* visualizar rotas no server.js

# Validação/ verificação de identidade

## Serveless Face recognition
O reconhecimento de face será utilizado para validação de cadastro e transações financeiras do aplicativo. Para representar como este mecanismo na arquitetura foram utilizados:

* Amazon S3;
* Amazon Rekognition;
* Amazon DynamoDB;
* Amazon Lambda Functions.

![](ServerlessPhotoRecognition_Add_Image.png)
### Objetivo
Validar a transação de venda do microcrédito da facilitadora para a empreendedora através de uma verificação em dois fatores: reconhecimento de face da foto da empreendedora tirada pela facilitadora e da foto da empreendedora tira pela própria. As imagens seriam upadas na S3 e "reconhecidas" pelo Rekognition, sendo o resultado salvo no DynamoDB e lido pela aplicação. Aliado ao face recognition haveria a verificação de geolocation.

### 1 Configuração S3
* Acessar serviço S3
* Criar bucket
* Criar 2 pastas: searched_images e indexed_images no bucket

### 2 Configuração DynamoDB
* Criar duas tabelas para receber os dados dos eventos do lambda/S3

### 3 Configuração Lambda Function
* Criar 1º função em python  --> função de indexar imagem
  * Adicionar Triggers e permissões
* Criar 2ª função em python --> função de reconhecimento

### 4 Gerar Eventos
* Configurar eventos do S3 e triggers no Lambda para reconhecer/indexar imagens.

### Links importantes
* https://github.com/awslabs/serverless-photo-recognition

### ERRO AWS -  Rekognition não funcionou (plataforma não permitia)
* Não conseguimos implementar o face recognition por conta da "FALTA DE PERMISSÂO do REKOGNITION AWS no TEAM Role fornecido pelo evento" - 00:13 dia 17/03/2019.
