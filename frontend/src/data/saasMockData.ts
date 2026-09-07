import { 
  Company, 
  PropertyExtended, 
  Inquiry, 
  Negotiation, 
  Agreement, 
  Document, 
  Notification, 
  Activity,
  Analytics,
  PropertyPerformance,
  TimeSeriesData
} from '@/types/saas';

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'Ethiopian Prime Properties',
    logo: '',
    description: 'Leading real estate agency specializing in luxury properties across Addis Ababa. With over 15 years of experience, we connect the Ethiopian diaspora with premium real estate opportunities.',
    type: 'real_estate_agency',
    yearEstablished: 2008,
    phone: '+251911234567',
    email: 'info@ethiopianprime.com',
    website: 'https://ethiopianprime.com',
    address: {
      street: 'Bole Road, Building 45',
      city: 'Addis Ababa',
      subCity: 'Bole',
      country: 'Ethiopia'
    },
    officeLocation: {
      latitude: 8.9936,
      longitude: 38.7635
    },
    areasServed: ['Addis Ababa', 'Bahir Dar', 'Hawassa', 'Adama', 'Dire Dawa'],
    verificationStatus: 'verified',
    verifiedAt: '2023-06-15T10:00:00Z',
    licenseNumber: 'REA-2008-4567',
    taxId: 'TXN-123456789',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'company-2',
    name: 'Addis Development Corp',
    logo: '',
    description: 'Premier property development company focused on modern residential and commercial projects. We deliver quality construction and innovative design.',
    type: 'developer',
    yearEstablished: 2015,
    phone: '+251922345678',
    email: 'contact@addisdev.com',
    website: 'https://addisdev.com',
    address: {
      street: 'CMC, Main Street',
      city: 'Addis Ababa',
      subCity: 'CMC',
      country: 'Ethiopia'
    },
    officeLocation: {
      latitude: 8.9800,
      longitude: 38.7800
    },
    areasServed: ['Addis Ababa'],
    verificationStatus: 'verified',
    verifiedAt: '2023-08-20T10:00:00Z',
    licenseNumber: 'DEV-2015-8901',
    taxId: 'TXN-987654321',
    createdAt: '2023-02-01T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    id: 'company-3',
    name: 'Diaspora Homes Ethiopia',
    logo: '',
    description: 'Specialized in serving the Ethiopian diaspora community. We understand your unique needs and provide comprehensive property management services.',
    type: 'property_management',
    yearEstablished: 2018,
    phone: '+251933456789',
    email: 'info@diasporahomes.com',
    website: 'https://diasporahomes.com',
    address: {
      street: 'Kazanchis, Embassy Area',
      city: 'Addis Ababa',
      subCity: 'Kazanchis',
      country: 'Ethiopia'
    },
    officeLocation: {
      latitude: 9.0000,
      longitude: 38.7500
    },
    areasServed: ['Addis Ababa', 'Bahir Dar', 'Gondar', 'Jimma'],
    verificationStatus: 'pending_review',
    createdAt: '2023-05-10T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  }
];

