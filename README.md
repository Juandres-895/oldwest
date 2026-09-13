# Old West Steak House — Menú Digital

Menú digital premium para las sedes de Old West Steak House. Cada sede tiene
su propia URL y código QR; el contenido (platos, precios, disponibilidad,
fotos) se administra desde un panel propio, sin necesitar un desarrollador.

## Stack

- Next.js 16 (App Router, TypeScript) + Tailwind CSS v4
- Supabase (Postgres + Auth + Storage) — proyecto **old-west-steak-house**
  (org "Juandres", región us-east-1), ya creado y con el esquema + contenido
  real de Caobos y Bellavista cargados.
- Vercel (hosting, pendiente de desplegar)

## 1. Crear tu usuario administrador (pendiente — solo tú puedes hacerlo)

En el [dashboard de Supabase](https://supabase.com/dashboard/project/vlrzbxxfysnddznrgrwy):

1. **Authentication → Sign In / Providers**: confirma que el login por
   correo/contraseña esté activo y **desactiva** "Allow new users to sign up"
   (solo tú vas a administrar el menú).
2. **Authentication → Users → Add user**: crea tu usuario (correo +
   contraseña) — con esas credenciales entrarás a `/admin`.

## 2. Variables de entorno

Ya están cargadas en `.env.local` apuntando al proyecto real. Si necesitas
recrearlas:

```
NEXT_PUBLIC_SUPABASE_URL=https://vlrzbxxfysnddznrgrwy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=... (Project Settings → API → anon public key)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Correr en local

```bash
npm install
npm run dev
```

- Menú público: [http://localhost:3000](http://localhost:3000) → elige una
  sede, o entra directo a `/caobos`, `/bellavista`.
- Panel admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  con el usuario que creaste en el paso 1.

## 4. Desplegar

1. Sube el repo a GitHub.
2. Impórtalo en [Vercel](https://vercel.com/new).
3. Configura las 3 variables de entorno del paso 2 (con
   `NEXT_PUBLIC_SITE_URL` apuntando a la URL que te da Vercel).
4. Despliega. Desde `/admin/qr` podrás descargar el código QR de cada sede
   (SVG para imprimir en alta calidad, PNG para compartir).

Cuando compres un dominio propio: agrégalo en Vercel (Project Settings →
Domains), actualiza `NEXT_PUBLIC_SITE_URL` y vuelve a desplegar — sin tocar
código. Los QR ya impresos con la URL de Vercel siguen funcionando siempre.

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
