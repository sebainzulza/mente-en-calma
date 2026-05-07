-- mente-en-calma: schema inicial
-- Ejecutar en el SQL editor del proyecto Supabase, o via supabase CLI.

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  created_at timestamptz default now()
);

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  content text not null,
  is_ephemeral boolean default false,
  created_at timestamptz default now()
);

create table if not exists mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  mood int not null check (mood between 1 and 5),
  emoji text,
  note text,
  created_at timestamptz default now()
);

create table if not exists trusted_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  email text,
  phone text,
  relationship text,
  consent_given_at timestamptz not null default now(),
  notification_method text not null check (notification_method in ('email','sms','whatsapp')),
  created_at timestamptz default now()
);

create table if not exists crisis_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  triggered_at timestamptz default now(),
  severity text not null check (severity in ('concern','crisis')),
  matched_pattern text,
  contact_notified boolean default false
);

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  started_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  flagged boolean default false,
  created_at timestamptz default now()
);

-- RLS: cada usuario solo accede a sus propios datos.
alter table profiles enable row level security;
alter table journal_entries enable row level security;
alter table mood_entries enable row level security;
alter table trusted_contacts enable row level security;
alter table crisis_events enable row level security;
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;

create policy "profiles: own row" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "journal: own rows" on journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "mood: own rows" on mood_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "trusted: own rows" on trusted_contacts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "crisis: own rows" on crisis_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "chat sessions: own rows" on chat_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "chat messages: own session" on chat_messages
  for all using (
    exists (
      select 1 from chat_sessions s
      where s.id = chat_messages.session_id and s.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from chat_sessions s
      where s.id = chat_messages.session_id and s.user_id = auth.uid()
    )
  );

create index if not exists journal_user_created_idx on journal_entries (user_id, created_at desc);
create index if not exists mood_user_created_idx on mood_entries (user_id, created_at desc);
