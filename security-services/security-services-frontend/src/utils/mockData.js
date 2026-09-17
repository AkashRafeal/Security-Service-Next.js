export const MOCK_SERVICES = [
  {
    id: 1,
    name: 'Corporate Armed Security & Access Control',
    slug: 'corporate-armed-security',
    shortDescription: 'Uniformed and tactical armed guards protecting high-value commercial assets, turnstiles, and executive suites with continuous perimeter monitoring.',
    description: 'Comprehensive armed physical security program providing 24/7 stationary gatehouse management, visitor identification verification, biometric access control, and proactive anti-trespassing patrols tailored for corporate campuses.',
    categoryName: 'Guarding Corps',
    serviceType: 'ARMED_GUARD',
    imageUrl: '/images/hero_security_officer.jpg',
    featuresJson: JSON.stringify([
      '120-Hour State Tactical Academy Certified',
      'Continuous Biometric & Turnstile Screening',
      'Electronic Incident Logging & GPS Wanding',
      'Emergency First Aid, CPR & AED Certified'
    ])
  },
  {
    id: 2,
    name: 'VIP Executive Detail & Close Protection',
    slug: 'executive-protection',
    shortDescription: 'Low-profile tactical bodyguards, evasive motorcade drivers, and route scouts protecting C-suite leaders and visiting dignitaries.',
    description: 'Specialized executive close protection detail delivering discreet personal security, threat mitigation, advance venue scouting, and armored transport coordination for high-profile principals.',
    categoryName: 'Executive Detail',
    serviceType: 'CLOSE_PROTECTION',
    imageUrl: '/images/hero_executive_protection.jpg',
    featuresJson: JSON.stringify([
      'Former Military & Law Enforcement Operatives',
      'Advance Route Reconnaissance & Counter-Surveillance',
      'Armored Convoy & Evasive Driving Capabilities',
      '24/7 Global Satellite Telemetry & Extraction Ready'
    ])
  },
  {
    id: 3,
    name: '24/7 AI Cloud CCTV Surveillance & Dispatch',
    slug: 'cctv-surveillance-dispatch',
    shortDescription: 'Round-the-clock video management center with automated AI intrusion tripwires and immediate armed officer field dispatch.',
    description: 'Cutting-edge remote video monitoring combining intelligent AI edge analytics, facial recognition, thermal perimeter detection, and two-way audio talk-down capabilities to deter intruders instantaneously.',
    categoryName: 'Command & Control',
    serviceType: 'REMOTE_MONITORING',
    imageUrl: '/images/hero_command_center.jpg',
    featuresJson: JSON.stringify([
      'Ultra-HD Night Vision & Thermal Analytics',
      'Instantaneous Audio Talk-Down Warning Systems',
      'Sub-60-Second Field Interceptor Dispatch SLA',
      'Full Video Archive Cloud Storage & Chain of Custody'
    ])
  },
  {
    id: 4,
    name: 'Tactical Armed Patrol & Perimeter Interceptors',
    slug: 'tactical-armed-patrol',
    shortDescription: 'High-visibility rapid-response patrol fleet conducting randomized perimeter sweeps with real-time GPS telemetry.',
    description: 'Mobile interdiction units serving multi-acre industrial complexes, shopping districts, and gated communities. Officers execute random timed checkpoint wanding to eliminate security blind spots.',
    categoryName: 'Patrol Division',
    serviceType: 'MOBILE_PATROL',
    imageUrl: '/images/hero_tactical_patrol.jpg',
    featuresJson: JSON.stringify([
      'All-Terrain Tactical Interceptor Vehicles',
      'Real-Time Live GPS Geofence Verification',
      'Randomized Deterrence Sweeps Every 45 Minutes',
      'Immediate Backup Unit Notification System'
    ])
  },
  {
    id: 5,
    name: 'Industrial & Infrastructure Asset Protection',
    slug: 'industrial-asset-protection',
    shortDescription: 'Hardened security protocols safeguarding critical logistics hubs, manufacturing plants, utility grids, and cargo yards.',
    description: 'Specialized perimeter defense combining gate manifest verification, seal inspection, contraband screening, and perimeter intrusion detection for heavy industrial and distribution assets.',
    categoryName: 'Critical Infrastructure',
    serviceType: 'INDUSTRIAL_SECURITY',
    imageUrl: '/images/service_campus_school.jpg',
    featuresJson: JSON.stringify([
      'Bill of Lading & Cargo Seal Verification',
      'Hazmat & OSHA Compliant Safety Protocols',
      'Heavy Vehicle Weigh-Scale Security Screening',
      '24/7 Anti-Cargo-Theft Drone Perimeter Sweeps'
    ])
  }
];