// Mock Extended Properties
export const mockExtendedProperties: PropertyExtended[] = [
  {
    id: 'prop-1',
    title: 'Luxury Penthouse in Bole',
    description: 'Stunning penthouse with panoramic views of Bole area. This modern apartment features high-end finishes, imported materials, and premium amenities.',
    listingType: 'buy',
    propertyType: 'apartment',
    status: 'published',
    verificationStatus: 'verified',
    propertyId: 'PROP-2024-001',
    
    price: 45000000,
    currency: 'ETB',
    pricePerSqm: 160714,
    negotiable: true,
    paymentTerms: '30% down payment, balance over 12 months',
    
    location: {
      country: 'Ethiopia',
      city: 'Addis Ababa',
      subCity: 'Bole',
      neighborhood: 'Airport Road',
      address: 'Bole International Airport Road',
      latitude: 8.9936,
      longitude: 38.7635
    },
    nearbyInfo: {
      mainRoad: 'Bole Road',
      transportation: '5 min to Bole Airport',
      school: 'International School nearby',
      hospital: 'Korean Hospital',
      shopping: 'Edna Mall',
      bank: 'Commercial Bank'
    },
    
    specifications: {
      buildingArea: 280,
      bedrooms: 4,
      bathrooms: 3,
      livingRooms: 2,
      kitchen: 1,
      floors: 1,
      parking: 2,
      balcony: 2,
      garden: false,
      storage: true,
      furnishing: 'semi_furnished'
    },
    
    construction: {
      constructionDate: '2022-01-15',
      completionDate: '2023-06-30',
      status: 'completed',
      developer: 'Addis Development Corp',
      constructionCompany: 'Ethiopian Construction Works'
    },
    
    amenities: ['parking', 'elevator', 'security', 'cctv', 'backup_water', 'generator', 'internet', 'balcony', 'ac', 'gated_compound'],
    
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
    ],
    primaryImageIndex: 0,
    
    documents: [],
    
    performance: {
      views: 1248,
      favorites: 163,
      inquiries: 84,
      negotiations: 21,
      daysListed: 45
    },
    
    companyId: 'company-1',
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'prop-2',
    title: 'Modern Villa in CMC',
    description: 'Elegant 5-bedroom villa in the prestigious CMC area. Features a spacious garden, modern kitchen, home office, and secure parking.',
    listingType: 'buy',
    propertyType: 'villa',
    status: 'published',
    verificationStatus: 'verified',
    propertyId: 'PROP-2024-002',
    
    price: 85000000,
    currency: 'ETB',
    pricePerSqm: 188889,
    negotiable: false,
    
    location: {
      country: 'Ethiopia',
      city: 'Addis Ababa',
      subCity: 'CMC',
      neighborhood: 'Cameroon Street',
      address: 'Cameroon Street',
      latitude: 8.9800,
      longitude: 38.7800
    },
    
    specifications: {
      landArea: 600,
      buildingArea: 450,
      bedrooms: 5,
      bathrooms: 4,
      livingRooms: 3,
      kitchen: 2,
      floors: 2,
      parking: 3,
      balcony: 3,
      garden: true,
      storage: true,
      furnishing: 'fully_furnished'
    },
    
    construction: {
      constructionDate: '2021-03-01',
      completionDate: '2022-12-15',
      status: 'completed',
      developer: 'Addis Development Corp'
    },
    
    amenities: ['parking', 'security', 'cctv', 'backup_water', 'generator', 'internet', 'garden', 'balcony', 'gated_compound', 'laundry_area'],
    
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    primaryImageIndex: 0,
    
    documents: [],
    
    performance: {
      views: 892,
      favorites: 97,
      inquiries: 45,
      negotiations: 12,
      daysListed: 30
    },
    
    companyId: 'company-1',
    featured: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    publishedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'prop-3',
    title: 'Executive Apartment in Kazanchis',
    description: 'Fully furnished 3-bedroom apartment perfect for executives. Walking distance to embassies and business centers.',
    listingType: 'rent',
    propertyType: 'apartment',
    status: 'reserved',
    verificationStatus: 'verified',
    propertyId: 'PROP-2024-003',
    
    price: 180000,
    currency: 'ETB',
    pricePerSqm: 1000,
    negotiable: true,
    
    location: {
      country: 'Ethiopia',
      city: 'Addis Ababa',
      subCity: 'Kazanchis',
      neighborhood: 'Kirkos',
      address: 'Kirkos Sub-City',
      latitude: 9.0000,
      longitude: 38.7500
    },
    
    specifications: {
      buildingArea: 180,
      bedrooms: 3,
      bathrooms: 2,
      livingRooms: 1,
      kitchen: 1,
      floors: 1,
      parking: 1,
      balcony: 1,
      garden: false,
      storage: false,
      furnishing: 'fully_furnished'
    },
    
    construction: {
      constructionDate: '2020-05-01',
      completionDate: '2021-08-30',
      status: 'completed'
    },
    
    amenities: ['parking', 'elevator', 'pool', 'gym', 'security', 'cctv', 'backup_water', 'generator', 'internet', 'balcony'],
    
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    primaryImageIndex: 0,
    
    documents: [],
    
    performance: {
      views: 654,
      favorites: 78,
      inquiries: 32,
      negotiations: 8,
      daysListed: 20
    },
    
    companyId: 'company-1',
    featured: true,
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    publishedAt: '2024-01-08T10:00:00Z'
  },
  {
    id: 'prop-4',
    title: 'Commercial Space in Africa Avenue',
    description: 'Prime commercial space on Africa Avenue. High foot traffic area perfect for offices, clinics, or retail.',
    listingType: 'buy',
    propertyType: 'commercial',
    status: 'published',
    verificationStatus: 'verified',
    propertyId: 'PROP-2024-004',
    
    price: 120000000,
    currency: 'ETB',
    pricePerSqm: 240000,
    negotiable: true,
    
    location: {
      country: 'Ethiopia',
      city: 'Addis Ababa',
      subCity: 'Bole',
      neighborhood: 'Africa Avenue',
      address: 'Africa Avenue',
      latitude: 8.9936,
      longitude: 38.7635
    },
    
    specifications: {
      buildingArea: 500,
      bedrooms: 0,
      bathrooms: 4,
      livingRooms: 0,
      kitchen: 1,
      floors: 1,
      parking: 10,
      balcony: 0,
      garden: false,
      storage: true,
      furnishing: 'unfurnished'
    },
    
    construction: {
      constructionDate: '2018-01-01',
      completionDate: '2019-06-30',
      status: 'completed'
    },
    
    amenities: ['parking', 'elevator', 'security', 'cctv', 'backup_water', 'generator', 'internet'],
    
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    primaryImageIndex: 0,
    
    documents: [],
    
    performance: {
      views: 423,
      favorites: 45,
      inquiries: 18,
      negotiations: 5,
      daysListed: 15
    },
    
    companyId: 'company-2',
    featured: true,
    createdAt: '2023-12-28T10:00:00Z',
    updatedAt: '2023-12-28T10:00:00Z',
    publishedAt: '2023-12-28T10:00:00Z'
  },
  {
    id: 'prop-5',
    title: 'Under Construction Condo in Megenagna',
    description: 'Contemporary condo currently under construction. Modern finishes, smart home features, and excellent security.',
    listingType: 'buy',
    propertyType: 'condo',
    status: 'under_construction',
    verificationStatus: 'pending_review',
    propertyId: 'PROP-2024-005',
    
    price: 28000000,
    currency: 'ETB',
    pricePerSqm: 186667,
    negotiable: true,
    paymentTerms: '20% down, balance on completion',
    
    location: {
      country: 'Ethiopia',
      city: 'Addis Ababa',
      subCity: 'Megenagna',
      neighborhood: 'Roundabout',
      address: 'Megenagna Roundabout',
      latitude: 8.9700,
      longitude: 38.7900
    },
    
    specifications: {
      buildingArea: 150,
      bedrooms: 2,
      bathrooms: 2,
      livingRooms: 1,
      kitchen: 1,
      floors: 1,
      parking: 1,
      balcony: 1,
      garden: false,
      storage: false,
      furnishing: 'unfurnished'
    },
    
    construction: {
      constructionDate: '2023-06-01',
      completionDate: '2024-12-31',
      status: 'under_construction',
      developer: 'Addis Development Corp',
      constructionCompany: 'Ethiopian Construction Works'
    },
    
    amenities: ['parking', 'elevator', 'security', 'cctv', 'backup_water', 'generator', 'internet', 'balcony', 'gated_compound'],
    
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    primaryImageIndex: 0,
    
    documents: [],
    
    performance: {
      views: 234,
      favorites: 28,
      inquiries: 12,
      negotiations: 3,
      daysListed: 10
    },
    
    companyId: 'company-2',
    featured: false,
    createdAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-01-03T10:00:00Z'
  },
  {
    id: 'prop-6',
    title: 'Draft Property - New Listing',
    description: 'This is a draft property listing not yet published.',
    listingType: 'buy',
    propertyType: 'house',
    status: 'draft',
    verificationStatus: 'not_verified',
    propertyId: 'PROP-2024-006',
    
    price: 55000000,
    currency: 'ETB',
    negotiable: true,
    
    location: {
      country: 'Ethiopia',
      city: 'Addis Ababa',
      subCity: 'Ayer Tena',
      address: 'Kolfe Keraniyo',
      latitude: 8.9500,
      longitude: 38.7000
    },
    
    specifications: {
      buildingArea: 320,
      bedrooms: 4,
      bathrooms: 3,
      livingRooms: 2,
      kitchen: 1,
      floors: 2,
      parking: 2,
      balcony: 2,
      garden: true,
      storage: true,
      furnishing: 'semi_furnished'
    },
    
    amenities: ['parking', 'security', 'backup_water', 'garden', 'balcony'],
    
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
    ],
    primaryImageIndex: 0,
    
    documents: [],
    
    performance: {
      views: 0,
      favorites: 0,
      inquiries: 0,
      negotiations: 0,
      daysListed: 0
    },
    
    companyId: 'company-1',
    featured: false,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
];

