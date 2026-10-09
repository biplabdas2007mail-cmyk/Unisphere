export type LanguageMode = 'odia_mix' | 'en' | 'odia' | 'hi';

export interface Translations {
  campusTitle: string;
  campusSubtitle: string;
  ps07Badge: string;
  languageName: string;
  odishaBadge: string;
  
  // Navigation
  dashboardNav: string;
  profileNav: string;
  adminNav: string;
  studentNav: string;
  switchRoleBtn: string;
  logoutBtn: string;
  campusAlerts: string;
  demoLogin: string;
  
  // Student Tabs
  tabOverview: string;
  tabGrievance: string;
  tabOutpass: string;
  tabFacilities: string;
  tabTimetable: string;
  tabMess: string;

  // Student Dashboard
  studentHubHeader: string;
  studentHubSubheader: string;
  activeResident: string;
  quickActions: string;
  newGrievanceBtn: string;
  applyOutpassBtn: string;
  bookFacilityBtn: string;
  viewMessMenuBtn: string;
  
  // Status Labels
  statusApproved: string;
  statusPending: string;
  statusResolved: string;
  statusInProgress: string;
  statusRejected: string;
  statusConfirmed: string;
  
  // Profile
  profileTitle: string;
  profileSubtitle: string;
  tabAllProfile: string;
  tabAccountDetails: string;
  tabPassHistory: string;
  tabVenueBookings: string;
  editProfileBtn: string;
  showGateQrBtn: string;
  venueVoucherBtn: string;
  saveProfileBtn: string;
  cancelBtn: string;
  
  // Mess & Odisha Special
  messHeader: string;
  odishaSpecialNote: string;
  breakfastTitle: string;
  lunchTitle: string;
  snacksTitle: string;
  dinnerTitle: string;
  crowdLevel: string;
  
  // Login Page
  loginHeader: string;
  loginSubheader: string;
  studentRoleSelect: string;
  adminRoleSelect: string;
  idOrEmailLabel: string;
  passwordLabel: string;
  rememberMeLabel: string;
  signInBtn: string;
  quickDemoStudent: string;
  quickDemoAdmin: string;
  odishaUniversityBadge: string;
  personalDetailsSection: string;
  personalDetailsDesc: string;
  instituteLabel: string;
  universityLabel: string;
  yourNameLabel: string;
  yourNamePlaceholder: string;
  departmentLabel: string;
  phoneLabel: string;
  hostelRoomLabel: string;
  designationLabel: string;
  liveIdPreview: string;
  pureEnglishLabel: string;
  pureHindiLabel: string;
  pureOdiaLabel: string;
  bilingualMixLabel: string;
  welcomeGreeting: string;
  changePasswordBtn: string;
  accountSecurity: string;
  accountSecurityDesc: string;
}