export const MOCK_FAQS = [
  {
    id: 1,
    question: 'What credentials and licenses do your security personnel hold?',
    answer: 'All security personnel are state-licensed armed or unarmed officers vetted through comprehensive 10-year background investigations, multi-panel drug screenings, and state criminal database verification. Every officer completes our mandatory 120-hour tactical academy covering active defense, de-escalation, CPR/AED emergency care, and facility-specific post orders.'
  },
  {
    id: 2,
    question: 'How quickly can security officers be deployed to our facility?',
    answer: 'For standard contracted deployments, officers are positioned on-site within 24 to 48 hours following our perimeter security assessment and client post order formulation. For emergency crisis relief or urgent threat surges, our reserve standby units dispatch within 45 minutes.'
  },
  {
    id: 3,
    question: 'How do you guarantee that security guards are actively patrolling?',
    answer: 'We utilize real-time GPS-verified electronic checkpoint wanding. Field officers scan NFC and QR checkpoints throughout their rounds, transmitting live timestamps and digital incident logs directly to our 24/7 Command Center. Supervisors conduct continuous surprise field audits around the clock.'
  },
  {
    id: 4,
    question: 'Can you tailor post orders for our specific building requirements?',
    answer: 'Yes. Before deploying any personnel, our field operations commanders draft customized Standard Operating Procedures (SOPs) detailing your visitor logging protocols, tenant escort rules, loading dock policies, emergency evacuation plans, and key management systems.'
  },
  {
    id: 5,
    question: 'What are your contract terms and cancellation policies?',
    answer: 'We provide clear, transparent contracts ranging from temporary single-shift event coverage to multi-year corporate facility management. All long-term service agreements feature standard 30-day notice provisions with zero hidden exit penalties.'
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 1,
    customerName: 'Marcus Vance',
    designation: 'Director of Corporate Operations',
    company: 'Apex Commercial Real Estate',
    rating: 5,
    review: 'ABC Security secured our 40-story commercial tower through major tenant transitions with zero security breaches. Their officers present military-grade discipline combined with exceptional front-desk hospitality.',
    avatarUrl: '/images/avatar_corporate_director.jpg'
  },
  {
    id: 2,
    customerName: 'Sarah Jenkins',
    designation: 'VP of Global Risk & Compliance',
    company: 'Horizon Technologies',
    rating: 5,
    review: 'The executive protection detail provided for our board meetings was executed with elite precision. Discreet, highly alert, and always three steps ahead in route coordination.',
    avatarUrl: '/images/avatar_executive_protection.jpg'
  },
  {
    id: 3,
    customerName: 'David Morales',
    designation: 'Facilities & Logistics Lead',
    company: 'Metro Distribution Networks',
    rating: 5,
    review: 'Deploying ABC Security mobile interceptors and AI cloud monitoring eradicated trespass and cargo tampering across our 25-acre logistics yard within the first 30 days. Invaluable partnership.',
    avatarUrl: '/images/avatar_logistics_manager.jpg'
  }
];

