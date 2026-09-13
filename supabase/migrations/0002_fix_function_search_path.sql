-- Corrige advertencia de seguridad: search_path mutable en función trigger
alter function public.set_updated_at() set search_path = '';