export const TRANSLATIONS: Record<LanguageMode, Translations> = {
  odia_mix: {
    campusTitle: 'UniSphere ଓଡ଼ିଶା',
    campusSubtitle: 'Smart Campus OS • Odisha Hub',
    ps07Badge: 'ସ୍ମାର୍ଟ କ୍ୟାମ୍ପସ OS',
    languageName: 'ଓଡ଼ିଆ + English',
    odishaBadge: 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ (Odisha)',
    
    // Navigation
    dashboardNav: 'କ୍ୟାମ୍ପସ Dashboard',
    profileNav: 'ମୋର Profile ଓ Pass',
    adminNav: 'Admin ପ୍ରଶାସନ',
    studentNav: 'Student ପୋର୍ଟାଲ',
    switchRoleBtn: 'Switch କରନ୍ତୁ',
    logoutBtn: 'Sign Out / ଲଗଆଉଟ୍',
    campusAlerts: 'Campus Alerts / ସୂଚନା',
    demoLogin: 'Quick Demo ଲଗଇନ୍',
    
    // Student Tabs
    tabOverview: 'ସାରାଂଶ (Overview)',
    tabGrievance: 'Grievance ସମସ୍ୟା ଡେସ୍କ',
    tabOutpass: 'Hostel ଗେଟ୍ ପାସ୍ (Outpass)',
    tabFacilities: 'Facility / ଲ୍ୟାବ୍ ବୁକିଂ',
    tabTimetable: 'Class ସମୟସାରଣୀ (Routine)',
    tabMess: 'Mess & ଖାଇବା (Dining)',

    // Student Dashboard
    studentHubHeader: 'Student Command Hub (ଛାତ୍ରଛାତ୍ରୀ ପୋର୍ଟାଲ)',
    studentHubSubheader: 'ସ୍ୱାଗତ (Welcome back), ଆପଣଙ୍କ ଦୈନନ୍ଦିନ କ୍ୟାମ୍ପସ ସେବା ଏଠାରେ ଉପଲବ୍ଧ',
    activeResident: 'Active Resident (ବାସିନ୍ଦା)',
    quickActions: 'ଶୀଘ୍ର କାର୍ଯ୍ୟ (Quick Actions)',
    newGrievanceBtn: '+ ନୂଆ Complaint ଫାଇଲ୍ କରନ୍ତୁ',
    applyOutpassBtn: '+ Gate Pass ଆବେଦନ',
    bookFacilityBtn: '+ Lab / Hall ବୁକ୍ କରନ୍ତୁ',
    viewMessMenuBtn: 'ଆଜିର Mess ମେନୁ ଦେଖନ୍ତୁ',
    
    // Status Labels
    statusApproved: 'ଅନୁମୋଦିତ (Approved)',
    statusPending: 'ବିଚାରାଧୀନ (Pending)',
    statusResolved: 'ସମାଧାନ ହୋଇଛି (Resolved)',
    statusInProgress: 'କାମ ଚାଲିଛି (In Progress)',
    statusRejected: 'ଖାରଜ (Rejected)',
    statusConfirmed: 'କନଫର୍ମ (Confirmed)',
    
    // Profile
    profileTitle: 'User Profile ଓ Pass ଇତିହାସ',
    profileSubtitle: 'ଆପଣଙ୍କର ବିଶ୍ୱବିଦ୍ୟାଳୟ ଆକାଉଣ୍ଟ ଏବଂ ଗେଟ୍ ପାସ୍ ରେକର୍ଡ',
    tabAllProfile: 'ସମସ୍ତ Overview',
    tabAccountDetails: 'ଖାତା ବିବରଣୀ (Account)',
    tabPassHistory: 'Gate Pass ଇତିହାସ',
    tabVenueBookings: 'Lab ଓ Hall ବୁକିଂ',
    editProfileBtn: 'Account Details Edit କରନ୍ତୁ',
    showGateQrBtn: 'Gate QR Pass ଦେଖାନ୍ତୁ',
    venueVoucherBtn: 'Venue Access Voucher',
    saveProfileBtn: 'Save କରନ୍ତୁ',
    cancelBtn: 'Cancel',
    
    // Mess & Odisha Special
    messHeader: 'ଛାତ୍ରାବାସ Mess & ଓଡ଼ିଆ ସ୍ପେଶାଲ ଭୋଜନ',
    odishaSpecialNote: 'ଓଡ଼ିଶା ଡାଲମା, ଛେନାପୋଡ଼, ପଖାଳ ଓ ସନ୍ତୁଳା ଉପଲବ୍ଧ',
    breakfastTitle: 'ଜଳଖିଆ (Breakfast)',
    lunchTitle: 'ମଧ୍ୟାହ୍ନ ଭୋଜନ (Lunch)',
    snacksTitle: 'ସନ୍ଧ୍ୟା ଜଳଖିଆ (Snacks & Tea)',
    dinnerTitle: 'ରାତ୍ରୀ ଭୋଜନ (Dinner)',
    crowdLevel: 'ଭିଡ଼ ଅବସ୍ଥା (Crowd)',
    
    // Login Page
    loginHeader: 'UniSphere ଓଡ଼ିଶା କ୍ୟାମ୍ପସ ପୋର୍ଟାଲ',
    loginSubheader: 'ଛାତ୍ରଛାତ୍ରୀ ଏବଂ ପ୍ରଶାସକଙ୍କ ପାଇଁ ଏକକ ସୁବିଧା ସିଷ୍ଟମ୍',
    studentRoleSelect: 'Student (ଛାତ୍ରଛାତ୍ରୀ ପ୍ରବେଶ)',
    adminRoleSelect: 'Warden & Dean (ପ୍ରଶାସନ)',
    idOrEmailLabel: 'Roll No / ଇନଷ୍ଟିଚ୍ୟୁଟ୍ ଇମେଲ୍',
    passwordLabel: 'ପାସୱାର୍ଡ (Password)',
    rememberMeLabel: 'Remember me on this device',
    signInBtn: 'Campus Hub ରେ Login କରନ୍ତୁ',
    quickDemoStudent: 'Student ୧-କ୍ଲିକ୍ ଲଗଇନ୍',
    quickDemoAdmin: 'Admin ୧-କ୍ଲିକ୍ ଲଗଇନ୍',
    odishaUniversityBadge: '🏛️ ଓଡ଼ିଶା କ୍ୟାମ୍ପସ ନଲେଜ୍ ସେଣ୍ଟର (Bhubaneswar Hub)',
    personalDetailsSection: 'ବ୍ୟକ୍ତିଗତ ବିବରଣୀ (Personal Details)',
    personalDetailsDesc: 'Campus ID ଓ ପୋର୍ଟାଲ୍ ପାଇଁ ଆପଣଙ୍କ ନାମ ଏବଂ ବିବରଣୀ ଏଠାରେ ଯୋଡ଼ନ୍ତୁ',
    instituteLabel: 'College / Institute Name (କଲେଜ / ଅନୁଷ୍ଠାନ)',
    universityLabel: 'Affiliating University (ବିଶ୍ୱବିଦ୍ୟାଳୟ)',
    yourNameLabel: 'Your Name (ଆପଣଙ୍କ ନାମ)',
    yourNamePlaceholder: 'ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ (e.g. Biplab Das)',
    departmentLabel: 'Department / ବିଭାଗ',
    phoneLabel: 'Phone / ମୋବାଇଲ୍ ନମ୍ବର',
    hostelRoomLabel: 'Hostel Block & Room No.',
    designationLabel: 'ପଦବୀ (Designation)',
    liveIdPreview: 'Live ID Card ପ୍ରିଭ୍ୟୁ',
    pureEnglishLabel: 'Pure English',
    pureHindiLabel: 'ଶୁଦ୍ଧ ହିନ୍ଦୀ (Pure Hindi)',
    pureOdiaLabel: 'ନିଖୁଣ ଓଡ଼ିଆ (Pure Odia)',
    bilingualMixLabel: 'ଓଡ଼ିଆ + Eng (Campus Mix)',
    welcomeGreeting: 'ସ୍ୱାଗତମ୍ (Welcome)',
    changePasswordBtn: 'Password ବଦଳାନ୍ତୁ',
    accountSecurity: 'Security & Password ପରିଚାଳନା',
    accountSecurityDesc: 'ନିଜର କ୍ୟାମ୍ପସ ପାସୱାର୍ଡ ବଦଳାନ୍ତୁ କିମ୍ବା 2FA ସୁରକ୍ଷା କୋଡ୍ ସେଟ୍ କରନ୍ତୁ'
  },
  
  en: {
    campusTitle: 'UniSphere Campus',
    campusSubtitle: 'Smart Campus Operating System • Odisha',
    ps07Badge: 'Smart Campus OS',
    languageName: 'Pure English',
    odishaBadge: 'Odisha Campus',
    
    // Navigation
    dashboardNav: 'Campus Dashboard',
    profileNav: 'My Profile & Passes',
    adminNav: 'Admin Command',
    studentNav: 'Student Portal',
    switchRoleBtn: 'Switch to',
    logoutBtn: 'Sign Out',
    campusAlerts: 'Campus Alerts',
    demoLogin: 'Quick Demo Login',
    
    // Student Tabs
    tabOverview: 'Overview',
    tabGrievance: 'Grievance Helpdesk',
    tabOutpass: 'Hostel Outpass',
    tabFacilities: 'Facility Booking',
    tabTimetable: 'Time Table',
    tabMess: 'Mess & Dining',

    // Student Dashboard
    studentHubHeader: 'Student Command Hub',
    studentHubSubheader: 'Welcome back, manage your daily residential and academic life effortlessly.',
    activeResident: 'Active Resident',
    quickActions: 'Quick Actions',
    newGrievanceBtn: '+ Report Issue',
    applyOutpassBtn: '+ Apply Outpass',
    bookFacilityBtn: '+ Reserve Facility',
    viewMessMenuBtn: 'View Mess Menu',
    
    // Status Labels
    statusApproved: 'Approved',
    statusPending: 'Pending',
    statusResolved: 'Resolved',
    statusInProgress: 'In Progress',
    statusRejected: 'Rejected',
    statusConfirmed: 'Confirmed',
    
    // Profile
    profileTitle: 'User Profile & Activity History',
    profileSubtitle: 'Official campus credentials, residential records, and verified exit passes',
    tabAllProfile: 'All Overview',
    tabAccountDetails: 'Account & Identity',
    tabPassHistory: 'Gate Pass History',
    tabVenueBookings: 'Facility Bookings',
    editProfileBtn: 'Edit Account Details',
    showGateQrBtn: 'Show Gate QR Pass',
    venueVoucherBtn: 'Venue Access Voucher',
    saveProfileBtn: 'Save Profile Updates',
    cancelBtn: 'Cancel',
    
    // Mess & Odisha Special
    messHeader: 'Hostel Mess & Dining Schedule',
    odishaSpecialNote: 'Featuring authentic Odisha delicacies (Dalma, Chenna Poda & Pakhala specials)',
    breakfastTitle: 'Breakfast',
    lunchTitle: 'Lunch',
    snacksTitle: 'Snacks & Tea',
    dinnerTitle: 'Dinner',
    crowdLevel: 'Crowd Density',
    
    // Login Page
    loginHeader: 'UniSphere Odisha Campus Portal',
    loginSubheader: 'Integrated digital living platform for students and administration',
    studentRoleSelect: 'Student Portal Login',
    adminRoleSelect: 'Warden & Dean Login',
    idOrEmailLabel: 'Roll Number or Campus Email',
    passwordLabel: 'Password',
    rememberMeLabel: 'Remember me on this device',
    signInBtn: 'Sign In to Campus Hub',
    quickDemoStudent: '1-Click Student Demo',
    quickDemoAdmin: '1-Click Admin Demo',
    odishaUniversityBadge: '🏛️ Odisha University Campus Knowledge Hub',
    personalDetailsSection: 'Personal Details & Identity',
    personalDetailsDesc: 'Add your name and campus details to personalize your portal & ID card',
    instituteLabel: 'College / Institute Name (Odisha)',
    universityLabel: 'Affiliating University (Odisha)',
    yourNameLabel: 'Your Name',
    yourNamePlaceholder: 'Enter your full name (e.g. Biplab Das)',
    departmentLabel: 'Department / Branch',
    phoneLabel: 'Phone Number',
    hostelRoomLabel: 'Hostel Block & Room No.',
    designationLabel: 'Designation / Title',
    liveIdPreview: 'Live Digital ID Card Preview',
    pureEnglishLabel: 'Pure English',
    pureHindiLabel: 'Pure Hindi (शुद्ध हिन्दी)',
    pureOdiaLabel: 'Pure Odia (ନିଖୁଣ ଓଡ଼ିଆ)',
    bilingualMixLabel: 'Bilingual Campus Mix (ଓଡ଼ିଆ + Eng)',
    welcomeGreeting: 'Welcome back',
    changePasswordBtn: 'Change Password',
    accountSecurity: 'Account Security & Password',
    accountSecurityDesc: 'Protected with 256-bit cryptographic hashing • Multi-factor authentication ready'
  },

  odia: {
    campusTitle: 'ୟୁନିସ୍ପିଅର ଓଡ଼ିଶା',
    campusSubtitle: 'ସ୍ମାର୍ଟ କ୍ୟାମ୍ପସ ଅପରେଟିଂ ସିଷ୍ଟମ୍ • ଓଡ଼ିଶା',
    ps07Badge: 'ସ୍ମାର୍ଟ କ୍ୟାମ୍ପସ ଓଏସ',
    languageName: 'ନିଖୁଣ ଓଡ଼ିଆ (Pure Odia)',
    odishaBadge: 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ',
    
    // Navigation
    dashboardNav: 'କ୍ୟାମ୍ପସ ଡ୍ୟାସବୋର୍ଡ',
    profileNav: 'ମୋର ପ୍ରୋଫାଇଲ୍ ଓ ପାସ୍',
    adminNav: 'ପ୍ରଶାସନିକ କମାଣ୍ଡ',
    studentNav: 'ଛାତ୍ରଛାତ୍ରୀ ପୋର୍ଟାଲ',
    switchRoleBtn: 'ବଦଳାନ୍ତୁ',
    logoutBtn: 'ଲଗଆଉଟ୍ କରନ୍ତୁ',
    campusAlerts: 'ଜରୁରୀ ସୂଚନା',
    demoLogin: 'ତ୍ୱରିତ ଡେମୋ ଲଗଇନ୍',
    
    // Student Tabs
    tabOverview: 'ସମୀକ୍ଷା',
    tabGrievance: 'ଅଭିଯୋଗ ସମାଧାନ ଡେସ୍କ',
    tabOutpass: 'ଛାତ୍ରାବାସ ଗେଟ୍ ପାସ୍',
    tabFacilities: 'କ୍ୟାମ୍ପସ ସୁବିଧା ଆରକ୍ଷଣ',
    tabTimetable: 'କ୍ଲାସ୍ ସମୟସାରଣୀ',
    tabMess: 'ଛାତ୍ରାବାସ ମେସ୍ ଓ ଭୋଜନ',

    // Student Dashboard
    studentHubHeader: 'ଛାତ୍ରଛାତ୍ରୀ କମାଣ୍ଡ ହବ୍',
    studentHubSubheader: 'ସ୍ୱାଗତ ଜଣାଉଛୁ, ଆପଣଙ୍କ ଦୈନନ୍ଦିନ କ୍ୟାମ୍ପସ ଜୀବନ ଏଠାରେ ସରଳ କରନ୍ତୁ।',
    activeResident: 'ସକ୍ରିୟ ଛାତ୍ରାବାସ ବାସିନ୍ଦା',
    quickActions: 'ତ୍ୱରିତ ପଦକ୍ଷେପ',
    newGrievanceBtn: '+ ନୂଆ ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',
    applyOutpassBtn: '+ ଗେଟ୍ ପାସ୍ ଆବେଦନ',
    bookFacilityBtn: '+ ଲ୍ୟାବ୍ / ହଲ୍ ଆରକ୍ଷଣ',
    viewMessMenuBtn: 'ଆଜିର ମେସ୍ ମେନୁ ଦେଖନ୍ତୁ',
    
    // Status Labels
    statusApproved: 'ଅନୁମୋଦିତ',
    statusPending: 'ବିଚାରାଧୀନ',
    statusResolved: 'ସମାଧାନ ହୋଇଛି',
    statusInProgress: 'କାର୍ଯ୍ୟ ଚାଲିଛି',
    statusRejected: 'ଖାରଜ କରାଯାଇଛି',
    statusConfirmed: 'ନିଶ୍ଚିତ ହୋଇଛି',
    
    // Profile
    profileTitle: 'ପ୍ରୋଫାଇଲ୍ ଏବଂ ଗେଟ୍ ପାସ୍ ଇତିହାସ',
    profileSubtitle: 'ଅଫିସିଆଲ୍ ପରିଚୟ ପତ୍ର, ରୁମ୍ ନମ୍ବର ଏବଂ କ୍ୟାମ୍ପସ ପ୍ରବେଶ ଅନୁମୋଦନ',
    tabAllProfile: 'ସମସ୍ତ ବିବରଣୀ',
    tabAccountDetails: 'ଖାତା ପରିଚୟ',
    tabPassHistory: 'ଗେଟ୍ ପାସ୍ ରେକର୍ଡ',
    tabVenueBookings: 'କ୍ୟାମ୍ପସ ସ୍ଥାନ ବୁକିଂ',
    editProfileBtn: 'ଖାତା ବିବରଣୀ ସଂଶୋଧନ କରନ୍ତୁ',
    showGateQrBtn: 'ଗେଟ୍ କ୍ୟୁଆର୍ କୋଡ୍ ଦେଖାନ୍ତୁ',
    venueVoucherBtn: 'ଭେନ୍ୟୁ ପ୍ରବେଶ ପ୍ରମାଣପତ୍ର',
    saveProfileBtn: 'ସଂରକ୍ଷଣ କରନ୍ତୁ',
    cancelBtn: 'ବାତିଲ କରନ୍ତୁ',
    
    // Mess & Odisha Special
    messHeader: 'ଛାତ୍ରାବାସ ମେସ୍ ଏବଂ ଭୋଜନ ସମୟସୂଚୀ',
    odishaSpecialNote: 'ଓଡ଼ିଆ ସ୍ୱତନ୍ତ୍ର ବ୍ୟଞ୍ଜନ: ଡାଲମା, ଛେନାପୋଡ଼, ପଖାଳ ଭାତ ଓ ବଡ଼ି ଚୁରା',
    breakfastTitle: 'ପ୍ରାତଃରାଶ (ଜଳଖିଆ)',
    lunchTitle: 'ମଧ୍ୟାହ୍ନ ଭୋଜନ',
    snacksTitle: 'ସନ୍ଧ୍ୟା ଜଳଖିଆ ଓ ଚାହା',
    dinnerTitle: 'ରାତ୍ରୀ ଭୋଜନ',
    crowdLevel: 'ଭିଡ଼ ପରିମାଣ',
    
    // Login Page
    loginHeader: 'ୟୁନିସ୍ପିଅର ଓଡ଼ିଶା କ୍ୟାମ୍ପସ ପୋର୍ଟାଲ',
    loginSubheader: 'ଛାତ୍ରଛାତ୍ରୀ ଏବଂ ପ୍ରଶାସକଙ୍କ ପାଇଁ ଡିଜିଟାଲ୍ କ୍ୟାମ୍ପସ ମଞ୍ଚ',
    studentRoleSelect: 'ଛାତ୍ରଛାତ୍ରୀ ପ୍ରବେଶ',
    adminRoleSelect: 'ୱାର୍ଡେନ୍ ଏବଂ ଡିନ୍ ପ୍ରବେଶ',
    idOrEmailLabel: 'ରୋଲ୍ ନମ୍ବର କିମ୍ବା ଅଫିସିଆଲ୍ ଇମେଲ୍',
    passwordLabel: 'ସୁରକ୍ଷା ପାସୱାର୍ଡ',
    rememberMeLabel: 'ଏହି ଡିଭାଇସରେ ମନେ ରଖନ୍ତୁ',
    signInBtn: 'କ୍ୟାମ୍ପସ ପୋର୍ଟାଲରେ ପ୍ରବେଶ କରନ୍ତୁ',
    quickDemoStudent: 'ଛାତ୍ରଛାତ୍ରୀ ୧-କ୍ଲିକ୍ ଲଗଇନ୍',
    quickDemoAdmin: 'ପ୍ରଶାସନ ୧-କ୍ଲିକ୍ ଲଗଇନ୍',
    odishaUniversityBadge: '🏛️ ଓଡ଼ିଶା ବିଶ୍ୱବିଦ୍ୟାଳୟ ଜ୍ଞାନ କେନ୍ଦ୍ର',
    personalDetailsSection: 'ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଓ ପରିଚୟ',
    personalDetailsDesc: 'କ୍ୟାମ୍ପସ ପୋର୍ଟାଲ୍ ଓ ଆଇଡି କାର୍ଡ ପାଇଁ ଆପଣଙ୍କ ନାମ ଏବଂ ବିବରଣୀ ପ୍ରବେଶ କରନ୍ତୁ',
    instituteLabel: 'କଲେଜ ଓ ଶିକ୍ଷାନୁଷ୍ଠାନର ନାମ (ଓଡ଼ିଶା)',
    universityLabel: 'ସମ୍ବନ୍ଧିତ ବିଶ୍ୱବିଦ୍ୟାଳୟ (ଓଡ଼ିଶା)',
    yourNameLabel: 'ଆପଣଙ୍କ ନାମ',
    yourNamePlaceholder: 'ଆପଣଙ୍କ ପୂରା ନାମ ଲେଖନ୍ତୁ (ଉଦା. ବିପ୍ଳବ ଦାସ)',
    departmentLabel: 'ବିଭାଗ / ଶାଖା',
    phoneLabel: 'ମୋବାଇଲ୍ ନମ୍ବର',
    hostelRoomLabel: 'ହଷ୍ଟେଲ୍ ବ୍ଲକ୍ ଓ ରୁମ୍ ନଂ',
    designationLabel: 'ପଦବୀ',
    liveIdPreview: 'ଡିଜିଟାଲ୍ ପରିଚୟ ପତ୍ର ପ୍ରିଭ୍ୟୁ',
    pureEnglishLabel: 'Pure English',
    pureHindiLabel: 'ଶୁଦ୍ଧ ହିନ୍ଦୀ (Pure Hindi)',
    pureOdiaLabel: 'ନିଖୁଣ ଓଡ଼ିଆ (Pure Odia)',
    bilingualMixLabel: 'ଓଡ଼ିଆ + Eng (କ୍ୟାମ୍ପସ ମିକ୍ସ)',
    welcomeGreeting: 'ସ୍ୱାଗତମ୍',
    changePasswordBtn: 'ପାସୱାର୍ଡ ବଦଳାନ୍ତୁ',
    accountSecurity: 'ଆକାଉଣ୍ଟ ସୁରକ୍ଷା ଓ ପାସୱାର୍ଡ',
    accountSecurityDesc: '୨୫୬-ବିଟ୍ ଏନକ୍ରିପସନ୍ ଏବଂ ଦ୍ୱିସ୍ତରୀୟ ଯାଞ୍ଚ (2FA) ଦ୍ୱାରା ସୁରକ୍ଷିତ'
  },

  hi: {
    campusTitle: 'यूनिस्फीयर ओडिशा',
    campusSubtitle: 'स्मार्ट कैंपस ऑपरेटिंग सिस्टम • ओडिशा हब',
    ps07Badge: 'स्मार्ट कैंपस OS',
    languageName: 'शुद्ध हिन्दी (Pure Hindi)',
    odishaBadge: 'ओडिशा कैंपस',
    
    // Navigation
    dashboardNav: 'कैंपस डैशबोर्ड',
    profileNav: 'मेरी प्रोफ़ाइल एवं पास',
    adminNav: 'प्रशासनिक नियंत्रण',
    studentNav: 'विद्यार्थी पोर्टल',
    switchRoleBtn: 'रोल बदलें',
    logoutBtn: 'लॉग आउट',
    campusAlerts: 'कैंपस आवश्यक सूचनाएं',
    demoLogin: 'त्वरित डेमो प्रवेश',
    
    // Student Tabs
    tabOverview: 'समग्र अवलोकन',
    tabGrievance: 'शिकायत निवारण हेल्पडेस्क',
    tabOutpass: 'छात्रावास गेट पास',
    tabFacilities: 'सुविधा एवं लैब आरक्षण',
    tabTimetable: 'कक्षा समय-सारणी',
    tabMess: 'छात्रावास भोजनालय एवं मेस',

    // Student Dashboard
    studentHubHeader: 'विद्यार्थी नियंत्रण केंद्र',
    studentHubSubheader: 'हार्दिक स्वागत है! आपके दैनिक शैक्षणिक एवं आवासीय कार्य यहाँ उपलब्ध हैं।',
    activeResident: 'सक्रिय छात्रावास निवासी',
    quickActions: 'त्वरित कार्य',
    newGrievanceBtn: '+ नई शिकायत दर्ज करें',
    applyOutpassBtn: '+ गेट पास हेतु आवेदन',
    bookFacilityBtn: '+ लैब / हॉल आरक्षित करें',
    viewMessMenuBtn: 'आज का भोजन मेनू देखें',
    
    // Status Labels
    statusApproved: 'स्वीकृत',
    statusPending: 'विचाराधीन',
    statusResolved: 'समाधानित',
    statusInProgress: 'प्रगति पर',
    statusRejected: 'अस्वीकृत',
    statusConfirmed: 'पुष्टीकृत',
    
    // Profile
    profileTitle: 'उपयोगकर्ता प्रोफ़ाइल एवं पास अभिलेख',
    profileSubtitle: 'आधिकारिक विश्वविद्यालय साख, आवासीय विवरण और वैध गेट पास इतिहास',
    tabAllProfile: 'समग्र अवलोकन',
    tabAccountDetails: 'खाता विवरण',
    tabPassHistory: 'गेट पास इतिहास',
    tabVenueBookings: 'स्थान आरक्षण',
    editProfileBtn: 'खाता विवरण संपादित करें',
    showGateQrBtn: 'गेट क्यूआर पास दिखाएं',
    venueVoucherBtn: 'स्थान प्रवेश वाउचर',
    saveProfileBtn: 'अपडेट सहेजें',
    cancelBtn: 'रद्द करें',
    
    // Mess & Odisha Special
    messHeader: 'छात्रावास भोजनालय एवं भोजन कार्यक्रम',
    odishaSpecialNote: 'प्रामाणिक ओडिशा व्यंजन (दालमा, छेनापोड़, पखाल भात और संतुला)',
    breakfastTitle: 'प्रातःकालीन नाश्ता',
    lunchTitle: 'मध्याह्न भोजन',
    snacksTitle: 'सायंकालीन अल्पाहार एवं चाय',
    dinnerTitle: 'रात्रिभोज',
    crowdLevel: 'उपस्थिति घनत्व / भीड़',
    
    // Login Page
    loginHeader: 'यूनिस्फीयर ओडिशा कैंपस पोर्टल',
    loginSubheader: 'छात्रों और प्रशासन के लिए एकीकृत स्मार्ट डिजिटल मंच',
    studentRoleSelect: 'विद्यार्थी पोर्टल प्रवेश',
    adminRoleSelect: 'वार्डन एवं डीन प्रवेश',
    idOrEmailLabel: 'रोल नंबर या आधिकारिक कैंपस ईमेल',
    passwordLabel: 'सुरक्षा पासवर्ड',
    rememberMeLabel: 'इस डिवाइस पर मुझे याद रखें',
    signInBtn: 'कैंपस हब में प्रवेश करें',
    quickDemoStudent: 'विद्यार्थी 1-क्लिक प्रवेश',
    quickDemoAdmin: 'प्रशासक 1-क्लिक प्रवेश',
    odishaUniversityBadge: '🏛️ ओडिशा विश्वविद्यालय ज्ञान केंद्र',
    personalDetailsSection: 'व्यक्तिगत विवरण एवं पहचान',
    personalDetailsDesc: 'कैंपस पोर्टल और डिजिटल पहचान पत्र के लिए अपना नाम और विवरण जोड़ें',
    instituteLabel: 'कॉलेज एवं संस्थान का नाम (ओडिशा)',
    universityLabel: 'संबद्ध विश्वविद्यालय (ओडिशा)',
    yourNameLabel: 'आपका नाम',
    yourNamePlaceholder: 'अपना पूरा नाम दर्ज करें (उदा. बिप्लब दास)',
    departmentLabel: 'विभाग / शैक्षणिक शाखा',
    phoneLabel: 'संपर्क दूरभाष / मोबाइल',
    hostelRoomLabel: 'छात्रावास भवन एवं कमरा नंबर',
    designationLabel: 'आधिकारिक पदनाम',
    liveIdPreview: 'सजीव डिजिटल पहचान पत्र पूर्वावलोकन',
    pureEnglishLabel: 'Pure English',
    pureHindiLabel: 'शुद्ध हिन्दी (Pure Hindi)',
    pureOdiaLabel: 'ନିଖୁଣ ଓଡ଼ିଆ (Pure Odia)',
    bilingualMixLabel: 'द्विभाषी कैंपस मिक्स (ଓଡ଼ିଆ + Eng)',
    welcomeGreeting: 'स्वागत है',
    changePasswordBtn: 'पासवर्ड बदलें',
    accountSecurity: 'खाता सुरक्षा एवं पासवर्ड प्रबंधन',
    accountSecurityDesc: '256-बिट क्रिप्टोग्राफिक हैशिंग द्वारा सुरक्षित • 2FA सक्रिय'
  }
};
