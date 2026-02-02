'use client';

import React, { useState } from 'react';
import { Search, Mic, Menu, Filter, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavigationMenu } from '@/components/NavigationMenu';
import { FloatingParticles } from '@/components/FloatingParticles';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { CountryDropdown } from '@/components/CountryDropdown';
import { BusinessCard } from '@/components/BusinessCard';
import { ChatPopup } from '@/components/ChatPopup';

import { themes, ThemeType } from '@/lib/themes';
import { countries } from '@/data/countries';
import { sampleBusinesses } from '@/data/businesses';
import { industries } from '@/data/industries';

export default function CBConnectApp() {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [chatType, setChatType] = useState<'voice' | 'text' | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  const t = themes[theme];

  // Filter businesses
  const filteredBusinesses = sampleBusinesses.filter((b) => {
    const matchesCountry = selectedCountry ? b.country === selectedCountry.code : true;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || b.industry === selectedIndustry;
    return matchesCountry && matchesSearch && matchesIndustry;
  });

  const handleVoiceChat = (business: any) => {
    setSelectedBusiness(business);
    setChatType('voice');
  };

  const handleTextChat = (business: any) => {
    setSelectedBusiness(business);
    setChatType('text');
  };

  return (
    <div
      className="min-h-screen relative font-sans transition-colors duration-300"
      style={{ background: t.bg }}
    >
      <FloatingParticles theme={theme} />

      {/* Navigation Menu */}
      <NavigationMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={() => {
          setSelectedCountry(null);
          setIsMenuOpen(false);
        }}
        theme={theme}
      />

      {/* Chat Popup */}
      <ChatPopup
        isOpen={!!chatType}
        onClose={() => setChatType(null)}
        type={chatType}
        business={selectedBusiness}
        theme={theme}
      />

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300"
        style={{
          background: t.headerBg,
          borderColor: t.border
        }}
      >
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedCountry(null)}
          >
            <CBConnectLogo size="small" animated />
            <span className="font-bold text-lg tracking-tight" style={{ color: t.text }}>
              CBConnect
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
              }}
            >
              <Menu className="w-5 h-5" style={{ color: t.text }} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4 max-w-2xl mx-auto min-h-screen flex flex-col relative z-10">
        {!selectedCountry ? (
          // Country Selection View
          <div className="flex-1 flex flex-coljustify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10 mt-10">
              <div className="inline-flex items-center justify-center p-3 mb-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <CBConnectLogo size="large" animated />
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: t.text }}>
                Connect to the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Caribbean
                </span>
              </h1>
              <p className="text-lg max-w-xs mx-auto leading-relaxed" style={{ color: t.textSecondary }}>
                Access AI-powered services across the entire CARICOM region.
              </p>
            </div>

            <div className="w-full max-w-md mx-auto space-y-4">
              <CountryDropdown
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
                isOpen={isCountryDropdownOpen}
                setIsOpen={setIsCountryDropdownOpen}
                theme={theme}
              />

              <div className="text-center text-xs mt-8" style={{ color: t.textMuted }}>
                Select your country to discover local businesses
              </div>
            </div>
          </div>
        ) : (
          // Business Directory View
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Search Bar */}
            <div className="sticky top-20 z-40 pb-4" style={{ background: t.bg }}>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-xl outline-none transition-all duration-300"
                  style={{
                    background: t.bgInput,
                    border: `1px solid ${t.border}`,
                    color: t.text,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <Mic className="w-4 h-4 text-orange-500" />
                </button>
              </div>

              {/* Industry Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {industries.map(industry => {
                  const Icon = industry.icon;
                  const isSelected = selectedIndustry === industry.id;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)'
                          : t.bgPill,
                        color: isSelected ? '#fff' : t.textSecondary,
                        border: isSelected ? 'none' : `1px solid ${t.border}`
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="text-sm font-medium">{industry.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold" style={{ color: t.text }}>
                  {selectedIndustry === 'all' ? 'Featured Businesses' : industries.find(i => i.id === selectedIndustry)?.name}
                </h2>
                <span className="text-xs" style={{ color: t.textMuted }}>
                  {filteredBusinesses.length} results
                </span>
              </div>

              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business, index) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    onVoiceChat={handleVoiceChat}
                    onTextChat={handleTextChat}
                    index={index}
                    theme={theme}
                  />
                ))
              ) : (
                <div className="text-center py-20 rounded-2xl border" style={{ borderColor: t.border, background: t.bgCard }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: t.bgPill }}>
                    <Search className="w-8 h-8 opacity-40" style={{ color: t.text }} />
                  </div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: t.text }}>No businesses found</h3>
                  <p className="text-sm max-w-xs mx-auto" style={{ color: t.textSecondary }}>
                    Try adjusting your search or selecting a different industry.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedIndustry('all'); }}
                    className="mt-6 px-6 py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
                    style={{ background: t.bgSolid, color: t.text, border: `1px solid ${t.border}` }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Back to Country Selection floating button */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
              <button
                onClick={() => setSelectedCountry(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(15, 15, 24, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white'
                }}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Change Country</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
