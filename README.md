# SPIRE BOOK API

SPIRE BOOK É UM APP PARA ARMAZENAMENTO DE TEXTO.

ROTAS:

get -> book/all
queries (opcional) = ?name=
return [{ name, text, id }]

get -> book/:name
return { name, text, id }

post -> book/create
body = { name, password }
return status_da_requisicao

put -> book/:id
body = { text, password }
return status_da_requisicao

delete -> book/:id
body = { password }
return status_da_requisicao
