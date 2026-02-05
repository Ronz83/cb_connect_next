import { createClient } from '@/utils/supabase/server';
import { BusinessForm } from '@/components/admin/BusinessForm';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBusinessPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: business } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

    const { data: countries } = await supabase.from('countries').select('*').order('name');

    if (!business) {
        notFound();
    }

    return (
        <div className="animate-in fade-in duration-500">
            <BusinessForm initialData={business} countries={countries || []} />
        </div>
    );
}
