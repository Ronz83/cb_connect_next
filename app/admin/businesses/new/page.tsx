import { createClient } from '@/utils/supabase/server';
import { BusinessForm } from '@/components/admin/BusinessForm';

export default async function NewBusinessPage() {
    const supabase = await createClient();
    const { data: countries } = await supabase.from('countries').select('*').order('name');

    return (
        <div className="animate-in fade-in duration-500">
            <BusinessForm countries={countries || []} />
        </div>
    );
}
