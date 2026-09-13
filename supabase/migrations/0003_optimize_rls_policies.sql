-- Reemplaza las politicas "authenticated write" (for all) por politicas especificas
-- de insert/update/delete (el select ya lo cubre "public read"), y envuelve
-- auth.role() en (select ...) para que se evalue una sola vez por consulta,
-- no una vez por fila.

drop policy "authenticated write locations" on locations;
create policy "authenticated insert locations" on locations
  for insert with check ((select auth.role()) = 'authenticated');
create policy "authenticated update locations" on locations
  for update using ((select auth.role()) = 'authenticated') with check ((select auth.role()) = 'authenticated');
create policy "authenticated delete locations" on locations
  for delete using ((select auth.role()) = 'authenticated');

drop policy "authenticated write categories" on categories;
create policy "authenticated insert categories" on categories
  for insert with check ((select auth.role()) = 'authenticated');
create policy "authenticated update categories" on categories
  for update using ((select auth.role()) = 'authenticated') with check ((select auth.role()) = 'authenticated');
create policy "authenticated delete categories" on categories
  for delete using ((select auth.role()) = 'authenticated');

drop policy "authenticated write menu_items" on menu_items;
create policy "authenticated insert menu_items" on menu_items
  for insert with check ((select auth.role()) = 'authenticated');
create policy "authenticated update menu_items" on menu_items
  for update using ((select auth.role()) = 'authenticated') with check ((select auth.role()) = 'authenticated');
create policy "authenticated delete menu_items" on menu_items
  for delete using ((select auth.role()) = 'authenticated');

drop policy "authenticated write location_menu_items" on location_menu_items;
create policy "authenticated insert location_menu_items" on location_menu_items
  for insert with check ((select auth.role()) = 'authenticated');
create policy "authenticated update location_menu_items" on location_menu_items
  for update using ((select auth.role()) = 'authenticated') with check ((select auth.role()) = 'authenticated');
create policy "authenticated delete location_menu_items" on location_menu_items
  for delete using ((select auth.role()) = 'authenticated');
