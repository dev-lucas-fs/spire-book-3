# SPIRE BOOK API

SPIRE BOOK É UM APP PARA ARMAZENAMENTO DE TEXTO.

ROTAS:

get -> book/all
<br />
queries (opcional) = ?name=
<br />
return [{ name, text, id }]
<br /><br />
get -> book/:name
<br />
header = location : string
<br />
return { name, text, id }
<br /><br />
post -> book/create
<br />
body = { name, password, categoryId: number }
<br />
return status_da_requisicao
<br /><br />
put -> book/:id<br />
body = { text, password }<br />
return status_da_requisicao<br /><br />

delete -> book/:id<br />
body = { password }<br />
return status_da_requisicao

<br />
<br />
<br />
get -> category/all
<br />
return [{id: number, name: string}]
<br />
get -> category/:id
<br />
return {id: number, name: string}
<br />
post -> category/create
<br />
body: { name: string }
<br />
return {id: number, name: string}