// Mock Inquiries
export const mockInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury Penthouse in Bole',
    buyer: {
      id: 'buyer-1',
      name: 'Abraham Tesfaye',
      email: 'abraham.tesfaye@email.com',
      phone: '+12025551234'
    },
    message: 'I am interested in this property. Can you provide more details about the amenities and schedule a virtual tour?',
    status: 'in_discussion',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    lastActivity: '2024-01-20T14:30:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'buyer',
        message: 'I am interested in this property. Can you provide more details about the amenities and schedule a virtual tour?',
        timestamp: '2024-01-18T10:00:00Z',
        read: true
      },
      {
        id: 'msg-2',
        sender: 'seller',
        message: 'Thank you for your interest! The property includes elevator access, 24/7 security, backup generator, and parking for 2 vehicles. We can certainly arrange a virtual tour at your convenience.',
        timestamp: '2024-01-18T14:00:00Z',
        read: true
      },
      {
        id: 'msg-3',
        sender: 'buyer',
        message: 'That sounds great. I would like to schedule a virtual tour for this Saturday at 10 AM EST.',
        timestamp: '2024-01-20T14:30:00Z',
        read: false
      }
    ]
  },
  {
    id: 'inq-2',
    propertyId: 'prop-2',
    propertyTitle: 'Modern Villa in CMC',
    buyer: {
      id: 'buyer-2',
      name: 'Sara Mengistu',
      email: 'sara.mengistu@email.com',
      phone: '+14155551234'
    },
    message: 'Is the price negotiable? I am looking for a property in the CMC area and this looks perfect for my family.',
    status: 'new',
    createdAt: '2024-01-21T09:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z',
    lastActivity: '2024-01-21T09:00:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'buyer',
        message: 'Is the price negotiable? I am looking for a property in the CMC area and this looks perfect for my family.',
        timestamp: '2024-01-21T09:00:00Z',
        read: false
      }
    ]
  },
  {
    id: 'inq-3',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury Penthouse in Bole',
    buyer: {
      id: 'buyer-3',
      name: 'Dawit Abebe',
      email: 'dawit.abebe@email.com',
      phone: '+447911123456'
    },
    message: 'What is the maintenance fee for this property?',
    status: 'responded',
    createdAt: '2024-01-15T16:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    lastActivity: '2024-01-16T10:00:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'buyer',
        message: 'What is the maintenance fee for this property?',
        timestamp: '2024-01-15T16:00:00Z',
        read: true
      },
      {
        id: 'msg-2',
        sender: 'seller',
        message: 'The monthly maintenance fee is ETB 5,000, which covers security, common area maintenance, and building insurance.',
        timestamp: '2024-01-16T10:00:00Z',
        read: true
      }
    ]
  }
];

