import { createClient } from '@/utils/supabase/server';
import { BusinessTable } from '@/components/admin/BusinessTable';

export const dynamic = 'force-dynamic';

export default async function AdminBusinessesPage() {
    const supabase = await createClient();

    const { data: businesses } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="animate-in fade-in duration-500">
            <BusinessTable initialBusinesses={businesses || []} />
        </div>
    );
}
