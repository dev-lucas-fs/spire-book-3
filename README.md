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

## RODAR TESTES
1. <b>npm run test category
2. <b>npm run test book

## ROTAS
Rotas da API
#### Listar todos os books [ GET ] [ "/book/all" ]
- Query
```
	name : string
  ```
- Response
```
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
```
	{
		location: string
	}
```
- Response
```
	{ 
		id: number, 
		name: string, 
		categoryId: number,
		text: string
	}
``` 

#### Criar um book [ POST ] [ "/book/create" ]
- Body
```
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
```
	{
		text: string
		password: string
	}
```
- Response
	 - Status code

#### Criar um book [ Delete ] [ "/book/:id" ]
- Body
```
	{
		password: string
	}
```
- Response
	 - Status code


#### Listar todas as categorias [ GET ] [ "/category/all" ]
- Response
```
	[
		{ 
			id: number, 
			name: string
		}
	]
``` 

#### Listar categoria pelo id [ GET ] [ "/category/:id" ]
- Response
```
	{ 
		id: number, 
		name: string, 
	}
``` 

#### Criar uma categoria [ POST ] [ "/category/create" ]
- Body
```
	{
		name: string,
	}
```

- Response
```
	{
		id: number,
		name: string
	}
```


