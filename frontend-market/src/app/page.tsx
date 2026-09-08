'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Home, Clock, Globe, Search, Handshake } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => { propertyService.getFeaturedProperties().then(setFeaturedProperties); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920" alt="Luxury Property" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/95 via-luxury-black/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in">
              Find Your<br /><span className="text-luxury-gold">Dream Home</span><br />in Ethiopia
            </h1>
            <p className="text-xl text-luxury-textMuted mb-10">Premium real estate platform connecting the Ethiopian diaspora with luxury properties.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties?type=buy" className="btn-primary flex items-center justify-center text-lg"><Search className="w-5 h-5 mr-2" />Buy Property</Link>
              <Link href="/properties?type=rent" className="btn-secondary flex items-center justify-center text-lg"><Home className="w-5 h-5 mr-2" />Rent Property</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Featured Properties</h2>
            <p className="text-luxury-textMuted text-lg">Handpicked luxury properties from across Ethiopia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property) => (<PropertyCard key={property.id} property={property} />))}
          </div>
          <div className="text-center mt-12">
            <Link href="/properties" className="btn-secondary inline-flex items-center">View All Properties <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* Why BETAPP */}
      <section className="py-20 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Why BETAPP</h2>
            <p className="text-luxury-textMuted text-lg">Built for the Ethiopian diaspora with trust and excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6"><div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-luxury-gold" /></div><h3 className="font-display text-xl font-semibold text-white mb-2">Verified Listings</h3><p className="text-luxury-textMuted text-sm">Every property verified for authenticity.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-luxury-gold" /></div><h3 className="font-display text-xl font-semibold text-white mb-2">Diaspora Focus</h3><p className="text-luxury-textMuted text-sm">Tailored for Ethiopians abroad.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-8 h-8 text-luxury-gold" /></div><h3 className="font-display text-xl font-semibold text-white mb-2">24/7 Support</h3><p className="text-luxury-textMuted text-sm">Always here to help.</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4"><Handshake className="w-8 h-8 text-luxury-gold" /></div><h3 className="font-display text-xl font-semibold text-white mb-2">Trusted Partners</h3><p className="text-luxury-textMuted text-sm">Work with reputable agents.</p></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="font-display text-4xl font-bold text-white mb-4">How It Works</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div><div className="w-12 h-12 bg-luxury-gold text-luxury-black font-bold text-xl flex items-center justify-center mb-4">1</div><h3 className="font-display text-xl font-semibold text-white mb-2">Search</h3><p className="text-luxury-textMuted text-sm">Browse thousands of verified properties.</p></div>
            <div><div className="w-12 h-12 bg-luxury-gold text-luxury-black font-bold text-xl flex items-center justify-center mb-4">2</div><h3 className="font-display text-xl font-semibold text-white mb-2">Connect</h3><p className="text-luxury-textMuted text-sm">Contact verified agents.</p></div>
            <div><div className="w-12 h-12 bg-luxury-gold text-luxury-black font-bold text-xl flex items-center justify-center mb-4">3</div><h3 className="font-display text-xl font-semibold text-white mb-2">Visit</h3><p className="text-luxury-textMuted text-sm">Tour properties in person or virtually.</p></div>
            <div><div className="w-12 h-12 bg-luxury-gold text-luxury-black font-bold text-xl flex items-center justify-center mb-4">4</div><h3 className="font-display text-xl font-semibold text-white mb-2">Own</h3><p className="text-luxury-textMuted text-sm">Complete your purchase or rental.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}