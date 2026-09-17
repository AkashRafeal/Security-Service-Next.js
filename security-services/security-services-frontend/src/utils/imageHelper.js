/**
 * Universal Image Fallback & Asset Registry
 * Guarantees that no broken image icon or alt-text clipping will ever appear anywhere on the site.
 * All fallbacks prioritize locally hosted, high-resolution static assets.
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/hero_security_officer.jpg';

export const DEFAULT_AVATAR_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230b132b"/><circle cx="50" cy="38" r="18" fill="%23d97706"/><path d="M20 90 A30 30 0 0 1 80 90 Z" fill="%23d97706"/></svg>';

export const SERVICE_FALLBACK_MAP = {
  'school-college-security': '/images/service_campus_school.jpg',
  'mall-retail-security': '/images/industry_retail_mall.jpg',
  'hospital-security': '/images/service_hospital_healthcare.jpg',
  'bank-security': '/images/service_banking_finance.jpg',
  'warehouse-security': '/images/service_warehouse_logistics.jpg',
  'security-guard-services': '/images/hero_security_officer.jpg',
  'corporate-security': '/images/hero_command_center.jpg',
  'vip-close-protection': '/images/hero_executive_protection.jpg',
  'vip-protection': '/images/hero_executive_protection.jpg',
  'cctv-surveillance-monitoring': '/images/hero_command_center.jpg',
  'cctv-monitoring': '/images/hero_command_center.jpg',
  'event-security': '/images/hero_tactical_patrol.jpg',
  'residential-security': '/images/hero_security_officer.jpg',
  'industrial-factory-security': '/images/service_warehouse_logistics.jpg',
  'security-consultancy-audits': '/images/hero_command_center.jpg',
  'security-consultancy': '/images/hero_command_center.jpg',
};

export const INDUSTRY_FALLBACK_MAP = {
  'retail-shopping-malls': '/images/industry_retail_mall.jpg',
  'education-universities': '/images/service_campus_school.jpg',
  'healthcare-hospitals': '/images/service_hospital_healthcare.jpg',
  'banking-financial': '/images/service_banking_finance.jpg',
  'industrial-manufacturing': '/images/service_warehouse_logistics.jpg',
  'residential-communities': '/images/hero_security_officer.jpg',
  'corporate-commercial': '/images/hero_command_center.jpg',
  'events-entertainment': '/images/hero_tactical_patrol.jpg',
  'government-defense': '/images/hero_tactical_patrol.jpg',
  'hospitality-hotels': '/images/hero_security_officer.jpg',
  'construction-sites': '/images/service_warehouse_logistics.jpg',
};

export const getServiceImage = (service) => {
  if (!service) return DEFAULT_FALLBACK_IMAGE;
  // If we have a dedicated local high-res asset for this slug, always use it
  if (service.slug && SERVICE_FALLBACK_MAP[service.slug]) {
    return SERVICE_FALLBACK_MAP[service.slug];
  }
  // Otherwise try service imageUrl or fallback
  return service.imageUrl || DEFAULT_FALLBACK_IMAGE;
};

export const getIndustryImage = (industry) => {
  if (!industry) return '/images/hero_command_center.jpg';
  if (industry.slug && INDUSTRY_FALLBACK_MAP[industry.slug]) {
    return INDUSTRY_FALLBACK_MAP[industry.slug];
  }
  return industry.imageUrl || '/images/hero_command_center.jpg';
};

/**
 * Universal error handler for <img> tags.
 * Replaces broken source with local fallback and prevents infinite retry loops.
 */
export const handleImageError = (event, fallback = DEFAULT_FALLBACK_IMAGE) => {
  if (!event || !event.currentTarget) return;
  event.currentTarget.onerror = null; // prevent infinite loop
  event.currentTarget.src = fallback || DEFAULT_FALLBACK_IMAGE;
};
