-- Voer dit uit in de Supabase SQL Editor

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

create policy "Users can manage own progress"
on progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
