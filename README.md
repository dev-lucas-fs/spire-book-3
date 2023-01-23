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
return { name, text, id }
<br /><br />
post -> book/create
<br />
body = { name, password }
<br />
return status_da_requisicao
<br /><br />
put -> book/:id<br />
body = { text, password }<br />
return status_da_requisicao<br /><br />

delete -> book/:id<br />
body = { password }<br />
return status_da_requisicao
