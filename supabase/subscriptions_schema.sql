-- Create plans table
create table if not exists public.plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null, -- 'main', 'job_board', 'registry', 'ai_suite'
  description text,
  price numeric not null,
  interval text not null, -- 'month', 'year', 'one_time'
  currency text default 'USD',
  features text[], -- Array of feature strings
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Create subscriptions table
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  plan_id uuid references public.plans(id) on delete set null,
  status text not null, -- 'active', 'cancelled', 'expired', 'past_due'
  current_period_start timestamptz default now(),
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;

-- Policies for Plans (Public Read)
create policy "Plans are viewable by everyone"
  on public.plans for select
  using ( true );

-- Policies for Subscriptions (User Read Own)
create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using ( auth.uid() = user_id );

-- Grant access
grant select on public.plans to anon, authenticated;
grant select, insert, update on public.subscriptions to authenticated;
