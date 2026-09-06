import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-charcoal border-t border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-luxury-gold" />
              <span className="font-display text-2xl font-bold text-white tracking-wide">
                BETAPP
              </span>
            </Link>
            <p className="text-luxury-textMuted text-sm leading-relaxed max-w-md mb-6">
              Your trusted partner for luxury real estate in Ethiopia. We connect the diaspora with premium properties across the country, making property discovery seamless and secure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-luxury-textMuted hover:text-luxury-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-luxury-textMuted hover:text-luxury-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-luxury-textMuted hover:text-luxury-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?type=buy" className="text-luxury-textMuted hover:text-luxury-gold text-sm transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link href="/properties?type=rent" className="text-luxury-textMuted hover:text-luxury-gold text-sm transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link href="/seller" className="text-luxury-textMuted hover:text-luxury-gold text-sm transition-colors">
                  Sell With Us
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-luxury-textMuted hover:text-luxury-gold text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span className="text-luxury-textMuted text-sm">
                  Addis Ababa<br />Ethiopia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <span className="text-luxury-textMuted text-sm">+251 10 000 0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <span className="text-luxury-textMuted text-sm">info@betapp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-luxury-textMuted text-sm">
            © 2024 BETAPP. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-luxury-textMuted hover:text-luxury-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-luxury-textMuted hover:text-luxury-gold text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}