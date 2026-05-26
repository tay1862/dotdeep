-- ============================================================
-- DotDeep Design — Supabase Schema
-- Run this in Supabase SQL Editor (once)
-- ============================================================

-- Services
create table if not exists public.services (
  id            text primary key,
  slug          text unique not null,
  icon          text not null default 'code',
  title         jsonb not null default '{"en":"","th":"","lo":""}',
  short_description jsonb not null default '{"en":"","th":"","lo":""}',
  description   jsonb not null default '{"en":"","th":"","lo":""}',
  features      jsonb not null default '[]',
  order_index   integer not null default 0,
  created_at    timestamptz default now()
);

-- Pricing Items (child of services)
create table if not exists public.pricing_items (
  id          text primary key,
  service_id  text not null references public.services(id) on delete cascade,
  name        jsonb not null default '{"en":"","th":"","lo":""}',
  price       integer,
  currency    text not null default 'LAK',
  description jsonb not null default '{"en":"","th":"","lo":""}',
  features    jsonb not null default '[]',
  popular     boolean default false,
  order_index integer not null default 0
);

-- Projects
create table if not exists public.projects (
  id           text primary key,
  slug         text unique not null,
  title        jsonb not null default '{"en":"","th":"","lo":""}',
  description  jsonb not null default '{"en":"","th":"","lo":""}',
  category     text not null default 'web',
  cover_url    text,
  image_urls   jsonb default '[]',
  client       text,
  tech_stack   jsonb default '[]',
  project_url  text,
  video_url    text,
  featured     boolean default false,
  completed_at date,
  order_index  integer not null default 0,
  created_at   timestamptz default now()
);

-- Team Members
create table if not exists public.team_members (
  id           text primary key,
  first_name   text not null,
  last_name    text not null,
  picture_url  text,
  role         jsonb not null default '{"en":"","th":"","lo":""}',
  bio          jsonb not null default '{"en":"","th":"","lo":""}',
  social_links jsonb default '{"facebook":null,"instagram":null,"linkedin":null,"tiktok":null,"whatsapp":null,"line":null}',
  order_index  integer not null default 0
);

-- About (singleton — always use id = 'main')
create table if not exists public.about (
  id              text primary key default 'main',
  heading         jsonb not null default '{"en":"","th":"","lo":""}',
  vision          jsonb not null default '{"en":"","th":"","lo":""}',
  mission         jsonb not null default '{"en":"","th":"","lo":""}',
  story           jsonb not null default '{"en":"","th":"","lo":""}',
  story_image_url text,
  tech_stack      jsonb default '[]'
);

-- Site Settings (singleton — always use id = 'main')
create table if not exists public.site_settings (
  id                text primary key default 'main',
  contact_email     text,
  contact_phone     text,
  address           jsonb default '{"en":"","th":"","lo":""}',
  google_maps_embed text,
  social_links      jsonb default '{"facebook":null,"instagram":null,"tiktok":null,"whatsapp":null,"line":null,"linkedin":null}'
);

-- ============================================================
-- Row Level Security (public read, no public write)
-- ============================================================
alter table public.services      enable row level security;
alter table public.pricing_items enable row level security;
alter table public.projects      enable row level security;
alter table public.team_members  enable row level security;
alter table public.about         enable row level security;
alter table public.site_settings enable row level security;

create policy "Public read services"      on public.services      for select using (true);
create policy "Public read pricing_items" on public.pricing_items for select using (true);
create policy "Public read projects"      on public.projects      for select using (true);
create policy "Public read team_members"  on public.team_members  for select using (true);
create policy "Public read about"         on public.about         for select using (true);
create policy "Public read site_settings" on public.site_settings for select using (true);

-- Write policies (admin panel is protected at application level)
create policy "Allow write services"      on public.services      for all using (true) with check (true);
create policy "Allow write pricing_items" on public.pricing_items for all using (true) with check (true);
create policy "Allow write projects"      on public.projects      for all using (true) with check (true);
create policy "Allow write team_members"  on public.team_members  for all using (true) with check (true);
create policy "Allow write about"         on public.about         for all using (true) with check (true);
create policy "Allow write site_settings" on public.site_settings for all using (true) with check (true);
