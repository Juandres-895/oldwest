-- Old West Steak House — esquema inicial del menú digital
-- Catálogo maestro (categories, menu_items) + disponibilidad/precio por sede (location_menu_items)

create extension if not exists "pgcrypto";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- locations
-- ---------------------------------------------------------------------------
create table locations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  city text,
  address text,
  phone text,
  logo_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger locations_set_updated_at
  before update on locations
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- categories (compartidas entre sedes)
-- ---------------------------------------------------------------------------
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  tagline_es text,
  tagline_en text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger categories_set_updated_at
  before update on categories
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- menu_items (catálogo maestro)
-- ---------------------------------------------------------------------------
create table menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  description_es text,
  description_en text,
  base_price_cop integer not null check (base_price_cop >= 0),
  image_url text,
  image_blur_data_url text,
  is_chef_recommended boolean not null default false,
  is_new boolean not null default false,
  is_spicy boolean not null default false,
  is_vegetarian boolean not null default false,
  is_gluten_free boolean not null default false,
  display_order integer not null default 0,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index menu_items_category_id_idx on menu_items(category_id);

create trigger menu_items_set_updated_at
  before update on menu_items
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- location_menu_items (unión — disponibilidad y overrides por sede)
-- ---------------------------------------------------------------------------
create table location_menu_items (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete cascade,
  menu_item_id uuid not null references menu_items(id) on delete cascade,
  is_available boolean not null default true,
  price_override_cop integer check (price_override_cop >= 0),
  is_sold_out_today boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (location_id, menu_item_id)
);

create index location_menu_items_location_id_idx on location_menu_items(location_id);
create index location_menu_items_menu_item_id_idx on location_menu_items(menu_item_id);

create trigger location_menu_items_set_updated_at
  before update on location_menu_items
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table locations enable row level security;
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table location_menu_items enable row level security;

create policy "public read locations" on locations for select using (true);
create policy "public read categories" on categories for select using (true);
create policy "public read menu_items" on menu_items for select using (true);
create policy "public read location_menu_items" on location_menu_items for select using (true);

create policy "authenticated write locations" on locations
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write menu_items" on menu_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write location_menu_items" on location_menu_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage bucket para fotos de platos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

create policy "public read menu-images" on storage.objects
  for select using (bucket_id = 'menu-images');

create policy "authenticated write menu-images" on storage.objects
  for insert with check (bucket_id = 'menu-images' and auth.role() = 'authenticated');

create policy "authenticated update menu-images" on storage.objects
  for update using (bucket_id = 'menu-images' and auth.role() = 'authenticated');

create policy "authenticated delete menu-images" on storage.objects
  for delete using (bucket_id = 'menu-images' and auth.role() = 'authenticated');
