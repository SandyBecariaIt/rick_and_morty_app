# Rick And Morty App

Aplicación en Vue que consume la API de Rick and Morty y muestra una lista de personajes con búsqueda inteligente.

## Objetivo del proyecto


Desarrollar una aplicación que liste y permita buscar personajes de la API de Rick and Morty, con las siguientes características:

- Listado de personajes.
- Buscador con autocompletado.
- Visualización de detalle por personaje.
- Interfaz atractiva y estética (UI, transiciones, etc.).

## Funcionalidades

- Consulta de personajes desde la API.
- Filtro dinámico por nombre.
- Autocompletado en el buscador.
- Vista de detalle con información como:
- Imagen del personaje

## Cómo ejecutar el proyecto

1. Instalar dependencias:

```sh
npm install
```

2. Iniciar el servidor de desarrollo:

```sh
npm run dev
```

3. Abrir la aplicación en el navegador:

- Vite mostrará la URL en la consola, generalmente `http://localhost:5173` o `http://localhost:5174`.

## Construir para producción

```sh
npm run build
```

## Verificar tipos

```sh
npm run type-check
```

## Notas

- El proyecto utiliza Vue 3, Vite y Bulma para los estilos.
- La API de Rick and Morty proporciona datos en formato JSON accesibles vía HTTP.
- El buscador incluye autocompletado para mejorar la experiencia de usuario.
- Cada personaje cuenta con una vista de detalle clara y ordenada.
- Se recomienda configurar variables de entorno basadas en .env.example.
