-- Voer dit uit in de Supabase SQL Editor
-- =============================================
-- RUNS TABLE (voor de hardloop tracker)
-- =============================================

create table runs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  distance_km float not null,
  duration_seconds int not null,
  calories int not null,
  avg_pace text,
  route_json text,
  activity_type text not null default 'lopen',
  think_about text,
  reflection_answered boolean,
  reflection_notes text,
  created_at timestamptz default now()
);

alter table runs enable row level security;

create policy "Users can manage own runs"
on runs for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- =============================================
-- PROGRESS TABLE (voor de training planner)
-- =============================================

create table progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  week int not null,
  day_index int not null,
  done boolean default false,
  km float,
  gevoel text,
  sessions_json text,
  updated_at timestamp default now(),
  unique(user_id, week, day_index)
);

alter table progress enable row level security;

-- =============================================
-- MIGRATIES (voor bestaande databases)
-- =============================================

-- Voeg activity_type toe aan bestaande runs tabel:
-- alter table runs add column if not exists activity_type text not null default 'lopen';

create policy "Users can manage own progress"
on progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- =============================================
-- DAGBOEK TABLE (voor dagboek-notities)
-- =============================================

create table dagboek (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  entry_date date not null,
  title text,
  content text,
  mood text check (mood in ('geweldig', 'goed', 'neutraal', 'zwaar')),
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table dagboek enable row level security;

create policy "Users can manage own dagboek"
on dagboek for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Index voor snelle lookups per datum
create index dagboek_user_date_idx on dagboek(user_id, entry_date desc);
