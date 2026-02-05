import AuthForm from '@/components/auth/AuthForm';
import { FloatingParticles } from '@/components/FloatingParticles';

export default function SignupPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 bg-background overflow-hidden">
            <FloatingParticles />
            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
                <AuthForm defaultView="sign_up" />
            </div>
        </div>
    );
}
