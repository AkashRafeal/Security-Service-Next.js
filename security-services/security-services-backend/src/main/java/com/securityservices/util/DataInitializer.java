package com.securityservices.util;

import com.securityservices.entity.*;
import com.securityservices.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final SecurityServiceRepository serviceRepository;
    private final IndustryRepository industryRepository;
    private final ClientRepository clientRepository;
    private final ProjectRepository projectRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TestimonialRepository testimonialRepository;
    private final GalleryImageRepository galleryRepository;
    private final BlogCategoryRepository blogCategoryRepository;
    private final BlogPostRepository blogPostRepository;
    private final FaqRepository faqRepository;
    private final JobPostRepository jobPostRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final QuoteRequestRepository quoteRequestRepository;
    private final ContactEnquiryRepository contactEnquiryRepository;
    private final SiteSettingRepository settingRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.default-username:admin}")
    private String defaultAdminUsername;

    @Value("${app.admin.default-email:admin@securityservices.com}")
    private String defaultAdminEmail;

    @Value("${app.admin.default-password:Admin@123456}")
    private String defaultAdminPassword;

    @Override
    public void run(String... args) {
        log.info("Initializing Security Services Platform default and demo dataset...");

        seedRoles();
        seedUsers();
        seedCategoriesAndServices();
        seedIndustries();
        seedClients();
        seedProjects();
        seedTeam();
        seedTestimonials();
        seedGallery();
        seedBlog();
        seedFaqs();
        seedJobsAndApplications();
        seedQuotesAndEnquiries();
        seedSiteSettings();
        normalizeCurrenciesToInr();

        log.info("Platform database initialized successfully!");
    }

    private void seedRoles() {
        for (RoleType type : RoleType.values()) {
            if (roleRepository.findByName(type).isEmpty()) {
                roleRepository.save(Role.builder()
                        .name(type)
                        .description("System authority: " + type.name())
                        .build());
            }
        }
    }

    private void seedUsers() {
        Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN).orElseThrow();
        Role managerRole = roleRepository.findByName(RoleType.ROLE_MANAGER).orElseThrow();
        Role staffRole = roleRepository.findByName(RoleType.ROLE_STAFF).orElseThrow();

        if (userRepository.findByUsername(defaultAdminUsername).isEmpty()) {
            userRepository.save(User.builder()
                    .username(defaultAdminUsername)
                    .email(defaultAdminEmail)
                    .password(passwordEncoder.encode(defaultAdminPassword))
                    .fullName("Commander Arthur Vance")
                    .phone("+1 (800) 456-7890")
                    .isActive(true)
                    .roles(Set.of(adminRole, managerRole))
                    .build());
            log.info("Default Admin user '{}' created with role ROLE_ADMIN.", defaultAdminUsername);
        }

        if (userRepository.findByUsername("manager").isEmpty()) {
            userRepository.save(User.builder()
                    .username("manager")
                    .email("ops.manager@securityservices.com")
                    .password(passwordEncoder.encode("Manager@123456"))
                    .fullName("Elena Rostova")
                    .phone("+1 (800) 456-7891")
                    .isActive(true)
                    .roles(Set.of(managerRole))
                    .build());
        }

        if (userRepository.findByUsername("staff").isEmpty()) {
            userRepository.save(User.builder()
                    .username("staff")
                    .email("dispatch@securityservices.com")
                    .password(passwordEncoder.encode("Staff@123456"))
                    .fullName("Marcus Bennett")
                    .phone("+1 (800) 456-7892")
                    .isActive(true)
                    .roles(Set.of(staffRole))
                    .build());
        }

        Role userRole = roleRepository.findByName(RoleType.ROLE_USER).orElseGet(() ->
                roleRepository.save(Role.builder()
                        .name(RoleType.ROLE_USER)
                        .description("System authority: ROLE_USER")
                        .build())
        );

        if (userRepository.findByUsername("user").isEmpty()) {
            userRepository.save(User.builder()
                    .username("user")
                    .email("client@sterlingcorp.com")
                    .password(passwordEncoder.encode("User@123456"))
                    .fullName("John Sterling")
                    .phone("+1 (800) 456-7899")
                    .isActive(true)
                    .roles(Set.of(userRole))
                    .build());
            log.info("Default Demo Client user 'user' created with role ROLE_USER.");
        }
    }

    private void seedCategoriesAndServices() {
        if (serviceRepository.count() > 0) return;

        ServiceCategory guarding = categoryRepository.save(ServiceCategory.builder()
                .name("Guarding & Physical Security")
                .slug("guarding-physical-security")
                .description("Vetted, armed and unarmed personnel deployed for critical site protection.")
                .icon("Shield")
                .displayOrder(1)
                .build());

        ServiceCategory surveillance = categoryRepository.save(ServiceCategory.builder()
                .name("Surveillance & Tech Systems")
                .slug("surveillance-tech-systems")
                .description("AI-powered optical surveillance, biometrics, perimeter detection and control room ops.")
                .icon("Cctv")
                .displayOrder(2)
                .build());

        ServiceCategory protection = categoryRepository.save(ServiceCategory.builder()
                .name("Executive Protection & Escort")
                .slug("executive-protection-escort")
                .description("Discreet, high-threat close protection and secure convoy operations.")
                .icon("UserCheck")
                .displayOrder(3)
                .build());

        ServiceCategory advisory = categoryRepository.save(ServiceCategory.builder()
                .name("Risk Advisory & Audits")
                .slug("risk-advisory-audits")
                .description("Vulnerability assessments, compliance certifications, and disaster drills.")
                .icon("FileCheck")
                .displayOrder(4)
                .build());

        // 13 Services
        serviceRepository.save(SecurityService.builder()
                .name("Security Guard Services")
                .slug("security-guard-services")
                .category(guarding)
                .shortDescription("24/7 uniformed, background-verified security guards for access control, patrolling, and incident containment.")
                .description("Our physical security personnel represent the gold standard in asset protection and risk deterrence. Every officer undergoes extensive background scrutiny, law-enforcement supervised drill training, customer engagement etiquette, and tactical emergency triage.")
                .imageUrl("https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80")
                .icon("ShieldCheck")
                .featuresJson("[\"Rigorous 120-hour tactical training\", \"Real-time GPS patrol wanding\", \"De-escalation and crowd psychology certified\", \"Immediate emergency liaison protocol\"]")
                .benefitsJson("[\"Total visible deterrence against unauthorized breach\", \"Documented visitor and vehicle ledger control\", \"Round-the-clock supervisor visits\", \"Rapid emergency escalation response\"]")
                .processJson("[\"Site Security Vulnerability Audit\", \"Guard Post Orders Formulation\", \"Staff Briefing & Deployment\", \"24/7 Patrol Monitoring & Supervisor Audits\"]")
                .faqJson("[{\"q\": \"Are guards licensed and bonded?\", \"a\": \"Yes, all security personnel are 100% licensed under regulatory standards, insured, and verified.\"}, {\"q\": \"Can we request armed personnel?\", \"a\": \"Yes, certified armed officers are available based on risk assessment.\"}]")
                .targetIndustries("Corporate, Residential, Retail, Manufacturing, Logistics")
                .displayOrder(1)
                .isFeatured(true)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Corporate Security")
                .slug("corporate-security")
                .category(guarding)
                .shortDescription("Comprehensive security operations for corporate towers, headquarters, IT parks, and enterprise campuses.")
                .description("Corporate workplaces require an intelligent balance between impenetrable security barriers and seamless, welcoming executive hospitality. We provide front-desk badge scanning, visitor tracking systems, server room isolation, and after-hours sweeps.")
                .imageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80")
                .icon("Building2")
                .featuresJson("[\"Smart visitor access integration\", \"Server room and executive floor locks\", \"Internal theft prevention protocols\", \"After-hours perimeter lockup sweeps\"]")
                .benefitsJson("[\"Zero corporate espionage intrusion\", \"Immaculate front-desk hospitality\", \"Strict intellectual property perimeter shielding\"]")
                .processJson("[\"Campus Access Assessment\", \"Turnstile & Biometric Protocol Setup\", \"Guard Concierge Deployment\", \"Continuous Incident Logging\"]")
                .faqJson("[{\"q\": \"Do corporate guards handle visitor reception?\", \"a\": \"Yes, our officers are cross-trained in concierge etiquette and digital badge printing systems.\"}]")
                .targetIndustries("Corporate Tech, Financial Centers, Consulting Firms")
                .displayOrder(2)
                .isFeatured(true)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Residential Security")
                .slug("residential-security")
                .category(guarding)
                .shortDescription("Dedicated community gating, perimeter patrolling, and resident safety for gated estates and luxury apartments.")
                .description("Securing families, high-end private residences, and sprawling gated communities requires vigilant entry logging, courteous delivery dispatch, and continuous perimeter surveillance.")
                .imageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80")
                .icon("Home")
                .featuresJson("[\"Boom-barrier & vehicle tag validation\", \"Pedestrian & domestic staff biometric log\", \"Night-vision perimeter roving\", \"Kids play zone and pool safety vigilance\"]")
                .benefitsJson("[\"Tranquil community environment\", \"Prevent unvetted delivery intruders\", \"Instant SOS response to apartment emergencies\"]")
                .processJson("[\"Gate & Perimeter Mapping\", \"Visitor Management System Deployment\", \"Guard Shift Rotation\", \"Resident Feedback Reviews\"]")
                .faqJson("[{\"q\": \"How are delivery drivers managed?\", \"a\": \"Guards verify entry OTPs or contact the resident before approving entry gate passage.\"}]")
                .targetIndustries("Gated Communities, Luxury High-rises, Private Villas")
                .displayOrder(3)
                .isFeatured(true)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Event Security")
                .slug("event-security")
                .category(guarding)
                .shortDescription("High-impact crowd control, metal detection screening, and VIP access corridors for concerts, expos, and galas.")
                .description("From international trade exhibitions and sports tournaments to private weddings and celebrity concerts, we coordinate venue flow, ingress/egress safety, emergency evacuations, and perimeter containment.")
                .imageUrl("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80")
                .icon("Users")
                .featuresJson("[\"DFMD / HHMD explosive & weapon screening\", \"Crowd surge containment lines\", \"Backstage & artist VIP secure cordons\", \"Medical triage and evacuation lane preservation\"]")
                .benefitsJson("[\"Stampede prevention guarantees\", \"Smooth ticket and badge scanning flow\", \"Rapid handling of disorderly patrons\"]")
                .processJson("[\"Venue Flow & Evacuation Planning\", \"Agency & Police Liaison\", \"Security Grid Stationing\", \"Post-Event De-mobilization\"]")
                .faqJson("[{\"q\": \"How far in advance should we book event security?\", \"a\": \"We recommend 2 to 4 weeks prior to finalize risk profiles and local police liaisons.\"}]")
                .targetIndustries("Expos, Stadiums, Award Shows, Private Banquets")
                .displayOrder(4)
                .isFeatured(true)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Industrial & Factory Security")
                .slug("industrial-security")
                .category(guarding)
                .shortDescription("Heavy industrial perimeter defense, material gate passes, theft prevention, and occupational hazard surveillance.")
                .description("Manufacturing plants, oil refineries, and assembly complexes present hazardous environments and high-value materials. Our industrial protection units are trained in fire safety, hazardous material containment, truck weighbridge validation, and labor dispute de-escalation.")
                .imageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80")
                .icon("Factory")
                .featuresJson("[\"Weighbridge and cargo seal inspection\", \"Daily workforce frisking and locker audits\", \"HAZMAT and OSHA hazard awareness\", \"Perimeter sensor and fence roving\"]")
                .benefitsJson("[\"Drastic reduction in raw material shrinkage\", \"Enforced safety PPE compliance on-site\", \"Protection during industrial strikes or unrest\"]")
                .processJson("[\"Plant Perimeter Audit\", \"Material Inward/Outward SOP\", \"Security Guard Shift Implementation\", \"Surprise Stock Checks\"]")
                .faqJson("[{\"q\": \"Are officers certified in Industrial Fire Fighting?\", \"a\": \"Yes, every industrial guard completes mandatory basic firefighting and first-responder courses.\"}]")
                .targetIndustries("Heavy Industry, Automotive, Chemical Plants, Energy")
                .displayOrder(5)
                .isFeatured(false)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Bank & Financial Institution Security")
                .slug("bank-security")
                .category(guarding)
                .shortDescription("Armed tactical defense, vault containment, cash transit escort, and anti-robbery response units.")
                .description("Financial institutions demand zero-tolerance security standards. We deploy licensed armed officers with tactical combat conditioning, cash-in-transit convoy escorts, silent duress alarm monitoring, and branch-level crowd order.")
                .imageUrl("https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80")
                .icon("Landmark")
                .featuresJson("[\"Armed tactical personnel\", \"Silent duress alarm integration\", \"Vault dual-custody access tracking\", \"Cash transit armored protection\"]")
                .benefitsJson("[\"Unwavering client and employee reassurance\", \"Regulatory compliant financial security protocols\", \"Zero vault breach track record\"]")
                .processJson("[\"Branch Risk Profiling\", \"Armory & Weapon Clearance\", \"Stationing & Armed Drill Setup\", \"Quarterly Robbery Drills\"]")
                .faqJson("[{\"q\": \"What caliber firearms do bank guards carry?\", \"a\": \"Licensed 12-gauge shotguns and 9mm sidearms, strictly adhering to federal and state banking laws.\"}]")
                .targetIndustries("Retail Banks, Credit Unions, Currency Vaults, Fintech Hubs")
                .displayOrder(6)
                .isFeatured(false)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Hospital & Healthcare Security")
                .slug("hospital-security")
                .category(guarding)
                .shortDescription("Sensory-aware security for emergency rooms, neonatal wards, pharmacies, and psychiatric crisis areas.")
                .description("Hospitals are emotionally charged 24/7 environments. Our healthcare security teams specialize in verbal de-escalation, preventing assaults against medical personnel, infant abduction prevention (Code Pink), and pharmaceutical lockdown.")
                .imageUrl("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80")
                .icon("Activity")
                .featuresJson("[\"Emergency Department assault deterrence\", \"Restricted narcotics cabinet guard\", \"Maternity/Infant ward perimeter security\", \"Quiet empathetic conflict resolution\"]")
                .benefitsJson("[\"Safer work environment for doctors & nurses\", \"Zero loss of scheduled medication\", \"Rapid resolution of disruptive visitors\"]")
                .processJson("[\"Ward Vulnerability Mapping\", \"Staff Safety De-escalation Briefing\", \"Guard Placement in Triage & Entrances\", \"Continuous Crisis Drills\"]")
                .faqJson("[{\"q\": \"Are officers trained in healthcare privacy (HIPAA)?\", \"a\": \"Yes, our officers undergo healthcare privacy, patient dignity, and psychiatric de-escalation training.\"}]")
                .targetIndustries("Hospitals, Clinics, Pharmaceutical Centers, Rehab Facilities")
                .displayOrder(7)
                .isFeatured(false)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("School & College Campus Security")
                .slug("school-college-security")
                .category(guarding)
                .shortDescription("Child safety, campus boundary vigilance, anti-bullying monitoring, and active intruder prevention.")
                .description("Educators and students deserve peaceful spaces dedicated entirely to learning. We implement campus access badge gates, student drop-off vehicle marshalling, anti-vandalism patrols, and emergency lockdown procedures.")
                .imageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80")
                .icon("GraduationCap")
                .featuresJson("[\"Strict child pick-up verification ID\", \"Anti-trespass campus perimeter watch\", \"Bus fleet boarding supervision\", \"Active shooter and evacuation coordination\"]")
                .benefitsJson("[\"Peace of mind for parents and educators\", \"Zero unauthorized campus entry\", \"Safe and ordered morning and evening traffic flow\"]")
                .processJson("[\"Perimeter Inspection\", \"Parent Pickup Pass Coordination\", \"Stationing Guards at Gates\", \"Annual Lockdown Drills\"]")
                .faqJson("[{\"q\": \"Are staff background checked specifically for working near minors?\", \"a\": \"Yes, extensive 10-year criminal, sex-offender registry, and child welfare background screenings are conducted.\"}]")
                .targetIndustries("K-12 Schools, Universities, Vocational Campuses")
                .displayOrder(8)
                .isFeatured(false)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Retail & Mall Security")
                .slug("mall-retail-security")
                .category(guarding)
                .shortDescription("Loss prevention, shoplifting mitigation, parking garage safety, and high-footfall emergency readiness.")
                .description("Retail centers experience constant foot traffic, juvenile disturbances, and sophisticated shoplifting rings. We deploy visible customer-service oriented guards alongside undercover loss prevention officers.")
                .imageUrl("https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80")
                .icon("ShoppingBag")
                .featuresJson("[\"Undercover loss prevention agents\", \"Fitting room and EAS antenna monitoring\", \"Basement parking lot patrol vehicles\", \"Lost children and medical first-aid liaison\"]")
                .benefitsJson("[\"Reduced merchandise shrinkage by up to 70%\", \"Enhanced shopper comfort and dwell time\", \"Safe parking facilities after dark\"]")
                .processJson("[\"Store/Mall Risk Assessment\", \"EAS Tag Alignment\", \"Uniformed & Plainclothes Team Placement\", \"Weekly Shrink Audits\"]")
                .faqJson("[{\"q\": \"Can you provide undercover loss prevention staff?\", \"a\": \"Yes, we provide plainclothes security specialists trained to legally detain shoplifters.\"}]")
                .targetIndustries("Shopping Centers, Department Stores, Luxury Boutiques")
                .displayOrder(9)
                .isFeatured(false)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Warehouse & Logistics Security")
                .slug("warehouse-security")
                .category(guarding)
                .shortDescription("Supply chain protection, dock security, seal verification, inventory tracking, and gatehouse management.")
                .description("Supply chain facilities handle millions in transiting freight daily. We monitor dock bays, verify trailer BOL seals, manage driver check-ins, and secure yards with thermal cameras and guard dogs.")
                .imageUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80")
                .icon("Truck")
                .featuresJson("[\"Trailer seal validation & electronic logging\", \"Dock door loading supervisor oversight\", \"Night yard canine perimeter sweeps\", \"Anti-tamper cargo screening\"]")
                .benefitsJson("[\"Zero phantom cargo discrepancies\", \"Faster trucker turnaround times with automated logs\", \"Total freight integrity protection\"]")
                .processJson("[\"Gatehouse Workflow Assessment\", \"Driver & Cargo SOP Formulation\", \"24/7 Gate Guard Deployment\", \"Automated Yard Scans\"]")
                .faqJson("[{\"q\": \"Do your guards inspect truck cabins and seals?\", \"a\": \"Yes, inbound and outbound checks include physical seal verification against bills of lading.\"}]")
                .targetIndustries("Fulfillment Hubs, Distribution Centers, Cold Storage, Sea Ports")
                .displayOrder(10)
                .isFeatured(false)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("VIP & Close Protection")
                .slug("vip-protection")
                .category(protection)
                .shortDescription("Elite personal protection officers, motorcade security, threat intelligence, and discreet executive escorts.")
                .description("Designed for CEOs, diplomats, celebrities, and high-net-worth families facing elevated personal threats. Our close protection operatives are drawn from military special forces and elite police tactical squads.")
                .imageUrl("https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&w=1200&q=80")
                .icon("UserCheck")
                .featuresJson("[\"Former special operations operatives\", \"Counter-surveillance & route reconnaissance\", \"Armored vehicle convoy drivers\", \"Evasive maneuvers & emergency exfiltration\"]")
                .benefitsJson("[\"Complete privacy and peace of mind\", \"Real-time threat assessment and route clearing\", \"Zero-disruption lifestyle facilitation\"]")
                .processJson("[\"Threat Intelligence Gathering\", \"Advance Team Route Planning\", \"Close Protection Deployment\", \"Emergency Extraction Readiness\"]")
                .faqJson("[{\"q\": \"Can operatives travel internationally with us?\", \"a\": \"Yes, our VIP security teams hold international clearance and operate globally.\"}]")
                .targetIndustries("High-Net-Worth Individuals, Diplomats, Corporate C-Suite, Entertainment")
                .displayOrder(11)
                .isFeatured(true)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("CCTV & Central Monitoring")
                .slug("cctv-monitoring")
                .category(surveillance)
                .shortDescription("24/7 remote video surveillance, AI motion alerts, virtual perimeter guards, and direct police dispatch.")
                .description("Turn passive video recordings into active crime prevention. Our centralized Operations Command Center monitors your IP camera networks with AI heatmaps, facial recognition, automated license plate readers, and two-way audio talk-down speakers.")
                .imageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80")
                .icon("Cctv")
                .featuresJson("[\"24/7 live visual verification\", \"Instant audio talk-down horn broadcast\", \"AI tripwire and loitering classification\", \"Priority direct dispatch to patrol units\"]")
                .benefitsJson("[\"Stop burglaries before entry is breached\", \"Cut on-site guarding expenses by 40%\", \"Full tamper-proof cloud video retention\"]")
                .processJson("[\"Camera Feed Connectivity Audit\", \"AI Analytics Parameter Tuning\", \"24/7 Command Center Onboarding\", \"Live Alert Escalation Protocols\"]")
                .faqJson("[{\"q\": \"Can we integrate our existing camera hardware?\", \"a\": \"Yes, our monitoring center connects with ONVIF and RTSP compliant IP cameras.\"}]")
                .targetIndustries("All Commercial, Residential, Construction, Remote Utilities")
                .displayOrder(12)
                .isFeatured(true)
                .isActive(true)
                .build());

        serviceRepository.save(SecurityService.builder()
                .name("Security Consultancy & Audits")
                .slug("security-consultancy")
                .category(advisory)
                .shortDescription("Physical penetration testing, risk assessments, regulatory compliance, and crisis management frameworks.")
                .description("Our certified security consultants provide independent vulnerability assessments for critical national infrastructure, corporate campuses, and high-value installations. We expose loopholes before bad actors exploit them.")
                .imageUrl("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80")
                .icon("FileCheck")
                .featuresJson("[\"Physical penetration testing drills\", \"ISO 27001 & C-TPAT security compliance\", \"Business continuity & crisis disaster manual\", \"CCTV & electronic design schematics\"]")
                .benefitsJson("[\"Eliminate costly compliance penalties\", \"Identify blindspots invisible to internal staff\", \"Actionable, prioritized risk mitigation matrix\"]")
                .processJson("[\"Scope Definition & Threat Modeling\", \"On-Site Covert & Overt Inspection\", \"Vulnerability Gap Analysis\", \"Comprehensive Roadmap Delivery\"]")
                .faqJson("[{\"q\": \"Do you provide written compliance audit reports?\", \"a\": \"Yes, you receive an executive summary, threat probability scores, and architectural remediation blueprints.\"}]")
                .targetIndustries("Defense Contractors, Banks, Energy, Multinational HQs")
                .displayOrder(13)
                .isFeatured(false)
                .isActive(true)
                .build());
    }

    private void seedIndustries() {
        if (industryRepository.count() > 0) return;

        List<Industry> list = List.of(
                Industry.builder().name("Corporate & Commercial").slug("corporate-commercial").icon("Building2")
                        .shortDescription("Securing modern corporate towers, enterprise campuses, and innovation parks.")
                        .description("Corporate enterprises face diverse threats ranging from physical badge cloning and executive harassment to after-hours espionage. We deliver high-touch concierge security paired with perimeter tech.")
                        .keySecurityNeedsJson("[\"Visitor badging & speedlane access\", \"Server room and patent vault protection\", \"Executive floor access control\", \"Emergency evacuation triage\"]")
                        .solutionsJson("[\"Concierge-trained security officers\", \"Biometric multi-factor turnstile access\", \"Automated vehicle plate scanning\", \"24/7 CCTV monitoring center link\"]")
                        .imageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(1).build(),

                Industry.builder().name("Banking & Financial Services").slug("banking-financial").icon("Landmark")
                        .shortDescription("Fortified branch security, ATM guarding, vault containment, and secure cash in transit.")
                        .description("Banks and financial clearinghouses demand bullet-resistant protection, armed tactical response, and strict compliance with national monetary regulations.")
                        .keySecurityNeedsJson("[\"Armed physical deterrent\", \"Duress & panic button integration\", \"Vault dual-key protocol enforcement\", \"ATM anti-skimming inspection\"]")
                        .solutionsJson("[\"Tactically armed certified guards\", \"Armored transit vehicle protection\", \"Anti-tailgating mantrap entryways\", \"24/7 priority dispatch bridge\"]")
                        .imageUrl("https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(2).build(),

                Industry.builder().name("Healthcare & Hospitals").slug("healthcare-hospitals").icon("Activity")
                        .shortDescription("Compassionate, firm protection for trauma wards, staff safety, and pharmaceutical stores.")
                        .description("Healthcare environments require emotional intelligence to de-escalate grief and panic while shielding medical providers from violence.")
                        .keySecurityNeedsJson("[\"Emergency room assault prevention\", \"Infant ward perimeter lockdown\", \"Restricted narcotics storage security\", \"Disruptive visitor management\"]")
                        .solutionsJson("[\"Crisis Intervention certified personnel\", \"Infant band RFID alarm systems\", \"Pharmacy biometrics & cage security\", \"Dedicated 24/7 roving patrols\"]")
                        .imageUrl("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(3).build(),

                Industry.builder().name("Industrial & Manufacturing").slug("industrial-manufacturing").icon("Factory")
                        .shortDescription("Asset security, perimeter protection, gate pass management, and hazard vigilance.")
                        .description("Sprawling industrial complexes are susceptible to copper and machinery theft, unauthorized trespassing, and hazardous material accidents.")
                        .keySecurityNeedsJson("[\"Heavy gatehouse vehicle logging\", \"Anti-theft worker frisking\", \"Perimeter intrusion detection\", \"HAZMAT safety & fire coordination\"]")
                        .solutionsJson("[\"Industrial security guard corps\", \"Weighbridge automated cameras\", \"Thermal boundary sensors\", \"Safety PPE compliance officers\"]")
                        .imageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(4).build(),

                Industry.builder().name("Residential Communities").slug("residential-communities").icon("Home")
                        .shortDescription("Peace of mind for families, gated neighborhoods, condominiums, and private estates.")
                        .description("Creating a safe haven where children can play and residents rest peacefully without stranger intrusion or unauthorized canvassing.")
                        .keySecurityNeedsJson("[\"Visitor and delivery vehicle vetting\", \"Perimeter fence night vigilance\", \"Clubhouse and pool oversight\", \"Instant resident distress response\"]")
                        .solutionsJson("[\"Smart gatekeeper app integration\", \"Roving golf-cart security patrols\", \"Perimeter infrared tripwires\", \"24/7 community dispatch line\"]")
                        .imageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(5).build(),

                Industry.builder().name("Retail & Shopping Malls").slug("retail-shopping-malls").icon("ShoppingBag")
                        .shortDescription("Loss prevention, crowd harmony, parking safety, and emergency response.")
                        .description("Modern retail hubs must deter organized retail crime rings and shoplifters while preserving a warm, inviting shopping atmosphere.")
                        .keySecurityNeedsJson("[\"Shoplifter detection and apprehension\", \"Parking structure and elevator safety\", \"Lost child and customer assistance\", \"After-hours mall lockdown\"]")
                        .solutionsJson("[\"Undercover loss prevention agents\", \"Uniformed mall customer-concierge guards\", \"Two-way radio dispatch networks\", \"Basement bike/car patrols\"]")
                        .imageUrl("https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(6).build(),

                Industry.builder().name("Education & Universities").slug("education-universities").icon("GraduationCap")
                        .shortDescription("Protecting students, faculty, dormitories, and research laboratories.")
                        .description("Educational campuses require watchful vigilance against trespassers, safe transit between night classes, and coordinated crisis protocols.")
                        .keySecurityNeedsJson("[\"Access restriction to non-students\", \"Dormitory entry logging\", \"Blue-light emergency station support\", \"Active crisis drills\"]")
                        .solutionsJson("[\"Campus safety patrol units\", \"Digital student ID barriers\", \"Night escort safety walk services\", \"Campus emergency broadcast integrations\"]")
                        .imageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(7).build(),

                Industry.builder().name("Hospitality & Hotels").slug("hospitality-hotels").icon("Hotel")
                        .shortDescription("Discreet guest protection, baggage screening, valet security, and VIP privacy.")
                        .description("Five-star resorts and hotels require security that operates invisibly to protect the guest luxury experience while preventing unauthorized room floor access.")
                        .keySecurityNeedsJson("[\"Elevator room-key access control\", \"Discreet banquet & conference security\", \"Unobtrusive VIP protection\", \"Luggage loading monitoring\"]")
                        .solutionsJson("[\"Suit-and-tie hospitality security team\", \"Subtle optical surveillance network\", \"Keycard floor lockout systems\", \"Private bodyguard details\"]")
                        .imageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(8).build(),

                Industry.builder().name("Construction Sites").slug("construction-sites").icon("HardHat")
                        .shortDescription("Copper, tool, and heavy machinery protection for active development projects.")
                        .description("Unfinished structures are prime targets for metal scavengers, fuel theft, and trespassers seeking dangerous vantage points.")
                        .keySecurityNeedsJson("[\"Equipment and fuel siphon deterrence\", \"Subcontractor badge authentication\", \"Unfenced boundary surveillance\", \"OSHA hard-hat enforcement\"]")
                        .solutionsJson("[\"Mobile solar CCTV surveillance trailers\", \"Guard dog canine night patrols\", \"Material lockup checkpoints\", \"Thermal perimeter radar\"]")
                        .imageUrl("https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(9).build(),

                Industry.builder().name("Government & Defense").slug("government-defense").icon("Shield")
                        .shortDescription("High-clearance security, perimeter blockades, and counter-surveillance operations.")
                        .description("Government institutions and defense suppliers face sophisticated geopolitical adversaries demanding classified clearance protocols.")
                        .keySecurityNeedsJson("[\"Top-secret access compartmentalization\", \"Vehicle blast standoff zones\", \"Anti-drone airspace surveillance\", \"Continuous credential verification\"]")
                        .solutionsJson("[\"Vetted personnel with security clearances\", \"Hydraulic bollards and tire shredders\", \"Faraday isolation rooms\", \"Red-team penetration evaluations\"]")
                        .imageUrl("https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(10).build(),

                Industry.builder().name("Events & Entertainment").slug("events-entertainment").icon("Users")
                        .shortDescription("Crowd dynamics, explosive screening, VIP artist cordons, and rapid evacuation.")
                        .description("High-density spectator environments require flawless entry processing, proactive fight prevention, and clear medical corridors.")
                        .keySecurityNeedsJson("[\"Ticket fraud and weapon ingress control\", \"Crowd surge and stampede mitigation\", \"Artist dressing room bubbles\", \"Pyrotechnic and fire watch\"]")
                        .solutionsJson("[\"High-throughput walk-through metal detectors\", \"Stage barricade security line\", \"Rapid-response medical corridor teams\", \"Bilingual crowd marshals\"]")
                        .imageUrl("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80")
                        .displayOrder(11).build()
        );

        industryRepository.saveAll(list);
    }

    private void seedClients() {
        if (clientRepository.count() > 0) return;

        List<Client> list = List.of(
                Client.builder().name("Aegis Global Bank").category("Banking & Finance").logoUrl("https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(1).build(),
                Client.builder().name("Apex Tech Horizon").category("Corporate IT").logoUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(2).build(),
                Client.builder().name("St. Jude Memorial Hospital").category("Healthcare").logoUrl("https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(3).build(),
                Client.builder().name("Vanguard Industrial Logistics").category("Supply Chain").logoUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(4).build(),
                Client.builder().name("The Grand Regency Galleria").category("Retail & Malls").logoUrl("https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(5).build(),
                Client.builder().name("Oakhaven Luxury Enclave").category("Residential").logoUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(6).build(),
                Client.builder().name("Metropolitan Convention Authority").category("Events").logoUrl("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(7).build(),
                Client.builder().name("Solaria Clean Energy Plant").category("Energy & Utilities").logoUrl("https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=300&q=80").websiteUrl("https://example.com").isFeatured(true).displayOrder(8).build()
        );

        clientRepository.saveAll(list);
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) return;

        List<Project> list = List.of(
                Project.builder()
                        .title("Multi-Campus Tech Headquarters Integrated Defense")
                        .slug("tech-headquarters-integrated-defense")
                        .clientName("Apex Tech Horizon")
                        .clientType("Corporate Tech Campus")
                        .location("Silicon Valley, CA")
                        .securityRequirement("Securing a sprawling 45-acre tech campus housing 8,500 employees, intellectual property design labs, and sensitive server infrastructures across 6 multi-story glass towers with zero unauthorized access.")
                        .securitySolution("Deployed a dedicated 60-officer security detachment trained in executive concierge protocols, paired with 250 AI-enabled 4K optical cameras, biometric facial turnstiles, underground garage automated plate scanners, and a localized 24/7 Security Operations Command center.")
                        .results("Achieved 100% visitor badge compliance, reduced unauthorized tailgating incidents to absolute zero over 24 consecutive months, and secured ISO 27001 physical security certification with zero infractions.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80")
                        .galleryUrlsJson("[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80\", \"https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80\"]")
                        .isPublished(true)
                        .displayOrder(1)
                        .build(),

                Project.builder()
                        .title("St. Jude Level-1 Trauma Hospital Emergency Safety Overhaul")
                        .slug("hospital-emergency-safety-overhaul")
                        .clientName("St. Jude Memorial Hospital")
                        .clientType("Healthcare Facility")
                        .location("Chicago, IL")
                        .securityRequirement("Emergency department nursing staff experienced frequent verbal confrontations, patient family tensions, and unauthorized movement into psychiatric wards and narcotics dispensaries.")
                        .securitySolution("Instituted Crisis Intervention and de-escalation security teams stationed at triage check-in. Implemented contactless RFID badges for pharmacy lockers, Code Pink baby-abduction perimeter lockouts, and discreet metal detectors at ER entrance.")
                        .results("85% reduction in nurse workplace aggression incidents within 90 days. Staff morale rose significantly with a 98% positive security confidence rating among physicians.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80")
                        .galleryUrlsJson("[\"https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80\"]")
                        .isPublished(true)
                        .displayOrder(2)
                        .build(),

                Project.builder()
                        .title("Automated Logistics Gateway and Warehouse Defense")
                        .slug("automated-logistics-gateway")
                        .clientName("Vanguard Industrial Logistics")
                        .clientType("Supply Chain & Freight Hub")
                        .location("Dallas, TX")
                        .securityRequirement("A 500,000 sq.ft distribution facility faced ₹40,00,000 annual losses from freight shrinkage, damaged trailer seals, and prolonged driver turnaround times at entry gatehouses.")
                        .securitySolution("Transitioned manual paper logs into a digital gatehouse management system with automated Optical Character Recognition for truck plates and container numbers. Added canine night yard patrols and thermal boundary sensors.")
                        .results("Decreased inventory shrinkage by 94%, reduced truck dwell time from 28 minutes to 4.5 minutes, and recovered 100% of diverted pallet stock within the first year.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80")
                        .galleryUrlsJson("[\"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80\"]")
                        .isPublished(true)
                        .displayOrder(3)
                        .build(),

                Project.builder()
                        .title("Global Economic Summit VIP Motorcade & Venue Lockdown")
                        .slug("global-summit-vip-motorcade")
                        .clientName("Metropolitan Convention Authority")
                        .clientType("International Diplomatic Event")
                        .location("Washington, D.C.")
                        .securityRequirement("Flawlessly escort and protect 42 international dignitaries, ministers, and Fortune 50 executives throughout a 4-day summit with 15,000 public attendees.")
                        .securitySolution("Deployed elite Close Protection details, advance counter-sniper reconnaissance teams, armored suburban convoys with emergency medical escort, and synchronized live route tracking with federal agencies.")
                        .results("Zero security breaches, 100% on-time dignitary arrivals across 180 individual motorcade runs, with commendations issued by municipal police commissioners.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&w=1200&q=80")
                        .galleryUrlsJson("[\"https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80\"]")
                        .isPublished(true)
                        .displayOrder(4)
                        .build()
        );

        projectRepository.saveAll(list);
    }

    private void seedTeam() {
        if (teamMemberRepository.count() > 0) return;

        List<TeamMember> list = List.of(
                TeamMember.builder()
                        .name("Commander Arthur Vance")
                        .designation("Chief Executive Officer & Founder")
                        .profileImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80")
                        .experienceYears(26)
                        .bio("Former military counter-terrorism commander with over two decades orchestrating large-scale corporate defense, diplomatic protective details, and critical infrastructure resilience.")
                        .specializations("Threat Intelligence, Defense Strategy, Critical Infrastructure Protection")
                        .email("arthur.vance@securityservices.com")
                        .linkedinUrl("https://linkedin.com")
                        .displayOrder(1)
                        .build(),

                TeamMember.builder()
                        .name("Elena Rostova")
                        .designation("Vice President of Operations")
                        .profileImageUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80")
                        .experienceYears(18)
                        .bio("Specializes in high-threat enterprise deployments, hospital safety protocols, and emergency evacuation drills across North American commercial properties.")
                        .specializations("Guard Corps Management, Emergency Readiness, Incident Command Systems")
                        .email("elena.rostova@securityservices.com")
                        .linkedinUrl("https://linkedin.com")
                        .displayOrder(2)
                        .build(),

                TeamMember.builder()
                        .name("David Thorne")
                        .designation("Director of VIP & Tactical Services")
                        .profileImageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80")
                        .experienceYears(15)
                        .bio("Former presidential protective detail officer leading our close protection operations, defensive driving escorts, and overseas diplomatic assignments.")
                        .specializations("Close Protection, Motorcade Tactics, Counter-Surveillance")
                        .email("david.thorne@securityservices.com")
                        .linkedinUrl("https://linkedin.com")
                        .displayOrder(3)
                        .build(),

                TeamMember.builder()
                        .name("Sarah Sterling, CPP")
                        .designation("Chief Technology Officer (Electronic Systems)")
                        .profileImageUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80")
                        .experienceYears(14)
                        .bio("Pioneered AI video analytics, remote thermal detection, and cloud-based access control networks across major financial institutions and logistics hubs.")
                        .specializations("CCTV Command Architecture, Biometrics, Threat Analytics AI")
                        .email("sarah.sterling@securityservices.com")
                        .linkedinUrl("https://linkedin.com")
                        .displayOrder(4)
                        .build(),

                TeamMember.builder()
                        .name("Robert Hayes")
                        .designation("Head of Training & Compliance")
                        .profileImageUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80")
                        .experienceYears(20)
                        .bio("Oversees our 120-hour tactical academy curriculum, certifying all field officers in defensive tactics, non-lethal weapons, de-escalation, and OSHA standards.")
                        .specializations("Tactical Drills, Firearms Certification, De-escalation Protocol")
                        .email("robert.hayes@securityservices.com")
                        .linkedinUrl("https://linkedin.com")
                        .displayOrder(5)
                        .build(),

                TeamMember.builder()
                        .name("Maya Lin")
                        .designation("Director of Client Relations & Risk Audits")
                        .profileImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80")
                        .experienceYears(12)
                        .bio("Advises corporate executives and property boards on security SLA optimizations, vulnerability audits, and business continuity architecture.")
                        .specializations("Risk Auditing, ISO Compliance, Client Success")
                        .email("maya.lin@securityservices.com")
                        .linkedinUrl("https://linkedin.com")
                        .displayOrder(6)
                        .build()
        );

        teamMemberRepository.saveAll(list);
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() > 0) return;

        List<Testimonial> list = List.of(
                Testimonial.builder()
                        .customerName("Jonathan Meyers")
                        .company("Apex Tech Horizon")
                        .designation("VP of Real Estate & Facilities")
                        .review("Transitioning our 45-acre tech campus to their security services was the smoothest operation we've ever experienced. Their officers are impeccably turned out, polite to our engineers, yet razor-sharp on badge verification. Zero incidents in two years.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")
                        .isFeatured(true)
                        .isApproved(true)
                        .displayOrder(1)
                        .build(),

                Testimonial.builder()
                        .customerName("Dr. Patricia Ramirez")
                        .company("St. Jude Memorial Hospital")
                        .designation("Chief Medical Officer")
                        .review("Our ER staff used to dread weekend nights due to disorderly patients and agitated crowds. The hospital security team deployed here handles crises with empathy and calm authority. They've made our emergency room a safe place to heal again.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80")
                        .isFeatured(true)
                        .isApproved(true)
                        .displayOrder(2)
                        .build(),

                Testimonial.builder()
                        .customerName("Craig Holloway")
                        .company("Vanguard Industrial Logistics")
                        .designation("Director of Loss Prevention")
                        .review("Shrinkage in our Dallas distribution hub dropped by 94% within six months of deploying their gatehouse inspection and yard patrols. The automated log system alone saved us hundreds of staff hours. Outstanding professionalism.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80")
                        .isFeatured(true)
                        .isApproved(true)
                        .displayOrder(3)
                        .build(),

                Testimonial.builder()
                        .customerName("Victoria Chambers")
                        .company("The Grand Regency Galleria")
                        .designation("General Manager")
                        .review("We required security guards who understand luxury retail etiquette and don't intimidate high-net-worth shoppers while stopping theft. Their personnel strike the balance flawlessly. Highly recommended.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80")
                        .isFeatured(true)
                        .isApproved(true)
                        .displayOrder(4)
                        .build(),

                Testimonial.builder()
                        .customerName("Harrison Vance")
                        .company("Oakhaven Residential Association")
                        .designation("HOA Board President")
                        .review("Having their roving patrols and gate personnel watching over our 600-home community gives all our families genuine peace of mind. Fast emergency responses and always respectful.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80")
                        .isFeatured(false)
                        .isApproved(true)
                        .displayOrder(5)
                        .build()
        );

        testimonialRepository.saveAll(list);
    }

    private void seedGallery() {
        if (galleryRepository.count() > 0) return;

        List<GalleryImage> list = List.of(
                GalleryImage.builder().title("Elite Guard Inspection & Briefing").category("Security Personnel").imageUrl("https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80").description("Daily morning briefing and uniform inspection before deployment.").isFeatured(true).displayOrder(1).build(),
                GalleryImage.builder().title("Executive Tactical Close Escort").category("Operations").imageUrl("https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&w=1000&q=80").description("Close protection specialists escorting C-suite delegates in secure transit.").isFeatured(true).displayOrder(2).build(),
                GalleryImage.builder().title("Central Surveillance Operations Center").category("Equipment").imageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80").description("24/7 video monitoring wall with automated AI perimeter alarms.").isFeatured(true).displayOrder(3).build(),
                GalleryImage.builder().title("Tactical Response & Firefighting Training").category("Training").imageUrl("https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80").description("Academy recruits mastering industrial emergency triage and fire control.").isFeatured(true).displayOrder(4).build(),
                GalleryImage.builder().title("International Expo Crowd Marshalling").category("Events").imageUrl("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80").description("Coordinating security lines and walk-through metal detectors at convention gates.").isFeatured(true).displayOrder(5).build(),
                GalleryImage.builder().title("Corporate Tower Access Turnstile Security").category("Corporate Security").imageUrl("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80").description("Badge verification and visitor registration at corporate headquarters.").isFeatured(true).displayOrder(6).build(),
                GalleryImage.builder().title("Canine K-9 Patrol Unit Sweeps").category("Security Personnel").imageUrl("https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80").description("Trained detection K-9 units securing logistics perimeter yards.").isFeatured(false).displayOrder(7).build(),
                GalleryImage.builder().title("Automated Number Plate Recognition (ANPR)").category("Equipment").imageUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80").description("Digital high-speed license plate scanning for parking complexes.").isFeatured(false).displayOrder(8).build()
        );

        galleryRepository.saveAll(list);
    }

    private void seedBlog() {
        if (blogPostRepository.count() > 0) return;

        BlogCategory cat1 = blogCategoryRepository.save(BlogCategory.builder().name("Corporate Defense").slug("corporate-defense").description("Corporate property security and executive safety strategies.").build());
        BlogCategory cat2 = blogCategoryRepository.save(BlogCategory.builder().name("Surveillance & AI").slug("surveillance-ai").description("Technological advancements in perimeter surveillance.").build());
        blogCategoryRepository.save(BlogCategory.builder().name("Crisis & Compliance").slug("crisis-compliance").description("Regulatory standards, emergency drills, and audits.").build());

        List<BlogPost> list = List.of(
                BlogPost.builder()
                        .title("7 Crucial Physical Security Vulnerabilities Modern Corporate Towers Overlook")
                        .slug("7-crucial-physical-security-vulnerabilities-corporate-towers")
                        .category(cat1)
                        .excerpt("From tailgating at biometric turnstiles to unsecured loading dock freight doors, examine the seven most frequent breach pathways uncovered in corporate penetration audits.")
                        .content("Modern corporate towers invest millions in sleek glass architecture and high-tech cybersecurity firewalls, yet frequently leave their physical perimeters vulnerable to social engineering and basic bypass tactics. In this comprehensive guide, our certified security consultants detail the primary vulnerability vectors: tailgating into elevators, unmonitored loading bays, contractor pass proliferation, and blind spots in basement parking complexes. Learn how layered defense architecture seals these gaps permanently.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80")
                        .authorName("Commander Arthur Vance")
                        .status(PostStatus.PUBLISHED)
                        .publishedAt(LocalDateTime.now().minusDays(5))
                        .viewCount(1420L)
                        .tags("Corporate, Access Control, Audits, Facilities")
                        .build(),

                BlogPost.builder()
                        .title("The Convergence of AI Video Analytics and Physical Guard Dispatch")
                        .slug("convergence-of-ai-video-analytics-and-guard-dispatch")
                        .category(cat2)
                        .excerpt("Discover how artificial intelligence video algorithms turn passive security cameras into proactive crime-prevention hubs with instant tactical officer response.")
                        .content("Gone are the days when security guards stared at walls of static CRT monitors waiting to catch a burglar. Modern centralized monitoring blends computer vision, thermal perimeter tripwires, and intelligent weapon detection with instant mobile dispatch. Learn why this hybrid model cuts overhead costs while eliminating false alarms and increasing response speed tenfold.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80")
                        .authorName("Sarah Sterling, CPP")
                        .status(PostStatus.PUBLISHED)
                        .publishedAt(LocalDateTime.now().minusDays(12))
                        .viewCount(980L)
                        .tags("CCTV, AI, Automation, Surveillance")
                        .build(),

                BlogPost.builder()
                        .title("Building an Impenetrable Supply Chain: Warehouse & Yard Security Masterclass")
                        .slug("building-impenetrable-supply-chain-warehouse-security")
                        .category(cat1)
                        .excerpt("Cargo shrinkage and container seal tampering cost logistics operators billions each year. Here is the operational framework to secure your freight terminals.")
                        .content("With global freight traffic at all-time highs, distribution hubs are prime targets for internal theft rings and external hijackers. Implementing strict driver verification, dual-custody container seal validation, automated scale cameras, and perimeter canine sweeps eliminates shrinkage and keeps transit pipelines strictly protected.")
                        .featuredImageUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80")
                        .authorName("Craig Holloway")
                        .status(PostStatus.PUBLISHED)
                        .publishedAt(LocalDateTime.now().minusDays(20))
                        .viewCount(830L)
                        .tags("Logistics, Supply Chain, Freight, Loss Prevention")
                        .build()
        );

        blogPostRepository.saveAll(list);
    }

    private void seedFaqs() {
        if (faqRepository.count() > 0) return;

        List<Faq> list = List.of(
                Faq.builder().question("How quickly can security personnel be deployed to our facility?").answer("For standard commercial and corporate properties, our full deployment cycle (site assessment, post order formulation, officer briefing) typically takes 48 to 72 hours. In critical emergencies, tactical dispatch can deploy within 2 to 4 hours.").category("Deployment & Operations").displayOrder(1).build(),
                Faq.builder().question("What screening and vetting processes do your security guards undergo?").answer("Every officer undergoes extensive background checks including multi-state criminal history, 10-panel drug screening, credit stability reviews, educational verification, psychological temperament assessments, and mandatory 120-hour tactical academy drill training.").category("Personnel & Training").displayOrder(2).build(),
                Faq.builder().question("Do you offer both armed and unarmed security guards?").answer("Yes. We offer fully licensed armed officers (trained with 9mm sidearms and 12-gauge tactical shotguns) for high-threat institutions such as banks and currency vaults, alongside unarmed concierge-level guards for corporate towers, hospitals, and residential communities.").category("Personnel & Training").displayOrder(3).build(),
                Faq.builder().question("How does your 24/7 Operations Command Center monitor deployed guards?").answer("Our personnel utilize real-time GPS wanding devices at checkpoints throughout their patrols. If a patrol route is missed or an incident button triggered, our 24/7 Operations Command Center receives an instant alert and dispatches roving field supervisors immediately.").category("Technology & CCTV").displayOrder(4).build(),
                Faq.builder().question("Can you integrate our existing CCTV cameras and access turnstiles?").answer("Yes. Our technical systems team connects with virtually all industry-standard ONVIF/RTSP compliant IP cameras, smart access cards, turnstiles, and biometric scanners, eliminating the need for expensive hardware overhauls.").category("Technology & CCTV").displayOrder(5).build(),
                Faq.builder().question("How can I request a customized security quotation?").answer("You can submit a quotation request directly via our online 'Request a Quote' portal or call our 24/7 client dispatch hotline. A security risk specialist will contact you within 2 business hours to schedule a complimentary site security audit.").category("Contracts & Pricing").displayOrder(6).build(),
                Faq.builder().question("What happens if a guard is sick or unable to report for duty?").answer("We maintain a standby reserve force in each operational zone. Our automated scheduling system flags any unconfirmed check-in 30 minutes prior to shift commencement, ensuring immediate relief officer dispatch with zero post vacancy.").category("Deployment & Operations").displayOrder(7).build(),
                Faq.builder().question("Are your services fully bonded and insured?").answer("Yes, we carry extensive comprehensive general liability, workers' compensation, and fidelity bonding coverage exceeding industry requirements, shielding our clients from liability.").category("Contracts & Pricing").displayOrder(8).build()
        );

        faqRepository.saveAll(list);
    }

    private void seedJobsAndApplications() {
        if (jobPostRepository.count() > 0) return;

        JobPost job1 = jobPostRepository.save(JobPost.builder()
                .title("Corporate Security Officer (Armed / Unarmed)")
                .slug("corporate-security-officer")
                .location("Downtown Metropolitan HQ")
                .employmentType("Full-time")
                .experienceRequired("2+ years in corporate or hospitality security")
                .salaryRange("₹4,50,000 - ₹5,50,000 / year")
                .description("We are seeking disciplined, articulate, and observant Corporate Security Officers to protect prestigious multi-tenant corporate towers. Responsible for badge issuance, access validation, after-hours floor rounds, and emergency response.")
                .responsibilitiesJson("[\"Monitor lobby badge turnstiles and verify credentials\", \"Conduct scheduled digital wanding patrols of building perimeters\", \"Provide courteous visitor guidance and badge printing\", \"Respond swiftly to alarm trips and medical emergencies\"]")
                .requirementsJson("[\"High school diploma or equivalent\", \"Valid state Security Guard License / Guard Card\", \"Impeccable communication and conflict resolution skills\", \"Ability to pass comprehensive background and drug screening\"]")
                .status("ACTIVE")
                .applicationDeadline(LocalDate.now().plusMonths(2))
                .build());

        jobPostRepository.save(JobPost.builder()
                .title("Command Center CCTV & Dispatch Operator")
                .slug("command-center-cctv-operator")
                .location("Central Operations Command")
                .employmentType("Full-time (Rotating Shifts)")
                .experienceRequired("3+ years in alarm monitoring or dispatch")
                .salaryRange("₹5,20,000 - ₹6,40,000 / year")
                .description("Monitor state-of-the-art multi-screen video walls, analyze AI intrusion alarms, dispatch mobile response units, and coordinate communications with municipal police and fire departments.")
                .responsibilitiesJson("[\"Monitor live optical and thermal CCTV feeds\", \"Triage incoming emergency duress alarms\", \"Dispatch roving field supervisors and coordinate with emergency services\", \"Maintain strict digital incident logs and evidence archives\"]")
                .requirementsJson("[\"Prior experience in 911 dispatch or central station monitoring\", \"Proficiency with VMS software (Milestone, Genetec, or Avigilon)\", \"Calm under high-pressure crisis scenarios\"]")
                .status("ACTIVE")
                .applicationDeadline(LocalDate.now().plusMonths(3))
                .build());

        jobPostRepository.save(JobPost.builder()
                .title("Executive Protection Specialist (VIP Close Escort)")
                .slug("executive-protection-specialist")
                .location("Regional Travel / Global")
                .employmentType("Contract / Full-time")
                .experienceRequired("5+ years military special operations or diplomatic protection")
                .salaryRange("₹8,50,000 - ₹12,00,000 / year")
                .description("Deliver elite close protection, advance route reconnaissance, defensive convoy driving, and low-profile escort for high-net-worth families, diplomats, and corporate executives.")
                .responsibilitiesJson("[\"Perform physical advance reconnaissance of venues and itineraries\", \"Maintain close proximity protective diamond formations\", \"Execute evasive motorcade driving in tactical scenarios\", \"Coordinate threat intelligence with local security teams\"]")
                .requirementsJson("[\"Former military combat arms or tactical law enforcement background\", \"Concealed carry weapons permit and defensive driving certification\", \"Valid passport and willingness to travel internationally\"]")
                .status("ACTIVE")
                .applicationDeadline(LocalDate.now().plusMonths(1))
                .build());

        // Sample application
        jobApplicationRepository.save(JobApplication.builder()
                .jobPost(job1)
                .applicantName("James MacIntyre")
                .email("james.mac@example.com")
                .phone("+1 (555) 349-2180")
                .location("Dallas, TX")
                .experienceYears("3 years")
                .message("Dedicated former military police specialist with 3 years commercial guarding experience. Hold valid state guard card and CPR/AED certification.")
                .status("REVIEWING")
                .build());
    }

    private void seedQuotesAndEnquiries() {
        if (quoteRequestRepository.count() > 0) return;

        quoteRequestRepository.save(QuoteRequest.builder()
                .quoteNumber("QT-2026-0814")
                .name("Brenda Sterling")
                .company("Sterling & Partners Financial Plaza")
                .email("bsterling@sterlingplaza.com")
                .phone("+1 (555) 782-9012")
                .serviceRequired("Corporate Security")
                .location("742 Financial Boulevard, Suite 1200")
                .numberOfGuardsRequired(6)
                .startDate("2026-10-01")
                .duration("Annual Contract")
                .securityRequirements("Need 24/7 lobby concierge guard desk, after-hours perimeter roving, and loading dock access verification.")
                .message("Seeking quotes for 6 guards on rotating shifts starting next month. Please include supervisor inspection SLA details.")
                .status("NEW")
                .build());

        quoteRequestRepository.save(QuoteRequest.builder()
                .quoteNumber("QT-2026-0792")
                .name("Carlos Gomez")
                .company("Logix Freight Center")
                .email("carlos.g@logixfreight.com")
                .phone("+1 (555) 431-8890")
                .serviceRequired("Warehouse Security")
                .location("Industrial Gateway Park, Bay 14")
                .numberOfGuardsRequired(4)
                .startDate("2026-09-20")
                .duration("Annual Contract")
                .securityRequirements("Gatehouse check-in, seal logging, and night canine sweeps.")
                .message("We are experiencing freight diversion and need disciplined gate guards immediately.")
                .status("IN_PROGRESS")
                .quotedAmount(12800.0)
                .assignedStaffName("Elena Rostova")
                .build());

        contactEnquiryRepository.save(ContactEnquiry.builder()
                .name("Allison Vance")
                .email("allison.v@vancerealty.com")
                .phone("+1 (555) 890-4421")
                .subject("Security Audit for Gated Residential Community")
                .message("We represent a 250-villa community in North Hills. We are looking to upgrade our entrance barriers and replace our current security provider. Please call me to schedule a site review.")
                .status("NEW")
                .build());

        contactEnquiryRepository.save(ContactEnquiry.builder()
                .name("Marcus Dupont")
                .email("m.dupont@dupontenterprises.com")
                .phone("+1 (555) 234-9988")
                .subject("VIP Close Protection for International Conference")
                .message("Our executive board will be attending the Global Clean Energy summit in two weeks. We require 2 close protection officers and an armored vehicle convoy.")
                .status("CONTACTED")
                .internalNotes("Spoke with assistant; sent brochure and awaiting flight arrival itineraries.")
                .build());
    }

    private void seedSiteSettings() {
        if (settingRepository.count() > 0) return;

        List<SiteSetting> list = List.of(
                SiteSetting.builder().settingKey("company_name").settingValue("ABC Security Services Inc.").description("Official Registered Corporate Name").groupName("GENERAL").build(),
                SiteSetting.builder().settingKey("company_tagline").settingValue("Professional Security Services You Can Trust").description("Corporate Tagline").groupName("GENERAL").build(),
                SiteSetting.builder().settingKey("phone_primary").settingValue("+1 (800) 826-4827").description("Toll-Free General Inquiries").groupName("CONTACT").build(),
                SiteSetting.builder().settingKey("phone_emergency").settingValue("+1 (800) 911-7328").description("24/7 Rapid Emergency Dispatch Line").groupName("CONTACT").build(),
                SiteSetting.builder().settingKey("email_primary").settingValue("dispatch@securityservices.com").description("Primary Corporate Email").groupName("CONTACT").build(),
                SiteSetting.builder().settingKey("address").settingValue("750 Sentinel Plaza, Defense Tower, Suite 1800, New York, NY 10005").description("Headquarters Address").groupName("CONTACT").build(),
                SiteSetting.builder().settingKey("business_hours").settingValue("24 Hours a Day, 7 Days a Week, 365 Days a Year").description("Operating Coverage").groupName("CONTACT").build(),
                SiteSetting.builder().settingKey("license_number").settingValue("Licensed & Bonded Private Security Contractor #PSC-84920-A").description("State Security Licensing Certification").groupName("COMPLIANCE").build()
        );

        settingRepository.saveAll(list);
    }

    private void normalizeCurrenciesToInr() {
        jobPostRepository.findAll().forEach(job -> {
            if (job.getSalaryRange() != null && job.getSalaryRange().contains("$")) {
                job.setSalaryRange(job.getSalaryRange().replace("$", "₹"));
                jobPostRepository.save(job);
            }
        });

        projectRepository.findAll().forEach(project -> {
            boolean updated = false;
            if (project.getSecurityRequirement() != null && project.getSecurityRequirement().contains("$")) {
                project.setSecurityRequirement(project.getSecurityRequirement().replace("$", "₹"));
                updated = true;
            }
            if (project.getSecuritySolution() != null && project.getSecuritySolution().contains("$")) {
                project.setSecuritySolution(project.getSecuritySolution().replace("$", "₹"));
                updated = true;
            }
            if (project.getResults() != null && project.getResults().contains("$")) {
                project.setResults(project.getResults().replace("$", "₹"));
                updated = true;
            }
            if (updated) {
                projectRepository.save(project);
            }
        });
    }
}