export const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Perimeter Hardening & Access Control Overhaul',
    slug: 'perimeter-hardening-financial-center',
    clientName: 'Manhattan Financial Center',
    clientType: 'Commercial Banking',
    location: 'Wall Street, New York, NY',
    featuredImageUrl: '/images/service_banking_finance.jpg',
    securityRequirement: 'High-risk commercial tower requiring 24/7 armed turnstile enforcement, visitor biometric verification, and sub-second panic dispatch integration.',
    results: '100% compliance on visitor vetting, zero unauthorized floor penetrations across 18 months, and 60% reduction in security false alarms.'
  },
  {
    id: 2,
    title: 'AI Smart Video Surveillance & Rapid Mobile Patrol',
    slug: 'ai-surveillance-logistics-hub',
    clientName: 'Apex Distribution Logistics Park',
    clientType: 'Supply Chain & Freight',
    location: 'Elizabeth, NJ Intermodal Terminal',
    featuredImageUrl: '/images/service_warehouse_logistics.jpg',
    securityRequirement: 'Sprawling 35-acre cargo distribution yard with multiple blind spots, perimeter fence breaches, and overnight cargo theft attempts.',
    results: 'Zero cargo loss incidents since deployment, 99.4% prompt GPS checkpoint wanding adherence, and full automated drone perimeter verification.'
  },
  {
    id: 3,
    title: 'Executive Protection & Secure Motorcade Detail',
    slug: 'executive-motorcade-global-summit',
    clientName: 'Global Technology Leadership Council',
    clientType: 'Executive Protection',
    location: 'Washington D.C. & New York City',
    featuredImageUrl: '/images/hero_executive_protection.jpg',
    securityRequirement: 'Discreet, armed close protection and advance route reconnaissance for 14 multinational CEOs attending bilateral economic summits.',
    results: 'Impeccable zero-incident execution, flawless motorcade logistics across high-traffic urban corridors, and round-the-clock medical response readiness.'
  }
];

export const MOCK_CLIENTS = [
  { id: 1, name: 'Apex Commercial Real Estate', logoUrl: '/images/hero_command_center.jpg', industry: 'Commercial Real Estate' },
  { id: 2, name: 'Horizon Technologies', logoUrl: '/images/hero_executive_protection.jpg', industry: 'Defense & Technology' },
  { id: 3, name: 'Metro Distribution Networks', logoUrl: '/images/service_warehouse_logistics.jpg', industry: 'Logistics & Supply Chain' },
  { id: 4, name: 'Sterling Financial Group', logoUrl: '/images/service_banking_finance.jpg', industry: 'Banking & Asset Management' }
];

export const DEMO_USERS = {
  admin: {
    id: 1,
    username: 'admin',
    email: 'admin@abcsecurity.com',
    fullName: 'Chief Operations Commander (Demo Admin)',
    roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STAFF'],
    token: 'demo-jwt-token-admin-session'
  },
  user: {
    id: 2,
    username: 'user',
    email: 'client@horizon.com',
    fullName: 'Sarah Jenkins (Demo Client)',
    roles: ['ROLE_USER', 'ROLE_CLIENT'],
    token: 'demo-jwt-token-user-session'
  }
};

export const MOCK_ADMIN_STATS = {
  totalEnquiries: 48,
  pendingEnquiries: 7,
  totalQuotes: 32,
  pendingQuotes: 5,
  totalApplications: 64,
  pendingApplications: 12,
  activeServices: 13,
  totalTestimonials: 18,
  totalClients: 24,
  totalJobs: 6,
  totalFaqs: 15,
  enquiriesByMonth: [
    { month: 'Apr', count: 18 },
    { month: 'May', count: 24 },
    { month: 'Jun', count: 29 },
    { month: 'Jul', count: 35 },
    { month: 'Aug', count: 42 },
    { month: 'Sep', count: 48 }
  ],
  quotesByMonth: [
    { month: 'Apr', count: 12 },
    { month: 'May', count: 15 },
    { month: 'Jun', count: 20 },
    { month: 'Jul', count: 26 },
    { month: 'Aug', count: 28 },
    { month: 'Sep', count: 32 }
  ],
  quoteStatusDistribution: {
    'PENDING': 5,
    'UNDER_REVIEW': 8,
    'PROPOSAL_SENT': 11,
    'ACCEPTED': 6,
    'REJECTED': 2
  },
  serviceDemand: [
    { name: 'Armed Security Corps', requests: 14 },
    { name: 'Executive VIP Detail', requests: 9 },
    { name: 'AI CCTV Remote Dispatch', requests: 8 },
    { name: 'Mobile Tactical Patrols', requests: 6 }
  ]
};

