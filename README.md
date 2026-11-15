# Newport Hobbies

Catálogo digital de productos importados. Sitio institucional en React, Vite, TypeScript y Tailwind CSS. Sin carrito ni pagos: las consultas de disponibilidad salen por WhatsApp.

## Desarrollo

```bash
npm install
npm run dev
```

## Contenido

- Productos, colores, largos y textos: `src/data/products.ts`
- WhatsApp, correo y redes: `src/data/site.ts`

Las fichas usan una ilustración de cada pieza hasta que estén las fotos definitivas. El HDMI 2.1 está en 5, 10 y 15 metros, y el HDMI 2.2 es de 10 metros. Actualizá también el número de WhatsApp antes de publicar.

## Publicación

El workflow de GitHub Actions publica la rama `main` en GitHub Pages, en `https://valentintarapow.github.io/NewportHobbies/`.

En el repositorio: Settings, Pages, Source: GitHub Actions.

Si más adelante el sitio usa un dominio propio en la raíz, hay que publicar con `base: "/"` en `vite.config.ts`.
