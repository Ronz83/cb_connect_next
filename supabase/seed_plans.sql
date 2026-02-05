-- Insert Main Tiers
insert into public.plans (name, type, price, interval, description, features) values
('Free', 'main', 0, 'month', 'Basic access for everyone.', ARRAY['Basic Listing', 'Search Access']),
('Business Monthly', 'main', 29, 'month', 'Standard business visibility.', ARRAY['Verified Badge', 'Priority Search', 'Analytics']),
('Business Yearly', 'main', 299, 'year', 'Standard business visibility (Save 15%).', ARRAY['Verified Badge', 'Priority Search', 'Analytics']),
('Premium Monthly', 'main', 49, 'month', 'Enhanced visibility and tools.', ARRAY['Top of Search', 'Rich Media Gallery', 'Direct Messaging']),
('Premium Yearly', 'main', 499, 'year', 'Enhanced visibility and tools (Save 15%).', ARRAY['Top of Search', 'Rich Media Gallery', 'Direct Messaging']),
('Featured Monthly', 'main', 199, 'month', 'Maximum exposure.', ARRAY['Homepage Feature', 'Social Media Blast', 'Dedicated Support']),
('Featured Yearly', 'main', 1999, 'year', 'Maximum exposure (Save 15%).', ARRAY['Homepage Feature', 'Social Media Blast', 'Dedicated Support']);

-- Insert Job Board Tiers
insert into public.plans (name, type, price, interval, description, features) values
('Employee Basic', 'job_board', 0, 'month', 'For job seekers.', ARRAY['Browse Jobs', 'Apply to Basic Jobs']),
('Employer Post', 'job_board', 29, 'one_time', 'Single job posting.', ARRAY['1 Active Job Post', '30 Days Visibility']),
('Employer Unlimited Monthly', 'job_board', 199, 'month', 'Unlimited hiring.', ARRAY['Unlimited Job Posts', 'Candidate Search', 'Featured Jobs']),
('Employer Unlimited Yearly', 'job_board', 1999, 'year', 'Unlimited hiring (Save 15%).', ARRAY['Unlimited Job Posts', 'Candidate Search', 'Featured Jobs']);

-- Insert Registry Tiers
insert into public.plans (name, type, price, interval, description, features) values
('Candidate Free', 'registry', 0, 'month', 'Standard profile.', ARRAY['Public Profile', 'Basic Job Matching']),
('Candidate Pro Monthly', 'registry', 49, 'month', 'Stand out to recruiters.', ARRAY['Featured Profile', 'See Who Viewed You', 'Priority Applications']),
('Candidate Pro Yearly', 'registry', 499, 'year', 'Stand out to recruiters (Save 15%).', ARRAY['Featured Profile', 'See Who Viewed You', 'Priority Applications']);

-- Insert AI Business Suite Tiers
insert into public.plans (name, type, price, interval, description, features) values
('AI Solo Monthly', 'ai_suite', 299, 'month', 'AI tools for solo entrepreneurs.', ARRAY['Content Generation', 'Basic Market Insights', 'Auto-Reply Bot']),
('AI Solo Yearly', 'ai_suite', 2999, 'year', 'AI tools for solo (Save 15%).', ARRAY['Content Generation', 'Basic Market Insights', 'Auto-Reply Bot']),
('AI Unlimited Monthly', 'ai_suite', 599, 'month', 'Power your entire business with AI.', ARRAY['Advanced Analytics', 'Competitor Tracking', 'Full Automation Suite']),
('AI Unlimited Yearly', 'ai_suite', 5999, 'year', 'Power your business (Save 15%).', ARRAY['Advanced Analytics', 'Competitor Tracking', 'Full Automation Suite']);
