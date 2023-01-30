# SPIRE BOOK API DOCUMENTATION

## CONFIGURAÇÕES INICIAIS
1. <b>Clone o projeto
2. <b>Instale as dependências
```bash
	npm i
```
3. <b>Execute as migrações
```bash
	npx prisma migrate dev	
```
4. <b>Rodar o projeto
```bash
	npm run dev
```
## ROTAS
Rotas da API
#### Listar todos os books [ GET ] [ "/book/all" ]
- Query
```
	name : string
  ```
- Response
```javascript
	[
		{ 
			id: number, 
			name: string, 
			categoryId: number 
		}
	]
``` 

#### Listar book pelo nome [ GET ] [ "/book/:name" ]
- Headers
```json
	{
		location: string
	}
```
- Response
```javascript
	{ 
		id: number, 
		name: string, 
		categoryId: number,
		text: string
	}
``` 

#### Criar um book [ POST ] [ "/book/create" ]
- Body
```json
	{
		name: string,
		categoryId: number,
		password: string
	}
```

- Response
	 - Status code

#### Criar um book [ PUT ] [ "/book/:id" ]
- Body
```json
	{
		text: string
		password: string
	}
```
- Response
	 - Status code

#### Criar um book [ Delete ] [ "/book/:id" ]
- Body
```json
	{
		password: string
	}
```
- Response
	 - Status code


#### Listar todas as categorias [ GET ] [ "/category/all" ]
- Response
```javascript
	[
		{ 
			id: number, 
			name: string
		}
	]
``` 

#### Listar categoria pelo id [ GET ] [ "/category/:id" ]
- Response
```javascript
	{ 
		id: number, 
		name: string, 
	}
``` 

#### Criar uma categoria [ POST ] [ "/category/create" ]
- Body
```json
	{
		name: string,
	}
```

- Response
```json
	{
		id: number,
		name: string
	}
```


