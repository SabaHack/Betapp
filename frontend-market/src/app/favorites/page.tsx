'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { userPropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

export default function FavoritesPage() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  useEffect(() => {
    setSavedProperties(userPropertyService.getSavedProperties());
  }, []);

  return (
    <div className="min-h-screen bg-luxury-dark">
      <div className="bg-luxury-charcoal border-b border-luxury-border py-12">
        <div className="max-w-7xl mx-auto px-4"><h1 className="font-display text-4xl font-bold text-white mb-4">Saved Properties</h1><p className="text-luxury-textMuted">{savedProperties.length} properties saved</p></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {savedProperties.length === 0 ? (
          <div className="text-center py-20"><Heart className="w-12 h-12 text-luxury-textMuted mx-auto mb-4" /><h3 className="font-display text-2xl text-white mb-2">No saved properties</h3><p className="text-luxury-textMuted mb-4">Save properties you like to see them here</p><Link href="/properties" className="btn-secondary">Browse Properties</Link></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{savedProperties.map(p => <PropertyCard key={p.id} property={p} />)}</div>
        )}
      </div>
    </div>
  );
}