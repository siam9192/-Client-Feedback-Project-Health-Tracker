const today = new Date();

const startDate = today.toDateString();

const endDateDate = new Date(today);
endDateDate.setMonth(endDateDate.getMonth() + 3);

const endDate = endDateDate.toDateString();

export const sampleProjects = [
  {
    name: 'Project Management Dashboard',
    description:
      'Building a web-based dashboard to track projects, tasks, and team performance.',
    startDate: startDate,
    endDate: endDate,
  },
  {
    name: 'Online Learning Platform',
    description:
      'Creating an e-learning platform with video courses, quizzes, and certifications.',
    startDate: startDate,
    endDate: endDate,
  },
  {
    name: 'Healthcare Appointment System',
    description:
      'A system for booking and managing doctor appointments online.',
    startDate: startDate,
    endDate: endDate,
  },
  {
    name: 'Social Media Scheduler',
    description:
      'A content-aware scheduler for managing posts across multiple social platforms.',
    startDate: startDate,
    endDate: endDate,
  },
  {
    name: 'Inventory Management System',
    description:
      'Automating inventory tracking, stock alerts, and supplier management.',
    startDate: startDate,
    endDate: endDate,
  },
  {
    name: 'Movie Ticket Booking App',
    description:
      'A full-stack application for booking movie tickets with seat selection.',
    startDate: startDate,
    endDate: '2026-01-31',
  },
  {
    name: 'Vehicle Rental Platform',
    description:
      'Developing a vehicle rental system with branch-wise role-based access.',
    startDate: startDate,
    endDate: '2026-04-01',
  },
  {
    name: 'Blog Sharing Website',
    description:
      'A platform for users to write, share, and interact with blog content.',
    startDate: startDate,
    endDate: '2025-12-31',
  },
  {
    name: 'AI Customer Support Chatbot',
    description:
      'Building an AI-powered chatbot to handle customer support queries.',
    startDate: startDate,
    endDate: '2026-03-18',
  },

  {
    name: 'E-Commerce Mobile App',
    description:
      'Developing a high-performance cross-platform mobile application for online retail.',
    startDate: '2025-10-01',
    endDate: '2026-03-30',
  },
  {
    name: 'AI Data Analytics Dashboard',
    description:
      'Building an internal tool for real-time visualization of sales and customer behavior.',
    startDate: '2025-11-15',
    endDate: '2026-05-15',
  },
  {
    name: 'Cybersecurity Audit - Phase 1',
    description:
      'Comprehensive security assessment and penetration testing for financial infrastructure.',
    startDate: '2025-12-01',
    endDate: '2026-01-15',
  },
  {
    name: 'Cloud Migration Project',
    description:
      'Transitioning legacy on-premise servers to a scalable AWS architecture.',
    startDate: '2025-08-10',
    endDate: '2026-04-30',
  },
  {
    name: 'Social Media API Integration',
    description:
      'Connecting enterprise CRM systems with major social media platforms for marketing automation.',
    startDate: '2025-12-10',
    endDate: '2026-02-20',
  },
  {
    name: 'Legacy System Migration',
    description:
      'Porting the monolithic architecture to a modern microservices-based system using Node.js.',
    startDate: '2025-09-01',
    endDate: '2026-06-15',
  },
  {
    name: 'SEO Optimization Sprint',
    description:
      'Improving organic search rankings and page load speeds across all landing pages.',
    startDate: '2025-12-15',
    endDate: '2026-01-15',
  },
  {
    name: 'Internal HR Portal',
    description:
      'Developing a self-service platform for employees to manage leaves and benefits.',
    startDate: '2025-11-20',
    endDate: '2026-05-20',
  },
  {
    name: 'Payment Gateway Integration',
    description:
      'Implementing Stripe and PayPal support for international customer transactions.',
    startDate: '2025-12-05',
    endDate: '2026-02-15',
  },
  {
    name: 'Mobile App Redesign',
    description:
      'Complete UI/UX overhaul of the existing iOS and Android applications.',
    startDate: '2025-10-15',
    endDate: '2026-01-30',
  },
  {
    name: 'AI Chatbot Implementation',
    description:
      'Integrating a GPT-based customer support bot to handle level 1 queries.',
    startDate: '2025-11-01',
    endDate: '2026-04-15',
  },
  {
    name: 'Infrastructure Audit',
    description:
      'A deep dive into server security, scalability, and cost optimization for AWS.',
    startDate: '2025-12-20',
    endDate: '2026-02-10',
  },
  {
    name: 'Market Expansion Research',
    description:
      'Analyzing technical requirements for launching localized versions in Europe.',
    startDate: '2025-12-01',
    endDate: '2026-03-01',
  },
  {
    name: 'API Documentation Docs',
    description:
      'Building a comprehensive Swagger/OpenAPI documentation site for external developers.',
    startDate: '2025-11-10',
    endDate: '2026-01-20',
  },
  {
    name: 'Database Sharding Project',
    description:
      'Splitting the primary database into shards to handle increased traffic volume.',
    startDate: '2025-10-01',
    endDate: '2026-02-28',
  },
];