export const MOCK_ADMIN_QUOTES = [
  {
    id: 1,
    quoteNumber: 'QT-2026-0891',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@apexcre.com',
    phone: '+1 (212) 555-0192',
    company: 'Apex Commercial Real Estate',
    serviceName: 'Corporate Armed Security & Access Control',
    guardCount: 6,
    coverageType: '24/7 Continuous Shift',
    status: 'UNDER_REVIEW',
    createdAt: '2026-09-15T10:30:00Z',
    estimatedBudget: '$24,000 / mo',
    location: 'Manhattan, New York'
  },
  {
    id: 2,
    quoteNumber: 'QT-2026-0892',
    fullName: 'Elena Rostova',
    email: 'elena@novatechcorp.io',
    phone: '+1 (415) 555-0843',
    company: 'NovaTech Campus',
    serviceName: '24/7 AI Cloud CCTV Surveillance & Dispatch',
    guardCount: 2,
    coverageType: 'Overnight & Weekend Shift',
    status: 'PROPOSAL_SENT',
    createdAt: '2026-09-14T14:15:00Z',
    estimatedBudget: '$12,500 / mo',
    location: 'Jersey City, NJ'
  },
  {
    id: 3,
    quoteNumber: 'QT-2026-0893',
    fullName: 'Jonathan Price',
    email: 'j.price@triadenergy.com',
    phone: '+1 (713) 555-9011',
    company: 'Triad Industrial Logistics',
    serviceName: 'Tactical Armed Patrol & Perimeter Interceptors',
    guardCount: 4,
    coverageType: '24/7 Mobile Interceptor Fleet',
    status: 'PENDING',
    createdAt: '2026-09-16T09:00:00Z',
    estimatedBudget: '$18,000 / mo',
    location: 'Houston, TX'
  }
];

export const MOCK_ADMIN_ENQUIRIES = [
  {
    id: 1,
    name: 'David Sterling',
    email: 'd.sterling@globalholdings.com',
    phone: '+1 (312) 555-7788',
    subject: 'VIP Motorcade detail for annual board summit',
    message: 'We require 3 armored escort vehicles and 6 close protection operatives for a 4-day summit in downtown Chicago.',
    status: 'NEW',
    createdAt: '2026-09-16T11:20:00Z'
  },
  {
    id: 2,
    name: 'Rebecca Torres',
    email: 'rtorres@metrowarehouse.net',
    phone: '+1 (201) 555-4321',
    subject: 'Distribution center gate check audit inquiry',
    message: 'Looking to audit and upgrade our existing 24-hour gate security and driver badging protocols.',
    status: 'IN_PROGRESS',
    createdAt: '2026-09-15T16:45:00Z'
  }
];

export const MOCK_ADMIN_APPLICATIONS = [
  {
    id: 1,
    jobTitle: 'Tactical Armed Protection Officer',
    candidateName: 'Derek Miller',
    email: 'derek.miller.mil@gmail.com',
    phone: '+1 (555) 342-9901',
    experienceYears: 6,
    status: 'UNDER_REVIEW',
    appliedAt: '2026-09-16T08:30:00Z'
  },
  {
    id: 2,
    jobTitle: 'Central Command Center Dispatcher',
    candidateName: 'Rachel Adams',
    email: 'rachel.adams92@outlook.com',
    phone: '+1 (555) 789-2114',
    experienceYears: 4,
    status: 'SHORTLISTED',
    appliedAt: '2026-09-14T13:10:00Z'
  }
];

export const MOCK_ADMIN_NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Enterprise Quote Request',
    message: 'Marcus Vance from Apex Commercial requested a 6-guard 24/7 security detail.',
    type: 'QUOTE',
    read: false,
    createdAt: '2026-09-16T11:00:00Z'
  },
  {
    id: 2,
    title: 'Candidate Application Submitted',
    message: 'Derek Miller applied for Tactical Armed Protection Officer.',
    type: 'APPLICATION',
    read: false,
    createdAt: '2026-09-16T08:30:00Z'
  }
];

