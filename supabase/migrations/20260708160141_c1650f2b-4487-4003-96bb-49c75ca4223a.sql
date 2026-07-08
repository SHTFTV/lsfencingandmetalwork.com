
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Admins can view roles" on public.user_roles
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Leads
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service text not null,
  linear_feet integer,
  fence_height text,
  gate text,
  city text not null,
  postal text,
  timeline text,
  name text not null,
  phone text not null,
  email text not null,
  notes text,
  status text not null default 'new',
  source text,
  user_agent text,
  ip text
);

grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;
grant all on public.leads to service_role;

alter table public.leads enable row level security;

-- Anyone can submit a lead
create policy "Anyone can submit a lead" on public.leads
  for insert to anon, authenticated
  with check (true);

-- Only admins can read/update/delete leads
create policy "Admins can view leads" on public.leads
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update leads" on public.leads
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete leads" on public.leads
  for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
