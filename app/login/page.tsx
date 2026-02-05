import AuthForm from '@/components/auth/AuthForm';
import { FloatingParticles } from '@/components/FloatingParticles';

export default function LoginPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 bg-black overflow-hidden">
            <FloatingParticles theme="dark" />
            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
                <AuthForm />
            </div>
        </div>
    );
}