// Mock Negotiations
export const mockNegotiations: Negotiation[] = [
  {
    id: 'neg-1',
    propertyId: 'prop-2',
    propertyTitle: 'Modern Villa in CMC',
    askingPrice: 85000000,
    buyer: {
      id: 'buyer-4',
      name: 'Michael Johnson',
      email: 'michael.johnson@email.com'
    },
    buyerOffer: 78000000,
    sellerCounteroffer: 82000000,
    status: 'counteroffer',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
    lastActivity: '2024-01-15T14:00:00Z',
    history: [
      {
        id: 'hist-1',
        type: 'offer',
        amount: 78000000,
        party: 'buyer',
        timestamp: '2024-01-10T10:00:00Z',
        message: 'Initial offer based on market analysis'
      },
      {
        id: 'hist-2',
        type: 'counteroffer',
        amount: 82000000,
        party: 'seller',
        timestamp: '2024-01-12T10:00:00Z',
        message: 'Counteroffer considering recent renovations'
      },
      {
        id: 'hist-3',
        type: 'offer',
        amount: 80000000,
        party: 'buyer',
        timestamp: '2024-01-15T14:00:00Z',
        message: 'Revised offer'
      }
    ]
  },
  {
    id: 'neg-2',
    propertyId: 'prop-4',
    propertyTitle: 'Commercial Space in Africa Avenue',
    askingPrice: 120000000,
    buyer: {
      id: 'buyer-5',
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com'
    },
    buyerOffer: 110000000,
    status: 'offer_received',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    lastActivity: '2024-01-19T10:00:00Z',
    history: [
      {
        id: 'hist-1',
        type: 'offer',
        amount: 110000000,
        party: 'buyer',
        timestamp: '2024-01-19T10:00:00Z',
        message: 'Initial offer for commercial space'
      }
    ]
  },
  {
    id: 'neg-3',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury Penthouse in Bole',
    askingPrice: 45000000,
    buyer: {
      id: 'buyer-6',
      name: 'Elena Petrova',
      email: 'elena.petrova@email.com'
    },
    buyerOffer: 42000000,
    sellerCounteroffer: 43500000,
    status: 'accepted',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    lastActivity: '2024-01-08T10:00:00Z',
    history: [
      {
        id: 'hist-1',
        type: 'offer',
        amount: 42000000,
        party: 'buyer',
        timestamp: '2024-01-05T10:00:00Z'
      },
      {
        id: 'hist-2',
        type: 'counteroffer',
        amount: 43500000,
        party: 'seller',
        timestamp: '2024-01-06T10:00:00Z'
      },
      {
        id: 'hist-3',
        type: 'accept',
        party: 'buyer',
        timestamp: '2024-01-08T10:00:00Z'
      }
    ]
  }
];