export const MOCK_AUDIT_LOGS = [
  {
    id: 1,
    action: 'USER_LOGIN',
    username: 'admin',
    target: 'Auth',
    targetId: 1,
    details: 'Administrator session authenticated via Command Portal',
    ipAddress: '127.0.0.1',
    createdAt: '2026-09-17T08:15:00Z'
  },
  {
    id: 2,
    action: 'DISPATCH_UPDATE',
    username: 'admin',
    target: 'Patrol',
    targetId: 14,
    details: 'Sector 4 patrol rover route checkpoint synced',
    ipAddress: '127.0.0.1',
    createdAt: '2026-09-17T07:45:00Z'
  }
];

export const MOCK_JOBS = [
  {
    id: 1,
    title: 'Tactical Armed Protection Officer',
    slug: 'tactical-armed-protection-officer',
    department: 'Field Operations',
    location: 'New York Metro Area',
    type: 'Full-Time',
    experienceLevel: 'Senior / 3+ Years Tactical',
    salaryRange: '$65,000 - $85,000 / year',
    description: 'Provide high-visibility armed deterrent security, emergency tactical response, and access point protection for high-profile commercial properties.',
    isActive: true
  },
  {
    id: 2,
    title: '24/7 Central Command Center Dispatcher',
    slug: 'central-command-dispatcher',
    department: 'Communications & Telemetry',
    location: 'Command HQ',
    type: 'Full-Time',
    experienceLevel: '2+ Years CCTV / CAD Experience',
    salaryRange: '$52,000 - $68,000 / year',
    description: 'Monitor multi-site AI video alarm triggers, coordinate armed patrol interceptors, and maintain comprehensive incident CAD logs.',
    isActive: true
  },
  {
    id: 3,
    title: 'VIP Close Protection Specialist',
    slug: 'vip-close-protection-specialist',
    department: 'Executive Detail',
    location: 'Tri-State Area / Traveling',
    type: 'Full-Time',
    experienceLevel: 'Prior Military / Law Enforcement Detail',
    salaryRange: '$95,000 - $130,000 / year',
    description: 'Perform advance venue intelligence surveys, motorcade driving, and physical close protection for visiting executives and board leaders.',
    isActive: true
  }
];

export const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@abcsecurity.com',
    fullName: 'Chief Operations Commander (Admin)',
    role: 'ADMIN',
    enabled: true,
    createdAt: '2026-01-10T00:00:00Z'
  },
  {
    id: 2,
    username: 'user',
    email: 'client@horizon.com',
    fullName: 'Sarah Jenkins (Client)',
    role: 'USER',
    enabled: true,
    createdAt: '2026-02-15T00:00:00Z'
  },
  {
    id: 3,
    username: 'dispatch_lead',
    email: 'dispatch@abcsecurity.com',
    fullName: 'Marcus Cole (Dispatch Supervisor)',
    role: 'STAFF',
    enabled: true,
    createdAt: '2026-03-01T00:00:00Z'
  }
];

export const MOCK_SERVICE_CATEGORIES = [
  {
    id: 1,
    name: 'Guarding Corps',
    slug: 'guarding-corps',
    description: 'Armed & unarmed stationary security officers for corporate access control and facilities.',
    icon: 'Shield'
  },
  {
    id: 2,
    name: 'Executive Detail',
    slug: 'executive-detail',
    description: 'Close protection bodyguards, secure motorcade drivers, and advance route scouting for principals.',
    icon: 'ShieldCheck'
  },
  {
    id: 3,
    name: 'Command & Control',
    slug: 'command-and-control',
    description: '24/7 AI-assisted video surveillance center, alarm monitoring, and sub-minute armed dispatch.',
    icon: 'Radio'
  },
  {
    id: 4,
    name: 'Patrol Division',
    slug: 'patrol-division',
    description: 'Marked tactical patrol interceptors performing GPS-geofenced sweeps and randomized deterrence.',
    icon: 'Award'
  },
  {
    id: 5,
    name: 'Critical Infrastructure',
    slug: 'critical-infrastructure',
    description: 'Hardened protocols for data centers, industrial plants, logistics distribution, and utilities.',
    icon: 'Building2'
  }
];

