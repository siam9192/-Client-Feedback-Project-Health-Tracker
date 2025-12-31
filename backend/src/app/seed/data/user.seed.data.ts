import {
  ClientType,
  EmploymentType,
  Gender,
} from '../../modules/user/user.interface';

export const sampleAdmin = {
  name: 'Arafat Hasan Siam',
  profilePicture:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop',
  gender: Gender.MALE,
  email: 'admin@gmail.com',
  password: 'adm123',
};
export const sampleEmployees = [
  {
    name: 'Arif Chowdhury',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Full Stack Developer',
    employmentType: EmploymentType.FULLTIME,
    address: {
      street: 'Banani 11',
      city: 'Dhaka',
      country: 'Bangladesh',
      postcode: '1213',
    },
    contactInfo: { email: 'arif.c@company.com', phone: '01710000011' },
    email: 'arif.emp@gmail.com',
    password: 'emp123',
  },
  {
    name: 'Farhana Yasmin',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'UI/UX Designer',
    employmentType: EmploymentType.FULLTIME,
    address: { city: 'Sylhet', country: 'Bangladesh' },
    contactInfo: { email: 'farhana.y@company.com', phone: '01710000012' },
    email: 'farhana.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Kamrul Islam',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'QA Engineer',
    employmentType: EmploymentType.PARTTIME,
    address: { city: 'Rajshahi', country: 'Bangladesh' },
    contactInfo: { phone: '01710000013' },
    email: 'kamrul.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Maliha Tabassum',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Data Scientist',
    employmentType: EmploymentType.FULLTIME,
    address: { street: 'Dhanmondi 27', city: 'Dhaka', country: 'Bangladesh' },
    contactInfo: { email: 'maliha.t@company.com', phone: '01710000014' },
    email: 'maliha.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Sajid Hossain',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Security Specialist',
    employmentType: EmploymentType.CONTRACT,
    email: 'sajid.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Nadia Sultana',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Project Coordinator',
    employmentType: EmploymentType.FULLTIME,
    address: { city: 'Barisal', country: 'Bangladesh' },
    contactInfo: { email: 'nadia.s@company.com', phone: '01710000016' },
    email: 'nadia.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Imtiaz Ahmed',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Cloud Architect',
    employmentType: EmploymentType.FULLTIME,
    address: { city: 'Dhaka', country: 'Bangladesh' },
    contactInfo: { phone: '01710000017' },
    email: 'imtiaz.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Sumaiya Akter',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Frontend Developer',
    employmentType: EmploymentType.INTERN,
    email: 'sumaiya.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Rakibul Hasan',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'System Administrator',
    employmentType: EmploymentType.FULLTIME,
    address: { city: 'Comilla', country: 'Bangladesh' },
    contactInfo: { email: 'rakibul.h@company.com', phone: '01710000019' },
    email: 'rakibul.emp@company.com',
    password: 'emp123',
  },
  {
    name: 'Anika Tahsin',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&h=200&auto=format&fit=crop',
    position: 'Technical Writer',
    employmentType: EmploymentType.PARTTIME,
    address: { city: 'Mymensingh', country: 'Bangladesh' },
    contactInfo: { email: 'anika.t@company.com', phone: '01710000020' },
    email: 'anika.emp@company.com',
    password: 'emp123',
  },
];

export const sampleClients = [
  {
    name: 'Zubair Al-Mahmud',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop',
    clientType: ClientType.INDIVIDUAL,
    address: {
      street: 'House 45, Road 2',
      city: 'Sylhet',
      country: 'Bangladesh',
      postcode: '3100',
    },
    contactInfo: { phone: '01810000005' },
    email: 'zubair.m@example.com',
    password: 'cli123',
  },
  {
    name: 'Green Horizon Corp',
    profilePicture:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&h=400&auto=format&fit=crop',
    clientType: ClientType.COMPANY,
    address: {
      street: 'Gulshan 2, Avenue 4',
      city: 'Dhaka',
      country: 'Bangladesh',
      postcode: '1212',
    },
    contactInfo: { email: 'info@greenhorizon.com', phone: '01810000004' },
    email: 'gh.admin@example.com',
    password: 'cli123',
  },
  {
    name: 'BlueWave Solutions',
    profilePicture:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&h=400&auto=format&fit=crop',
    clientType: ClientType.COMPANY,
    address: {
      street: 'Station Road',
      city: 'Rajshahi',
      country: 'Bangladesh',
      postcode: '6000',
    },
    contactInfo: { email: 'support@bluewave.com', phone: '01810000006' },
    email: 'bw.billing@example.com',
    password: 'cli123',
  },
  {
    name: 'Sonia Akter',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&auto=format&fit=crop',
    clientType: ClientType.INDIVIDUAL,
    address: {
      street: 'East Nasirabad',
      city: 'Chittagong',
      country: 'Bangladesh',
      postcode: '4000',
    },
    email: 'sonia.a@example.com',
    password: 'cli123',
  },
  {
    name: 'Pioneer FinTech',
    profilePicture:
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=400&h=400&auto=format&fit=crop',
    clientType: ClientType.COMPANY,
    address: {
      street: 'Motijheel C/A',
      city: 'Dhaka',
      country: 'Bangladesh',
      postcode: '1000',
    },
    contactInfo: { email: 'admin@pioneerfin.tech', phone: '01810000008' },
    email: 'pioneer.client@example.com',
    password: 'cli123',
  },
  {
    name: 'Tanvir Chowdhury',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
    clientType: ClientType.INDIVIDUAL,
    address: {
      street: 'Kandirpar',
      city: 'Comilla',
      country: 'Bangladesh',
      postcode: '3500',
    },
    contactInfo: { phone: '01810000009' },
    email: 'tanvir.c@example.com',
    password: 'cli123',
  },
  {
    name: 'Stellar Marketing',
    profilePicture:
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400&h=400&auto=format&fit=crop',
    clientType: ClientType.COMPANY,
    address: {
      street: '76 Mujgunni Main Road',
      city: 'Khulna',
      country: 'Bangladesh',
      postcode: '9000',
    },
    contactInfo: { email: 'hello@stellar.com' },
    email: 'stellar.admin@example.com',
    password: 'cli123',
  },
  {
    name: 'Mehedi Hasan',
    gender: Gender.MALE,
    profilePicture:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    clientType: ClientType.INDIVIDUAL,
    address: {
      street: 'Farmgate',
      city: 'Dhaka',
      country: 'Bangladesh',
      postcode: '1215',
    },
    email: 'mehedi.h@example.com',
    password: 'cli123',
  },
  {
    name: 'Apex Retail Group',
    profilePicture:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&h=400&auto=format&fit=crop',
    clientType: ClientType.COMPANY,
    address: {
      street: 'Uttara Sector 4',
      city: 'Dhaka',
      country: 'Bangladesh',
      postcode: '1230',
    },
    contactInfo: { email: 'ops@apexretail.com', phone: '01810000012' },
    email: 'apex.client@example.com',
    password: 'cli123',
  },
  {
    name: 'Farida Yasmin',
    gender: Gender.FEMALE,
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    clientType: ClientType.INDIVIDUAL,
    address: {
      street: 'Sherpur Road',
      city: 'Bogura',
      country: 'Bangladesh',
      postcode: '5800',
    },
    email: 'farida.y@example.com',
    password: 'cli123',
  },
];
