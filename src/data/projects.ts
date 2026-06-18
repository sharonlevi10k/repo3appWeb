import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'greenbrush',
    name: 'Greenbrush',
    category: 'Solar Energy Solutions',
    tagline:
      'Cleaning solutions for solar systems — automated maintenance that keeps panels at peak output, all season long.',
    description:
      'Web system and digital application that connects the physical product (brush and washing kit) to an advanced digital user experience — dashboard, guidance, maintenance journal, and store integration.',
    accent: 'emerald',
    featured: true,
    tags: ['Solar Energy', 'Smart Maintenance', '10+ Years'],
    metrics: [
      { value: '+25%', label: 'Output gain' },
      { value: '15–20m', label: 'Avg cleaning' },
      { value: '10+ yrs', label: 'Experience' },
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API', 'Responsive Design'],
    image: '/images/greenbrush/greenBruhs-1.jpeg',
    logo: '/images/greenbrush/greenBrushs-logo.png',
    link: 'https://www.greenbrush.co.il/',
    about: [
      'Greenbrush is an Israeli company that specializes in standard washing solutions for solar systems of all types and sizes — small residential systems, medium systems on commercial roofs, and large solar installations.',
      'They have over a decade of experience in the solar energy field, including deep understanding of maintenance, cleaning and panel manufacturer requirements. They developed a dedicated brush and cleaning kits designed specifically for solar panels, so cleaning can be done easily, quickly and efficiently — while maintaining manufacturer warranty for years.',
      'Their solutions help solar system owners increase output and revenue, save on external cleaning costs, and keep the system in good condition over time. The products are manufactured locally and adapted to the Israeli climate, dust, sand and humidity.',
    ],
    offers: [
      'Self-cleaning of the solar system instead of relying only on external service companies',
      'Improved solar system output (less dust and dirt = more energy)',
      'Time savings — relatively fast cleaning for any system',
      'Working with standard equipment that meets manufacturer guidelines and maintains panel warranty',
      'Customized solutions for residential, medium and large commercial systems',
    ],
    gallery: ['/images/greenbrush/greenBruhs-1.jpeg', '/images/greenbrush/greenBrush-2.jpeg'],
    features: [
      {
        title: 'Dashboard for System Management',
        description: 'System info (size, panels, location), personalized cleaning recommendations, and annual revenue calculation from maintenance.',
      },
      {
        title: 'Digital Guidance',
        description: 'Step-by-step product usage instructions, tutorial videos and visual guides, and proper washing techniques.',
      },
      {
        title: 'Maintenance Journal & Tracking',
        description: 'Cleaning log documentation, automatic cleaning reminders, and performance-improvement tracking over time.',
      },
      {
        title: 'Store & System Integration',
        description: 'Direct links to packages and upgrades, easy purchase of additional kits, and CRM system integration.',
      },
    ],
    results: [
      { value: 'Up to 25%', label: 'Output Improvement', description: 'Regular cleaning improves panel efficiency and increases annual income.' },
      { value: '15–20 min', label: 'Average Cleaning Time', description: 'Quick and efficient cleaning for a standard home system.' },
      { value: '10+ Years', label: 'Market Experience', description: 'Rich experience in the solar energy field.' },
      { value: 'Significant', label: 'Cost Reduction', description: 'Self-cleaning reduces the need for external maintenance services.' },
    ],
  },
  {
    id: 'cobmindex',
    name: 'COBMINDEX',
    category: "Medical App for Crohn's Patients",
    tagline:
      "Research-based psychological tools that help Crohn's patients reduce stress and improve quality of life.",
    description:
      'A full native iOS & Android app developed with Ben-Gurion University and Soroka Medical Center, plus a content management system and research dashboard. Featured on Channel 13 news.',
    accent: 'magenta',
    tags: ['iOS & Android', 'Medical Grade', 'Research Backed'],
    metrics: [
      { value: '85%', label: 'Quality-of-life ↑' },
      { value: '70%', label: 'Symptom drop' },
    ],
    tech: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Push Notifications', 'Analytics', 'REST API'],
    image: '/images/cobmindex/ps-01.jpg',
    logo: '/images/cobmindex/Cobmindex-logo-01.svg',
    about: [
      'COBMINDEX is a groundbreaking medical application developed in collaboration with Ben-Gurion University and Soroka Medical Center. It is designed for Crohn’s disease patients and provides research-based psychological tools to reduce stress and improve quality of life.',
      "Crohn's disease is a chronic inflammatory disease of the digestive system, and research has shown a clear connection between stress levels and disease flares. The COBMINDEX method combines cognitive-behavioral techniques, mindfulness and coping strategies in a structured, accessible program.",
      'The application was developed in Hebrew and specifically adapted to the Crohn’s patient population in Israel, with emphasis on accessibility, simplicity and effectiveness in daily use.',
    ],
    gallery: [
      '/images/cobmindex/mockap-01.png',
      '/images/cobmindex/ps-01.jpg',
      '/images/cobmindex/ps-05.jpg',
      '/images/cobmindex/ps-09.jpg',
      '/images/cobmindex/ps-10.jpg',
      '/images/cobmindex/ps-11.jpg',
    ],
    features: [
      { title: 'Structured Learning Program', description: '4 consecutive learning units with gradual progression — each teaches a new skill for coping with stress.' },
      { title: 'Short Daily Practice', description: 'Just 10-minute exercises, once or twice a day, with full audio guidance.' },
      { title: 'Tracking & Progress', description: 'Track exercise completion, unit progress, and graphs that illustrate improvement over time.' },
      { title: 'Smart Reminders', description: 'Personalized notifications for practice, questionnaires and research progress updates.' },
    ],
    results: [
      { value: '85%', label: 'Quality of Life Improvement', description: 'Study participants reported significant improvement in quality of life.' },
      { value: '70%', label: 'Symptom Reduction', description: 'Significant decrease in inflammation symptoms and flares.' },
      { value: '10 min', label: 'Daily Practice', description: 'Short, simple practice once or twice a day.' },
      { value: '4 Weeks', label: 'Structured Program', description: '4 graded learning units with daily practice.' },
    ],
    video: { id: 'w7p3TSlD1nE', label: 'Channel 13 — News Report on COBMINDEX Research' },
  },
  {
    id: 'ismb',
    name: 'ISMB',
    category: 'Israeli Safety Officers Chamber',
    tagline:
      'A digital platform connecting, educating, and empowering workplace safety professionals across Israel.',
    description:
      'A comprehensive digital ecosystem: public site, member portal, event registration system, and content management platform — connecting safety officers nationwide.',
    accent: 'blue',
    tags: ['Professional Association', 'Digital Platform', 'Since 2020'],
    metrics: [
      { value: '1000+', label: 'Active members' },
      { value: '50+', label: 'Annual seminars' },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API', 'Responsive Design', 'Authentication', 'CMS'],
    image: '/images/ismb/ismb-portal-dashboard.jpeg',
    logo: '/images/ismb/ismb_logo.png',
    about: [
      'The Israeli Safety Officers Chamber (ISMB) is a registered non-profit established in February 2020 to address the absence of a professional, representative body for safety officers in Israel. It serves as the professional home for workplace safety officers across all industries.',
      'ISMB strengthens workplace safety culture in Israel by providing safety officers with professional resources, continuous education, legal support, and a strong community network — working closely with the Ministry of Labor and Safety Administration.',
      'With the motto "Together we will do and succeed", ISMB connects safety professionals, provides access to expert knowledge, organizes professional development seminars, and is a unified voice representing safety officers to regulatory bodies and employers.',
    ],
    gallery: [
      '/images/ismb/ismb-portal-dashboard.jpeg',
      '/images/ismb/ismb-portal-profile.jpeg',
      '/images/ismb/ismb-portal-resources.jpeg',
    ],
    features: [
      { title: 'Professional Development', description: 'Regular seminars, training days, and conferences featuring industry experts and regulatory updates.' },
      { title: 'Professional Community', description: 'Connect with fellow safety officers, share experiences, and build a supportive professional network.' },
      { title: 'Resources & Documentation', description: 'Access to professional articles, forms, templates, protocols, and regulatory guidelines.' },
      { title: 'Professional Support', description: 'Legal consultation, an expert advisory committee, and support for workplace safety challenges.' },
    ],
    results: [
      { value: '2020', label: 'Year Established', description: 'Founded to serve safety officers across Israel.' },
      { value: '1000+', label: 'Active Members', description: 'Safety officers registered and actively participating.' },
      { value: '50+', label: 'Annual Seminars', description: 'Professional development events and training days.' },
      { value: '24/7', label: 'Digital Access', description: 'Round-the-clock access to resources and systems.' },
    ],
  },
  {
    id: 'burns',
    name: 'BGU Burns Research',
    category: 'AI-Powered Burn Detection',
    tagline:
      'A secure data-collection platform that trains AI to identify and classify burns — helping doctors diagnose faster.',
    description:
      'A HIPAA-compliant platform at Ben-Gurion University Medical Center collecting censored, encrypted medical imagery to train machine-learning models for burn classification and clinical decision support.',
    accent: 'cyan',
    tags: ['AI & Machine Learning', 'Secure & Censored', 'Medical Grade'],
    metrics: [
      { value: '95%', label: 'AI accuracy' },
      { value: '5,000+', label: 'Images' },
    ],
    tech: ['Machine Learning', 'Computer Vision', 'TensorFlow', 'Python', 'React Native', 'Medical Imaging', 'HIPAA Compliance', 'Cloud Security'],
    image: '/images/burns/burns-screenshot-1.jpeg',
    logoText: 'Burns AI',
    about: [
      'The BGU Burns Research Project is a groundbreaking initiative at Ben-Gurion University Medical Center, focused on developing an AI-powered burn detection and classification system. It collects and analyzes burn-injury data to train algorithms that accurately identify and classify different burn types.',
      'Our team developed a secure data-collection platform that lets medical professionals document burn cases with high-quality, censored medical imagery. This data trains machine-learning models that assist doctors in making faster, more accurate burn diagnoses.',
      'The system prioritizes patient privacy and data security — all imagery is properly censored and encrypted. The dataset helps build AI models that distinguish between burn severities, types, and healing stages, improving diagnostic accuracy and patient outcomes.',
    ],
    gallery: [
      '/images/burns/burns-screenshot-1.jpeg',
      '/images/burns/burns-screenshot-2.jpeg',
      '/images/burns/burns-screenshot-3.jpeg',
      '/images/burns/burns-screenshot-4.jpeg',
      '/images/burns/burns-screenshot-5.jpeg',
    ],
    features: [
      { title: 'AI Burn Detection', description: 'Advanced machine-learning algorithms trained to identify and classify burn injuries from medical imagery.' },
      { title: 'Secure Data Collection', description: 'HIPAA-compliant platform with encrypted, censored medical imagery for safe data gathering.' },
      { title: 'Data Analytics & Classification', description: 'Comprehensive analysis of burn severity, type classification, and healing-progression tracking.' },
      { title: 'Medical Professional Support', description: 'Tools and interfaces designed for doctors to contribute data and validate AI predictions.' },
    ],
    results: [
      { value: '5,000+', label: 'Medical Images Collected', description: 'Censored and encrypted burn images collected for AI training.' },
      { value: '95%', label: 'AI Accuracy Rate', description: 'Model accuracy in burn classification and severity assessment.' },
      { value: '50+', label: 'Medical Professionals', description: 'Doctors and specialists contributing data and validating predictions.' },
      { value: '100%', label: 'Data Security', description: 'HIPAA-compliant platform with full encryption and patient privacy.' },
    ],
  },
  {
    id: 'pfabot',
    name: 'PFABot',
    category: 'Psychological First Aid Chatbot',
    tagline:
      'An AI chatbot delivering immediate psychological first aid to soldiers and anxiety sufferers, in three languages.',
    description:
      'Developed in 2024 by Dr. Talia Schwartz Tayri and Nurit Cohen Inger. Evidence-based crisis intervention through natural conversation — available 24/7 in Hebrew, English, and Arabic.',
    accent: 'violet',
    tags: ['3 Languages', '24/7', 'Crisis Intervention'],
    metrics: [
      { value: '1,000+', label: 'Users helped' },
      { value: '3', label: 'Languages' },
    ],
    tech: ['NLP', 'React Native', 'AI Chatbot', 'Multi-language Support', 'Psychology API', 'Crisis Intervention', 'Mobile App', 'Cloud Platform'],
    image: '/images/pfaBot/pfabot-1.jpeg',
    logo: '/images/pfaBot/LogoPFA.png',
    about: [
      'PFABot is a groundbreaking psychological first aid chatbot developed in 2024 by Dr. Talia Schwartz Tayri (MSW, LSW, PhD) and Nurit Cohen Inger (MSc, PhD candidate). It provides immediate psychological support to soldiers, anxiety sufferers, and individuals experiencing mental-health crises.',
      'The bot operates as a virtual psychological counselor, offering evidence-based psychological first aid through an intuitive chat interface. Available in three languages (Hebrew, English, and Arabic), it ensures accessible mental-health support for diverse populations — particularly military personnel and people dealing with anxiety disorders.',
      'Built on established psychological first aid protocols and powered by advanced natural language processing, PFABot provides immediate, anonymous, and confidential support — complementing traditional therapy while offering crucial immediate intervention during crises.',
    ],
    gallery: [
      '/images/pfaBot/pfabot-1.jpeg',
      '/images/pfaBot/pfabot-2.jpeg',
      '/images/pfaBot/pfabot-3.jpeg',
      '/images/pfaBot/pfabot-4.jpeg',
      '/images/pfaBot/pfabot-5.jpeg',
      '/images/pfaBot/pfabot-6.jpeg',
      '/images/pfaBot/pfabot-7.jpeg',
      '/images/pfaBot/pfabot-8.jpeg',
    ],
    features: [
      { title: 'AI-Powered Chat Support', description: 'Intelligent chatbot providing real-time psychological first aid through natural conversation.' },
      { title: 'Multi-Language Support', description: 'Available in Hebrew, English, and Arabic to serve diverse communities effectively.' },
      { title: 'Military-Focused Support', description: 'Specialized protocols and interventions designed for military personnel and veterans.' },
      { title: 'Crisis Intervention', description: 'Immediate response capabilities for anxiety attacks and acute psychological distress.' },
    ],
    results: [
      { value: '3', label: 'Languages Supported', description: 'Hebrew, English, and Arabic for comprehensive accessibility.' },
      { value: '24/7', label: 'Available Support', description: 'Round-the-clock psychological first aid assistance.' },
      { value: '1,000+', label: 'Users Helped', description: 'Soldiers and anxiety sufferers who received immediate support.' },
      { value: '2024', label: 'Development Year', description: 'Latest research and methodologies in psychological first aid.' },
    ],
    video: { id: 'Plps_lYIl3o', label: 'PFABot Demo — Psychological First Aid in Action' },
  },
]
