-- Create candidates table
create table if not exists public.candidates (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  headline text,
  bio text,
  location text,
  skills text[], -- Array of strings
  experience_years integer,
  resume_url text,
  linkedin_url text,
  portfolio_url text,
  is_verified boolean default false,
  is_public boolean default true,
  status text default 'open', -- 'open', 'hired', 'invisible'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.candidates enable row level security;

-- Policies
-- 1. Public can view public candidates
create policy "Public candidates are viewable by everyone"
  on public.candidates for select
  using ( is_public = true );

-- 2. Users can insert their own profile
create policy "Users can insert their own profile"
  on public.candidates for insert
  with check ( auth.uid() = id );

-- 3. Users can update their own profile
create policy "Users can update their own profile"
  on public.candidates for update
  using ( auth.uid() = id );

-- Grant access
grant select, insert, update on public.candidates to authenticated;
grant select on public.candidates to anon;