// Mock Agreements
export const mockAgreements: Agreement[] = [
  {
    id: 'agreement-1',
    negotiationId: 'neg-3',
    propertyId: 'prop-1',
    propertyTitle: 'Luxury Penthouse in Bole',
    buyer: {
      id: 'buyer-6',
      name: 'Elena Petrova',
      email: 'elena.petrova@email.com'
    },
    agreedPrice: 43500000,
    terms: '30% down payment (ETB 13,050,000) upon signing, remaining 70% (ETB 30,450,000) within 30 days. Property to be transferred in as-is condition. Seller to provide all necessary documentation.',
    status: 'awaiting_buyer_signature',
    importantDates: {
      agreementCreated: '2024-01-08T10:00:00Z',
      sentToBuyer: '2024-01-08T11:00:00Z',
      sellerSigned: '2024-01-08T10:30:00Z'
    },
    signatureStatus: 'awaiting_buyer',
    sellerSignature: {
      name: 'Tadesse Bekele',
      timestamp: '2024-01-08T10:30:00Z',
      ipAddress: '196.188.0.0'
    },
    documentUrl: 'https://example.com/documents/agreement-1.pdf',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T11:00:00Z'
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Property Title Deed - Prop 1',
    type: 'property',
    relatedId: 'prop-1',
    fileUrl: 'https://example.com/docs/title-deed-prop1.pdf',
    fileSize: 2048000,
    fileType: 'application/pdf',
    uploadDate: '2024-01-15T10:00:00Z',
    uploadedBy: 'user-1',
    status: 'verified',
    visibility: 'private',
    category: 'legal',
    description: 'Official title deed for the property'
  },
  {
    id: 'doc-2',
    name: 'Building Certificate - Prop 2',
    type: 'property',
    relatedId: 'prop-2',
    fileUrl: 'https://example.com/docs/building-cert-prop2.pdf',
    fileSize: 1536000,
    fileType: 'application/pdf',
    uploadDate: '2024-01-10T10:00:00Z',
    uploadedBy: 'user-1',
    status: 'verified',
    visibility: 'private',
    category: 'legal'
  },
  {
    id: 'doc-3',
    name: 'Agreement - Elena Petrova',
    type: 'agreement',
    relatedId: 'agreement-1',
    fileUrl: 'https://example.com/docs/agreement-elena.pdf',
    fileSize: 512000,
    fileType: 'application/pdf',
    uploadDate: '2024-01-08T11:00:00Z',
    uploadedBy: 'system',
    status: 'uploaded',
    visibility: 'private',
    category: 'legal'
  },
  {
    id: 'doc-4',
    name: 'Company Registration - Ethiopian Prime',
    type: 'company',
    relatedId: 'company-1',
    relatedType: 'company',
    fileUrl: 'https://example.com/docs/company-registration.pdf',
    fileSize: 1024000,
    fileType: 'application/pdf',
    uploadDate: '2023-06-15T10:00:00Z',
    uploadedBy: 'user-1',
    status: 'verified',
    visibility: 'private',
    category: 'legal'
  },
  {
    id: 'doc-5',
    name: 'Floor Plan - Prop 1',
    type: 'property',
    relatedId: 'prop-1',
    fileUrl: 'https://example.com/docs/floorplan-prop1.pdf',
    fileSize: 768000,
    fileType: 'application/pdf',
    uploadDate: '2024-01-15T10:00:00Z',
    uploadedBy: 'user-1',
    status: 'uploaded',
    visibility: 'public',
    category: 'technical'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'new_inquiry',
    title: 'New Inquiry Received',
    message: 'Sara Mengistu has inquired about Modern Villa in CMC',
    relatedId: 'inq-2',
    relatedType: 'inquiry',
    read: false,
    createdAt: '2024-01-21T09:00:00Z',
    actionUrl: '/inquiries/inq-2'
  },
  {
    id: 'notif-2',
    type: 'buyer_response',
    title: 'Buyer Response',
    message: 'Abraham Tesfaye responded to your message about Luxury Penthouse',
    relatedId: 'inq-1',
    relatedType: 'inquiry',
    read: false,
    createdAt: '2024-01-20T14:30:00Z',
    actionUrl: '/inquiries/inq-1'
  },
  {
    id: 'notif-3',
    type: 'new_offer',
    title: 'New Offer Received',
    message: 'Sarah Williams made an offer of ETB 110,000,000 for Commercial Space',
    relatedId: 'neg-2',
    relatedType: 'negotiation',
    read: true,
    createdAt: '2024-01-19T10:00:00Z',
    actionUrl: '/negotiations/neg-2'
  },
  {
    id: 'notif-4',
    type: 'agreement_update',
    title: 'Agreement Update',
    message: 'Agreement with Elena Petrova is awaiting buyer signature',
    relatedId: 'agreement-1',
    relatedType: 'agreement',
    read: true,
    createdAt: '2024-01-08T11:00:00Z',
    actionUrl: '/agreements/agreement-1'
  },
  {
    id: 'notif-5',
    type: 'verification_update',
    title: 'Verification Update',
    message: 'Your company verification has been approved',
    relatedId: 'company-1',
    relatedType: 'company',
    read: true,
    createdAt: '2024-01-06T10:00:00Z',
    actionUrl: '/company/verification'
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'new_inquiry',
    title: 'New Inquiry',
    description: 'Sara Mengistu inquired about Modern Villa in CMC',
    relatedId: 'inq-2',
    relatedType: 'inquiry',
    timestamp: '2024-01-21T09:00:00Z',
    actionUrl: '/inquiries/inq-2'
  },
  {
    id: 'act-2',
    type: 'buyer_response',
    title: 'Buyer Response',
    description: 'Abraham Tesfaye responded to inquiry about Luxury Penthouse',
    relatedId: 'inq-1',
    relatedType: 'inquiry',
    timestamp: '2024-01-20T14:30:00Z',
    actionUrl: '/inquiries/inq-1'
  },
  {
    id: 'act-3',
    type: 'new_negotiation',
    title: 'New Negotiation',
    description: 'Sarah Williams made an offer for Commercial Space',
    relatedId: 'neg-2',
    relatedType: 'negotiation',
    timestamp: '2024-01-19T10:00:00Z',
    actionUrl: '/negotiations/neg-2'
  },
  {
    id: 'act-4',
    type: 'property_published',
    title: 'Property Published',
    description: 'Under Construction Condo in Megenagna was published',
    relatedId: 'prop-5',
    relatedType: 'property',
    timestamp: '2024-01-18T10:00:00Z',
    actionUrl: '/listings/prop-5'
  },
  {
    id: 'act-5',
    type: 'property_reserved',
    title: 'Property Reserved',
    description: 'Executive Apartment in Kazanchis is now reserved',
    relatedId: 'prop-3',
    relatedType: 'property',
    timestamp: '2024-01-15T10:00:00Z',
    actionUrl: '/listings/prop-3'
  },
  {
    id: 'act-6',
    type: 'agreement_update',
    title: 'Agreement Created',
    description: 'Agreement with Elena Petrova has been created and sent for signature',
    relatedId: 'agreement-1',
    relatedType: 'agreement',
    timestamp: '2024-01-08T11:00:00Z',
    actionUrl: '/agreements/agreement-1'
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalViews: 3451,
  totalFavorites: 411,
  totalInquiries: 191,
  totalNegotiations: 49,
  conversionRate: 12.8,
  propertyPerformance: [
    {
      propertyId: 'prop-1',
      propertyTitle: 'Luxury Penthouse in Bole',
      views: 1248,
      favorites: 163,
      inquiries: 84,
      negotiations: 21,
      daysListed: 45,
      currentStatus: 'published'
    },
    {
      propertyId: 'prop-2',
      propertyTitle: 'Modern Villa in CMC',
      views: 892,
      favorites: 97,
      inquiries: 45,
      negotiations: 12,
      daysListed: 30,
      currentStatus: 'published'
    },
    {
      propertyId: 'prop-3',
      propertyTitle: 'Executive Apartment in Kazanchis',
      views: 654,
      favorites: 78,
      inquiries: 32,
      negotiations: 8,
      daysListed: 20,
      currentStatus: 'reserved'
    },
    {
      propertyId: 'prop-4',
      propertyTitle: 'Commercial Space in Africa Avenue',
      views: 423,
      favorites: 45,
      inquiries: 18,
      negotiations: 5,
      daysListed: 15,
      currentStatus: 'published'
    },
    {
      propertyId: 'prop-5',
      propertyTitle: 'Under Construction Condo in Megenagna',
      views: 234,
      favorites: 28,
      inquiries: 12,
      negotiations: 3,
      daysListed: 10,
      currentStatus: 'under_construction'
    }
  ],
  timeSeriesData: [
    { date: '2024-01-01', views: 45, inquiries: 2, negotiations: 0 },
    { date: '2024-01-02', views: 67, inquiries: 3, negotiations: 1 },
    { date: '2024-01-03', views: 89, inquiries: 5, negotiations: 1 },
    { date: '2024-01-04', views: 123, inquiries: 7, negotiations: 2 },
    { date: '2024-01-05', views: 156, inquiries: 9, negotiations: 3 },
    { date: '2024-01-06', views: 178, inquiries: 11, negotiations: 4 },
    { date: '2024-01-07', views: 201, inquiries: 13, negotiations: 4 },
    { date: '2024-01-08', views: 234, inquiries: 15, negotiations: 5 },
    { date: '2024-01-09', views: 267, inquiries: 17, negotiations: 6 },
    { date: '2024-01-10', views: 312, inquiries: 19, negotiations: 7 },
    { date: '2024-01-11', views: 345, inquiries: 21, negotiations: 8 },
    { date: '2024-01-12', views: 378, inquiries: 23, negotiations: 8 },
    { date: '2024-01-13', views: 401, inquiries: 25, negotiations: 9 },
    { date: '2024-01-14', views: 434, inquiries: 27, negotiations: 10 },
    { date: '2024-01-15', views: 467, inquiries: 29, negotiations: 11 },
    { date: '2024-01-16', views: 512, inquiries: 31, negotiations: 12 },
    { date: '2024-01-17', views: 545, inquiries: 33, negotiations: 13 },
    { date: '2024-01-18', views: 578, inquiries: 35, negotiations: 14 },
    { date: '2024-01-19', views: 612, inquiries: 37, negotiations: 15 },
    { date: '2024-01-20', views: 645, inquiries: 39, negotiations: 16 },
    { date: '2024-01-21', views: 678, inquiries: 41, negotiations: 17 }
  ]
};

// Current user company (for demo purposes)
export const currentUserCompany = mockCompanies[0];
