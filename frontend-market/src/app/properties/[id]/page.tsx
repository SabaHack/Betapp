'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Phone, Mail, Calendar, CheckCircle, Heart, Share2 } from 'lucide-react';
import { propertyService, userPropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await propertyService.getPropertyById(params.id as string);
      if (data) {
        setProperty(data);
        userPropertyService.addToRecentlyViewed(data);
        setIsSaved(userPropertyService.isPropertySaved(data.id));
      }
      setLoading(false);
    };
    load();
  }, [params.id]);

  const handleSave = () => {
    if (!property) return;
    if (isSaved) userPropertyService.removeSavedProperty(property.id);
    else userPropertyService.saveProperty(property);
    setIsSaved(!isSaved);
  };

  const formatPrice = (price: number) => property?.listingType === 'rent' ? `ETB ${price.toLocaleString()}/month` : `ETB ${price.toLocaleString()}`;

  if (loading) return <div className="min-h-screen bg-luxury-dark flex justify-center items-center"><div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" /></div>;
  if (!property) return <div className="min-h-screen bg-luxury-dark flex justify-center items-center"><div className="text-center"><h2 className="font-display text-2xl text-white mb-4">Property not found</h2><Link href="/properties" className="btn-primary">Back</Link></div></div>;

  return (
    <div className="min-h-screen bg-luxury-dark">
      <div className="max-w-7xl mx-auto px-4 py-6"><Link href="/properties" className="inline-flex items-center text-luxury-textMuted hover:text-luxury-gold"><ArrowLeft className="w-5 h-5 mr-2" />Back</Link></div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative h-[400px] lg:h-[500px] bg-luxury-surface">
            <Image src={property.images[selectedImage]} alt={property.title} fill className="object-cover" priority />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-4 py-2 ${property.listingType === 'buy' ? 'bg-luxury-gold text-luxury-black' : 'bg-white text-luxury-black'}`}>For {property.listingType}</span>
              {property.featured && <span className="px-4 py-2 bg-luxury-charcoal text-white">Featured</span>}
              {property.verified && <span className="px-4 py-2 bg-luxury-charcoal text-white flex items-center"><CheckCircle className="w-4 h-4 mr-1" />Verified</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((img, i) => (
              <div key={i} className={`relative h-[190px] cursor-pointer border-2 ${selectedImage === i + 1 ? 'border-luxury-gold' : 'border-transparent'}`} onClick={() => setSelectedImage(i + 1)}>
                <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="bg-luxury-surface border border-luxury-border p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div><h1 className="font-display text-3xl font-bold text-white mb-2">{property.title}</h1><div className="flex items-center text-luxury-textMuted"><MapPin className="w-5 h-5 mr-2" /><span>{property.location.address}, {property.location.subCity}</span></div></div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className={`p-3 border ${isSaved ? 'border-luxury-gold bg-luxury-gold text-luxury-black' : 'border-luxury-border text-luxury-textMuted'}`}><Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} /></button>
                  <button className="p-3 border border-luxury-border text-luxury-textMuted"><Share2 className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex justify-between py-4 border-t border-luxury-border">
                <div className="flex gap-8"><div className="flex items-center"><Bed className="w-5 h-5 text-luxury-gold mr-2" /><span className="text-luxury-textMuted">{property.features.bedrooms} Beds</span></div><div className="flex items-center"><Bath className="w-5 h-5 text-luxury-gold mr-2" /><span className="text-luxury-textMuted">{property.features.bathrooms} Baths</span></div><div className="flex items-center"><Maximize className="w-5 h-5 text-luxury-gold mr-2" /><span className="text-luxury-textMuted">{property.features.size} m²</span></div></div>
                {property.features.yearBuilt && <div className="flex items-center text-luxury-textMuted"><Calendar className="w-5 h-5 mr-2" /><span>Built {property.features.yearBuilt}</span></div>}
              </div>
            </div>
            <div className="bg-luxury-surface border border-luxury-border p-6 mb-6"><h2 className="font-display text-xl font-semibold text-white mb-4">Description</h2><p className="text-luxury-textMuted">{property.description}</p></div>
            <div className="bg-luxury-surface border border-luxury-border p-6"><h2 className="font-display text-xl font-semibold text-white mb-4">Features</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><div className="flex items-center"><CheckCircle className="w-5 h-5 text-luxury-gold mr-2" /><span className="text-luxury-textMuted capitalize">{property.propertyType}</span></div>{property.features.parking && property.features.parking > 0 && <div className="flex items-center"><CheckCircle className="w-5 h-5 text-luxury-gold mr-2" /><span className="text-luxury-textMuted">{property.features.parking} Parking</span></div>}{property.features.furnished && <div className="flex items-center"><CheckCircle className="w-5 h-5 text-luxury-gold mr-2" /><span className="text-luxury-textMuted">Furnished</span></div>}</div></div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-luxury-surface border border-luxury-border p-6 sticky top-24">
              <div className="text-center mb-6"><span className="text-luxury-gold font-bold text-3xl">{formatPrice(property.price)}</span>{property.listingType === 'rent' && <span className="text-luxury-textMuted text-sm block">per month</span>}</div>
              <div className="border-t border-luxury-border pt-6 mb-6">
                <h3 className="text-white font-semibold mb-4">Contact Agent</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-luxury-textMuted"><div className="w-10 h-10 bg-luxury-muted rounded-full flex items-center justify-center mr-3"><span className="text-luxury-gold font-semibold">{property.agent.name.split(' ').map(n => n[0]).join('')}</span></div><span className="text-white">{property.agent.name}</span></div>
                  <a href={`tel:${property.agent.phone}`} className="flex items-center text-luxury-textMuted hover:text-luxury-gold"><Phone className="w-5 h-5 mr-3" />{property.agent.phone}</a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center text-luxury-textMuted hover:text-luxury-gold"><Mail className="w-5 h-5 mr-3" />{property.agent.email}</a>
                </div>
              </div>
              <div className="border-t border-luxury-border pt-6">
                <h3 className="text-white font-semibold mb-4">Send Inquiry</h3>
                <form className="space-y-4"><input type="text" placeholder="Your Name" className="input-field" /><input type="email" placeholder="Your Email" className="input-field" /><input type="tel" placeholder="Your Phone" className="input-field" /><textarea placeholder="I'm interested..." rows={4} className="input-field resize-none" /><button type="submit" className="btn-primary w-full">Send Inquiry</button></form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}