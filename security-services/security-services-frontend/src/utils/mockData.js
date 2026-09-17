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

