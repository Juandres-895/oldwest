# Old West Steak House — Menú Digital

Menú digital premium para las sedes de Old West Steak House. Cada sede tiene
su propia URL y código QR; el contenido (platos, precios, disponibilidad,
fotos) se administra desde un panel propio, sin necesitar un desarrollador.

## Stack

- Next.js 16 (App Router, TypeScript) + Tailwind CSS v4
- Supabase (Postgres + Auth + Storage) — proyecto **old-west-steak-house**
  (org "Juandres", región us-east-1), ya creado y con el esquema + contenido
  real de Caobos y Bellavista cargados.
- Vercel (hosting) — proyecto **oldwest** (team "juandres"), en producción en
  [oldwest-juandres.vercel.app](https://oldwest-juandres.vercel.app), conectado
  al repo de GitHub `Juandres-895/oldwest` (cada push a `master` redespliega
  automático).

## Producción — ya desplegado

- Menú público: `https://oldwest-juandres.vercel.app/caobos`,
  `/bellavista` (destino directo de cada QR).
- Panel admin: `https://oldwest-juandres.vercel.app/admin/login`, con el
  usuario que ya creaste en el dashboard de Supabase.
- Variables de entorno configuradas en Vercel (Project Settings →
  Environment Variables): `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Fotos de platos/bebidas servidas desde Supabase Storage (bucket
  `menu-images`, público de solo lectura), no desde `public/menu`.

## 1. Variables de entorno (solo para correr en local)

Ya están cargadas en `.env.local` apuntando al proyecto real. Si necesitas
recrearlas:

```
NEXT_PUBLIC_SUPABASE_URL=https://vlrzbxxfysnddznrgrwy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=... (Project Settings → API → anon public key)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Correr en local

```bash
npm install
npm run dev
```

- Menú público: [http://localhost:3000](http://localhost:3000) → elige una
  sede, o entra directo a `/caobos`, `/bellavista`.
- Panel admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  con tu usuario de Supabase.

## 3. Desplegar cambios nuevos

Ya no hace falta nada manual: cualquier cambio que hagas (código, o desde el
admin) se ve reflejado con solo hacer `git push` a `master` — Vercel
redespliega solo. Desde `/admin/qr` puedes descargar el código QR de cada
sede (SVG para imprimir en alta calidad, PNG para compartir).

Cuando compres un dominio propio: agrégalo en Vercel (Project Settings →
Domains), actualiza `NEXT_PUBLIC_SITE_URL` ahí mismo y en `.env.local`, y
vuelve a desplegar — sin tocar código. Los QR ya impresos con la URL de
Vercel siguen funcionando siempre.

## Contenido cargado hasta ahora

- **Caobos** (Los Patios, Norte de Santander): 23 categorías, 98 platos y
  bebidas.
- **Bellavista** (Cúcuta), concepto Tex-Mex: 4 categorías propias (Tacos,
  Fuertes Mexicanos, Margaritas, Cheladas) + 38 platos/bebidas exclusivos,
  más los que comparte con Caobos (mismo catálogo, con su propio precio
  donde difiere).
- Las 136 fotos reales (extraídas de las cartas PDF) y el logo propio de
  Bellavista ya están enlazados.

Las demás sedes se agregan de la misma forma a medida que envíes sus cartas.

## Estructura

- `app/(public)/[slug]` — menú público de cada sede (destino del QR).
- `app/admin` — panel de administración (sedes, categorías, platos,
  agotados hoy, códigos QR).
- `lib/data` — acceso a datos (Supabase).
- `supabase/migrations` — esquema versionado de la base de datos.
