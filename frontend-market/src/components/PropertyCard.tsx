'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { Bed, Bath, Maximize, MapPin, Heart, CheckCircle } from 'lucide-react';
import { userPropertyService } from '@/services/propertyService';
import { useState, useEffect } from 'react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(userPropertyService.isPropertySaved(property.id));
  }, [property.id]);

  const formatPrice = (price: number) => {
    return property.listingType === 'rent' 
      ? `ETB ${price.toLocaleString()}/mo`
      : `ETB ${price.toLocaleString()}`;
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      userPropertyService.removeSavedProperty(property.id);
    } else {
      userPropertyService.saveProperty(property);
    }
    setIsSaved(!isSaved);
  };

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="card-luxury">
        <div className="relative h-64 overflow-hidden">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className={`px-3 py-1 text-xs font-semibold uppercase ${property.listingType === 'buy' ? 'bg-luxury-gold text-luxury-black' : 'bg-white text-luxury-black'}`}>
              For {property.listingType}
            </span>
            {property.featured && <span className="px-3 py-1 text-xs font-semibold bg-luxury-charcoal text-white">Featured</span>}
          </div>
          {property.verified && (
            <div className="absolute top-3 right-12 flex items-center space-x-1 bg-luxury-charcoal/90 px-2 py-1">
              <CheckCircle className="w-3 h-3 text-luxury-gold" /><span className="text-xs text-white">Verified</span>
            </div>
          )}
          <button onClick={handleSave} className="absolute top-3 right-3 p-2 bg-luxury-charcoal/90 rounded-full hover:bg-luxury-gold">
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-luxury-gold text-luxury-gold' : 'text-white'}`} />
          </button>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-white group-hover:text-luxury-gold mb-3 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-luxury-textMuted text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1" /><span>{property.location.subCity}, {property.location.city}</span>
          </div>
          <div className="flex items-center justify-between text-luxury-textMuted text-sm pb-4 border-b border-luxury-border">
            <div className="flex items-center"><Bed className="w-4 h-4 mr-1" /><span>{property.features.bedrooms}</span></div>
            <div className="flex items-center"><Bath className="w-4 h-4 mr-1" /><span>{property.features.bathrooms}</span></div>
            <div className="flex items-center"><Maximize className="w-4 h-4 mr-1" /><span>{property.features.size} m²</span></div>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <span className="text-luxury-gold font-bold text-xl">{formatPrice(property.price)}</span>
            <span className="text-xs text-luxury-textMuted uppercase">{property.propertyType}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}