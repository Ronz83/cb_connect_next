import { createClient } from '@/utils/supabase/server';
import { UserTable } from '@/components/admin/UserTable';

export default async function AdminUsersPage() {
    const supabase = await createClient();

    // Fetch all profiles
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*, businesses(name)');

    // Fetch all businesses for the assignment dropdown
    const { data: businesses } = await supabase
        .from('businesses')
        .select('id, name')
        .order('name');

    if (error) {
        return <div className="text-red-500">Error loading users: {error.message}</div>;
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage roles and business assignments.</p>
                </div>
            </div>

            <UserTable
                initialProfiles={profiles || []}
                availableBusinesses={businesses || []}
            />
        </div>
    );
}
