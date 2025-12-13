Mini app frontend desarrollada con React + Vite, que implementa un CRUD de publicaciones usando la API pública JSONPlaceholder. Consta de dos vistas principalmente, los datos en componentes tipo carta y tabla.

== Tecnologías Utilizadas ==
React 18 + Vite
TypeScript
TailwindCSS
Redux + JSONPlaceholder API

Funcionamiento CRUD
1. Listado de publicaciones
Se muestra una tabla o tarjetas con:
ID  
Título  
Primeros 50 caracteres del contenido  

2. Crear publicación
Formulario con los campos:
Título  
Contenido  
Archivos (solo admite PDF/JPG)

Se valida formato de archivo y se muestra vista previa de imágenes.

3. Editar publicación
Se permite actualizar una publicación desde la aplicación.  
Los datos se actualizan (local storage).

4. Eliminar publicación
Elimina la publicación de la lista local.

== Instalación y ejecución == 
Una vez descargado el proyecto, instala las dependencias con “npm install” en tu terminal y para correr el proyecto utiliza el comando “npm run dev” para ejecutar de forma local

Nota: Requiere se Node.js 18+.
