import React from 'react';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    children?: React.ReactNode;
    className?: string; // Allow extra styling
}

export const PageHero: React.FC<PageHeroProps> = ({
    title,
    subtitle,
    backgroundImage = "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2800&auto=format&fit=crop", // Default Tropical Boat/Sea
    children,
    className
}) => {
    return (
        <section className={`relative py-24 md:py-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Page Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for text readability (Darker gradient for better contrast) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white animate-fade-in-up drop-shadow-xl">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto animate-fade-in-up delay-100 drop-shadow-md">
                        {subtitle}
                    </p>
                )}

                {children && (
                    <div className="mt-8 animate-fade-in-up delay-200">
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
};
