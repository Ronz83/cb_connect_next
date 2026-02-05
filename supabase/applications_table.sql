-- Create applications table
create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references public.businesses(id) on delete cascade not null, -- Jobs are stored in businesses table for now
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  cover_letter text,
  status text default 'pending', -- 'pending', 'reviewed', 'rejected', 'interview'
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(job_id, candidate_id) -- Prevent duplicate applications
);

-- Enable RLS
alter table public.applications enable row level security;

-- Policies
-- 1. Candidates can view their own applications
create policy "Candidates can view own applications"
  on public.applications for select
  using ( auth.uid() = candidate_id );

-- 2. Candidates can create applications
create policy "Candidates can create applications"
  on public.applications for insert
  with check ( auth.uid() = candidate_id );

-- 3. Business Owners (Jobs) can view applications for their jobs
-- accessible if the user owns the business (job)
create policy "Business owners can view applications"
  on public.applications for select
  using (
    exists (
      select 1 from public.businesses
      where businesses.id = applications.job_id
      and businesses.owner_id = auth.uid()
    )
  );

-- Grant access
grant select, insert, update on public.applications to authenticated;
