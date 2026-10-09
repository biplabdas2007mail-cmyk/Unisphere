export interface OdishaInstitute {
  id: string;
  name: string;
  shortName: string;
  category: 'Premier' | 'State University' | 'Govt Engineering' | 'Private University' | 'Engineering College' | 'Degree College' | 'Medical College';
  district: string;
  city: string;
  universityAffiliation: string;
  established?: number;
}

export const ODISHA_UNIVERSITIES = [
  'Biju Patnaik University of Technology (BPUT Rourkela)',
  'Utkal University (Vani Vihar, Bhubaneswar)',
  'Sambalpur University (Jyoti Vihar, Burla)',
  'Berhampur University (Bhanja Bihar, Berhampur)',
  'Ravenshaw University (Cuttack)',
  'Fakir Mohan University (Vyasa Vihar, Balasore)',
  'Maharaja Sriram Chandra Bhanja Deo University (MSCB Baripada / North Orissa University)',
  'Odisha University of Technology and Research (OUTR Bhubaneswar / Formerly CET)',
  'Veer Surendra Sai University of Technology (VSSUT Burla)',
  'Rama Devi Women\'s University (Bhubaneswar)',
  'Gangadhar Meher University (GMU Sambalpur)',
  'Khallikote Unitary University (Berhampur)',
  'Dharanidhar University (Keonjhar)',
  'Vikram Dev University (Jeypore, Koraput)',
  'Rajendra University (Balangir)',
  'Kalahandi University (Maa Manikeswari University, Bhawanipatna)',
  'Odisha University of Agriculture and Technology (OUAT Bhubaneswar)',
  'Odisha University of Health Sciences (OUHS Bhubaneswar)',
  'Utkal University of Culture (Bhubaneswar)',
  'Madhusudan Law University (Cuttack)',
  'Shri Jagannath Sanskrit Vishvavidyalaya (SJSV Puri)',
  'IIT Bhubaneswar (Autonomous Central Institute)',
  'NIT Rourkela (Autonomous Central Institute)',
  'AIIMS Bhubaneswar (Autonomous Central Institute)',
  'National Institute of Science Education and Research (NISER Bhubaneswar)',
  'Indian Institute of Management Sambalpur (IIM Sambalpur)',
  'IIIT Bhubaneswar (International Institute of Information Technology)',
  'KIIT Deemed to be University (Bhubaneswar)',
  'Siksha \'O\' Anusandhan (SOA / ITER) Deemed University (Bhubaneswar)',
  'Silicon University (Bhubaneswar)',
  'C.V. Raman Global University (CVRGU Bhubaneswar)',
  'GIET University (Gunupur, Rayagada)',
  'Centurion University of Technology and Management (CUTM)',
  'Sri Sri University (Cuttack)',
  'Birla Global University (BGU Bhubaneswar)',
  'XIM University / Xavier Institute of Management (Bhubaneswar)',
  'ASBM University (Bhubaneswar)',
  'AIPH University (Bhubaneswar)',
  'NIST University (Berhampur)',
  'DRIEMS University (Cuttack)',
  'National Law University Odisha (NLUO Cuttack)',
  'State Council for Technical Education & Vocational Training (SCTE&VT Odisha)'
];

export const ODISHA_INSTITUTES: OdishaInstitute[] = [
  // 1. Premier National Institutes
  {
    id: 'iit-bbsr',
    name: 'Indian Institute of Technology Bhubaneswar (IIT Bhubaneswar)',
    shortName: 'IIT Bhubaneswar',
    category: 'Premier',
    district: 'Khordha',
    city: 'Argul, Bhubaneswar',
    universityAffiliation: 'Autonomous Institute of National Importance',
    established: 2008
  },
  {
    id: 'nit-rourkela',
    name: 'National Institute of Technology Rourkela (NIT Rourkela)',
    shortName: 'NIT Rourkela',
    category: 'Premier',
    district: 'Sundargarh',
    city: 'Rourkela',
    universityAffiliation: 'Autonomous Institute of National Importance',
    established: 1961
  },
  {
    id: 'aiims-bbsr',
    name: 'All India Institute of Medical Sciences Bhubaneswar (AIIMS Bhubaneswar)',
    shortName: 'AIIMS Bhubaneswar',
    category: 'Premier',
    district: 'Khordha',
    city: 'Sijua, Bhubaneswar',
    universityAffiliation: 'Autonomous Institute of National Importance',
    established: 2012
  },
  {
    id: 'iiit-bbsr',
    name: 'International Institute of Information Technology Bhubaneswar (IIIT-BH)',
    shortName: 'IIIT Bhubaneswar',
    category: 'Premier',
    district: 'Khordha',
    city: 'Gothapatna, Bhubaneswar',
    universityAffiliation: 'Autonomous State University',
    established: 2006
  },
  {
    id: 'niser-bbsr',
    name: 'National Institute of Science Education and Research (NISER Bhubaneswar)',
    shortName: 'NISER Bhubaneswar',
    category: 'Premier',
    district: 'Khordha',
    city: 'Jatni, Bhubaneswar',
    universityAffiliation: 'Homi Bhabha National Institute (DAE)',
    established: 2006
  },
  {
    id: 'nluo-cuttack',
    name: 'National Law University Odisha (NLUO Cuttack)',
    shortName: 'NLUO Cuttack',
    category: 'Premier',
    district: 'Cuttack',
    city: 'Naraj, Cuttack',
    universityAffiliation: 'Autonomous Law University',
    established: 2008
  },
  {
    id: 'iim-sambalpur',
    name: 'Indian Institute of Management Sambalpur (IIM Sambalpur)',
    shortName: 'IIM Sambalpur',
    category: 'Premier',
    district: 'Sambalpur',
    city: 'Basantpur, Sambalpur',
    universityAffiliation: 'Autonomous Institute of National Importance',
    established: 2015
  },

  // 2. State Public Universities & State Technical Hubs
  {
    id: 'outr-bbsr',
    name: 'Odisha University of Technology and Research (OUTR / Formerly CET Bhubaneswar)',
    shortName: 'OUTR Bhubaneswar (CET)',
    category: 'State University',
    district: 'Khordha',
    city: 'Ghatikia, Bhubaneswar',
    universityAffiliation: 'Unitary State Technical University',
    established: 1981
  },
  {
    id: 'vssut-burla',
    name: 'Veer Surendra Sai University of Technology (VSSUT Burla / UCE Burla)',
    shortName: 'VSSUT Burla',
    category: 'State University',
    district: 'Sambalpur',
    city: 'Burla, Sambalpur',
    universityAffiliation: 'Unitary State Technical University',
    established: 1956
  },
  {
    id: 'utkal-univ',
    name: 'Utkal University (Vani Vihar, Bhubaneswar)',
    shortName: 'Utkal University',
    category: 'State University',
    district: 'Khordha',
    city: 'Vani Vihar, Bhubaneswar',
    universityAffiliation: 'State University (NAAC A+)',
    established: 1943
  },
  {
    id: 'ravenshaw-univ',
    name: 'Ravenshaw University (Cuttack)',
    shortName: 'Ravenshaw University',
    category: 'State University',
    district: 'Cuttack',
    city: 'College Square, Cuttack',
    universityAffiliation: 'Unitary State University',
    established: 1868
  },
  {
    id: 'sambalpur-univ',
    name: 'Sambalpur University (Jyoti Vihar, Burla)',
    shortName: 'Sambalpur University',
    category: 'State University',
    district: 'Sambalpur',
    city: 'Burla, Sambalpur',
    universityAffiliation: 'State University',
    established: 1967
  },
  {
    id: 'berhampur-univ',
    name: 'Berhampur University (Bhanja Bihar, Berhampur)',
    shortName: 'Berhampur University',
    category: 'State University',
    district: 'Ganjam',
    city: 'Bhanja Bihar, Berhampur',
    universityAffiliation: 'State University',
    established: 1967
  },
  {
    id: 'fm-univ',
    name: 'Fakir Mohan University (Vyasa Vihar, Balasore)',
    shortName: 'Fakir Mohan University',
    category: 'State University',
    district: 'Balasore',
    city: 'Nuapadhi, Balasore',
    universityAffiliation: 'State University',
    established: 1999
  },
  {
    id: 'mscb-univ',
    name: 'Maharaja Sriram Chandra Bhanja Deo University (MSCB / North Orissa University)',
    shortName: 'MSCB University Baripada',
    category: 'State University',
    district: 'Mayurbhanj',
    city: 'Takatpur, Baripada',
    universityAffiliation: 'State University',
    established: 1998
  },
  {
    id: 'rdwu-bbsr',
    name: 'Rama Devi Women\'s University (Bhubaneswar)',
    shortName: 'Rama Devi Women\'s University',
    category: 'State University',
    district: 'Khordha',
    city: 'Bhoi Nagar, Bhubaneswar',
    universityAffiliation: 'Unitary Women\'s State University',
    established: 1964
  },
  {
    id: 'gmu-sambalpur',
    name: 'Gangadhar Meher University (GMU Sambalpur)',
    shortName: 'GMU Sambalpur',
    category: 'State University',
    district: 'Sambalpur',
    city: 'Fatak, Sambalpur',
    universityAffiliation: 'Unitary State University',
    established: 1944
  },
  {
    id: 'khallikote-univ',
    name: 'Khallikote Unitary University (Berhampur)',
    shortName: 'Khallikote University',
    category: 'State University',
    district: 'Ganjam',
    city: 'Berhampur',
    universityAffiliation: 'Unitary State University',
    established: 1878
  },
  {
    id: 'dharanidhar-univ',
    name: 'Dharanidhar University (Keonjhar)',
    shortName: 'Dharanidhar University',
    category: 'State University',
    district: 'Keonjhar',
    city: 'Keonjhar',
    universityAffiliation: 'Unitary State University',
    established: 1957
  },
  {
    id: 'vikram-dev-univ',
    name: 'Vikram Dev University (Jeypore, Koraput)',
    shortName: 'Vikram Dev University',
    category: 'State University',
    district: 'Koraput',
    city: 'Jeypore',
    universityAffiliation: 'Unitary State University',
    established: 1947
  },
  {
    id: 'rajendra-univ',
    name: 'Rajendra University (Balangir)',
    shortName: 'Rajendra University',
    category: 'State University',
    district: 'Balangir',
    city: 'Balangir',
    universityAffiliation: 'Unitary State University',
    established: 1944
  },
  {
    id: 'kalahandi-univ',
    name: 'Kalahandi University (Manikyavihar, Bhawanipatna)',
    shortName: 'Kalahandi University',
    category: 'State University',
    district: 'Kalahandi',
    city: 'Bhawanipatna',
    universityAffiliation: 'Unitary State University',
    established: 1960
  },
  {
    id: 'bput-rourkela',
    name: 'Biju Patnaik University of Technology (BPUT Rourkela Head Office)',
    shortName: 'BPUT Rourkela',
    category: 'State University',
    district: 'Sundargarh',
    city: 'Chhend Colony, Rourkela',
    universityAffiliation: 'State Technical Affiliating University',
    established: 2002
  },

  // 3. Government Engineering Colleges
  {
    id: 'igit-sarang',
    name: 'Indira Gandhi Institute of Technology Sarang (IGIT Sarang)',
    shortName: 'IGIT Sarang',
    category: 'Govt Engineering',
    district: 'Dhenkanal',
    city: 'Sarang, Dhenkanal',
    universityAffiliation: 'BPUT Rourkela (Autonomous Govt)',
    established: 1982
  },
  {
    id: 'pmec-berhampur',
    name: 'Parala Maharaja Engineering College (PMEC Berhampur)',
    shortName: 'PMEC Berhampur',
    category: 'Govt Engineering',
    district: 'Ganjam',
    city: 'Sitalapalli, Berhampur',
    universityAffiliation: 'BPUT Rourkela (Constituent Govt College)',
    established: 2009
  },
  {
    id: 'gcek-kalahandi',
    name: 'Government College of Engineering Kalahandi (GCEK Bhawanipatna)',
    shortName: 'GCEK Kalahandi',
    category: 'Govt Engineering',
    district: 'Kalahandi',
    city: 'Bandopala, Bhawanipatna',
    universityAffiliation: 'BPUT Rourkela (Constituent Govt College)',
    established: 2009
  },
  {
    id: 'gcek-keonjhar',
    name: 'Government College of Engineering Keonjhar (GCEK Keonjhar)',
    shortName: 'GCEK Keonjhar',
    category: 'Govt Engineering',
    district: 'Keonjhar',
    city: 'Jamunalia, Keonjhar',
    universityAffiliation: 'BPUT Rourkela (Constituent Govt College)',
    established: 1995
  },
  {
    id: 'cipet-bbsr',
    name: 'Central Institute of Petrochemicals Engineering & Technology (CIPET: IPT Bhubaneswar)',
    shortName: 'CIPET Bhubaneswar',
    category: 'Govt Engineering',
    district: 'Khordha',
    city: 'Patia, Bhubaneswar',
    universityAffiliation: 'Utkal University & BPUT',
    established: 1968
  },

  // 4. Premier Deemed & Private Universities
  {
    id: 'kiit-bbsr',
    name: 'Kalinga Institute of Industrial Technology (KIIT Deemed to be University)',
    shortName: 'KIIT University Bhubaneswar',
    category: 'Private University',
    district: 'Khordha',
    city: 'Patia, Bhubaneswar',
    universityAffiliation: 'Deemed to be University (NAAC A++)',
    established: 1992
  },
  {
    id: 'soa-iter-bbsr',
    name: 'Siksha \'O\' Anusandhan University (SOA / ITER Bhubaneswar)',
    shortName: 'SOA University (ITER)',
    category: 'Private University',
    district: 'Khordha',
    city: 'Khandagiri, Bhubaneswar',
    universityAffiliation: 'Deemed to be University (NAAC A++)',
    established: 1996
  },
  {
    id: 'silicon-univ',
    name: 'Silicon University (Formerly Silicon Institute of Technology, Bhubaneswar)',
    shortName: 'Silicon University Bhubaneswar',
    category: 'Private University',
    district: 'Khordha',
    city: 'Silicon Hills, Patia, Bhubaneswar',
    universityAffiliation: 'Unitary State Private University',
    established: 2001
  },
  {
    id: 'cgu-bbsr',
    name: 'C. V. Raman Global University (CGU Bhubaneswar)',
    shortName: 'C.V. Raman Global University',
    category: 'Private University',
    district: 'Khordha',
    city: 'Bidyanagar, Mahura, Bhubaneswar',
    universityAffiliation: 'Unitary State Private University',
    established: 1997
  },
  {
    id: 'giet-gunupur',
    name: 'GIET University Gunupur (Gandhi Institute of Engineering & Technology)',
    shortName: 'GIET University Gunupur',
    category: 'Private University',
    district: 'Rayagada',
    city: 'Gunupur, Rayagada',
    universityAffiliation: 'Unitary State Private University',
    established: 1997
  },
  {
    id: 'cutm-odisha',
    name: 'Centurion University of Technology and Management (CUTM Odisha)',
    shortName: 'Centurion University (CUTM)',
    category: 'Private University',
    district: 'Gajapati',
    city: 'Paralakhemundi & Bhubaneswar',
    universityAffiliation: 'Unitary State Private University',
    established: 2005
  },
  {
    id: 'sri-sri-univ',
    name: 'Sri Sri University (Cuttack)',
    shortName: 'Sri Sri University',
    category: 'Private University',
    district: 'Cuttack',
    city: 'Bidyadharpur Arilo, Cuttack',
    universityAffiliation: 'Unitary State Private University',
    established: 2009
  },
  {
    id: 'bgu-bbsr',
    name: 'Birla Global University (BGU Bhubaneswar)',
    shortName: 'Birla Global University',
    category: 'Private University',
    district: 'Khordha',
    city: 'Gothapatna, Bhubaneswar',
    universityAffiliation: 'Unitary State Private University',
    established: 2013
  },
  {
    id: 'xim-univ',
    name: 'Xavier University / XIM University (Bhubaneswar)',
    shortName: 'XIM University Bhubaneswar',
    category: 'Private University',
    district: 'Puri',
    city: 'Harirajpur, Pipili, Bhubaneswar',
    universityAffiliation: 'Unitary State Private University',
    established: 2013
  },

  // 5. Leading Autonomous & BPUT Affiliated Engineering Colleges
  {
    id: 'gita-bbsr',
    name: 'Gandhi Institute for Technological Advancement (GITA Autonomous College)',
    shortName: 'GITA Autonomous College',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Madanpur, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela (UGC Autonomous / NAAC A)',
    established: 2004
  },
  {
    id: 'tat-bbsr',
    name: 'Trident Academy of Technology (TAT Bhubaneswar)',
    shortName: 'Trident Academy of Technology',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Infocity, Chandaka, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2005
  },
  {
    id: 'sit-sambalpur',
    name: 'Silicon Institute of Technology Sambalpur (Silicon West)',
    shortName: 'Silicon West Sambalpur',
    category: 'Engineering College',
    district: 'Sambalpur',
    city: 'Sason, Sambalpur',
    universityAffiliation: 'BPUT Rourkela',
    established: 2009
  },
  {
    id: 'gec-bbsr',
    name: 'Gandhi Engineering College (GEC Autonomous, Bhubaneswar)',
    shortName: 'Gandhi Engineering College (GEC)',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Madanpur, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela (UGC Autonomous)',
    established: 2006
  },
  {
    id: 'kec-bbsr',
    name: 'Krupajal Engineering College (KEC Bhubaneswar)',
    shortName: 'Krupajal Engineering College',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Prasanti Vihar, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 1995
  },
  {
    id: 'nit-bbsr',
    name: 'Nalanda Institute of Technology (NIT Bhubaneswar)',
    shortName: 'Nalanda Institute of Technology',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Chandaka, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2007
  },
  {
    id: 'bec-bbsr',
    name: 'Bhubaneswar Engineering College (BEC Bhubaneswar)',
    shortName: 'Bhubaneswar Engineering College',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Atala, Pitapalli, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2008
  },
  {
    id: 'rec-bbsr',
    name: 'Raajdhani Engineering College (REC Bhubaneswar)',
    shortName: 'Raajdhani Engineering College',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Mancheswar, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2006
  },
  {
    id: 'nmiet-bbsr',
    name: 'NM Institute of Engineering and Technology (NMIET Bhubaneswar)',
    shortName: 'NMIET Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Sijua, Patrapada, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2004
  },
  {
    id: 'siet-dhenkanal',
    name: 'Synergy Institute of Engineering & Technology (SIET Dhenkanal)',
    shortName: 'Synergy Dhenkanal',
    category: 'Engineering College',
    district: 'Dhenkanal',
    city: 'Banamali Prasad, Dhenkanal',
    universityAffiliation: 'BPUT Rourkela',
    established: 1999
  },
  {
    id: 'mitm-bbsr',
    name: 'Modern Institute of Technology and Management (MITM Bhubaneswar)',
    shortName: 'MITM Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Bhagabatipur, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2008
  },
  {
    id: 'roland-berhampur',
    name: 'Roland Institute of Technology (RIT Berhampur)',
    shortName: 'Roland Institute Berhampur',
    category: 'Engineering College',
    district: 'Ganjam',
    city: 'Surya Vihar, Berhampur',
    universityAffiliation: 'BPUT Rourkela',
    established: 2001
  },
  {
    id: 'seemanta-mayurbhanj',
    name: 'Seemanta Engineering College (Mayurbhanj)',
    shortName: 'Seemanta Engineering College',
    category: 'Engineering College',
    district: 'Mayurbhanj',
    city: 'Jharpokharia, Mayurbhanj',
    universityAffiliation: 'BPUT Rourkela',
    established: 1997
  },
  {
    id: 'ritm-rayagada',
    name: 'Rayagada Institute of Technology and Management (RITM Rayagada)',
    shortName: 'RITM Rayagada',
    category: 'Engineering College',
    district: 'Rayagada',
    city: 'Rayagada',
    universityAffiliation: 'BPUT Rourkela',
    established: 2009
  },
  {
    id: 'piet-rourkela',
    name: 'Purushottam Institute of Engineering & Technology (PIET Rourkela)',
    shortName: 'PIET Rourkela',
    category: 'Engineering College',
    district: 'Sundargarh',
    city: 'Mandir Kalunga, Rourkela',
    universityAffiliation: 'BPUT Rourkela',
    established: 1999
  },
  {
    id: 'east-bbsr',
    name: 'Eastern Academy of Science and Technology (EAST Bhubaneswar)',
    shortName: 'EAST Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Phulnakhara, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2001
  },
  {
    id: 'eatm-bbsr',
    name: 'Einstein Academy of Technology and Management (EATM Bhubaneswar)',
    shortName: 'EATM Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Baniatangi, Khordha',
    universityAffiliation: 'BPUT Rourkela',
    established: 2009
  },

  // 6. Premier Government & Autonomous Degree Colleges
  {
    id: 'bjb-college',
    name: 'Buxi Jagabandhu Bidyadhar Autonomous College (BJB College Bhubaneswar)',
    shortName: 'BJB Autonomous College',
    category: 'Degree College',
    district: 'Khordha',
    city: 'BJB Nagar, Bhubaneswar',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1957
  },
  {
    id: 'scs-puri',
    name: 'Samanta Chandra Sekhara Autonomous College (SCS College Puri)',
    shortName: 'SCS Autonomous College Puri',
    category: 'Degree College',
    district: 'Puri',
    city: 'Chandan Hajuri Road, Puri',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1944
  },
  {
    id: 'mpc-baripada',
    name: 'Maharaja Purna Chandra Autonomous College (MPC College Baripada)',
    shortName: 'MPC Autonomous College Baripada',
    category: 'Degree College',
    district: 'Mayurbhanj',
    city: 'Baghra Road, Baripada',
    universityAffiliation: 'MSCB University (Autonomous)',
    established: 1948
  },
  {
    id: 'fmc-balasore',
    name: 'Fakir Mohan Autonomous College (FM College Balasore)',
    shortName: 'FM Autonomous College Balasore',
    category: 'Degree College',
    district: 'Balasore',
    city: 'Azimabad, Balasore',
    universityAffiliation: 'Fakir Mohan University (Autonomous)',
    established: 1944
  },
  {
    id: 'dhenkanal-college',
    name: 'Dhenkanal Autonomous College (Dhenkanal)',
    shortName: 'Dhenkanal Autonomous College',
    category: 'Degree College',
    district: 'Dhenkanal',
    city: 'Dhenkanal Town',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1959
  },
  {
    id: 'stewart-science-cuttack',
    name: 'Stewart Science College (Cuttack)',
    shortName: 'Stewart Science College Cuttack',
    category: 'Degree College',
    district: 'Cuttack',
    city: 'Buxi Bazaar, Cuttack',
    universityAffiliation: 'Utkal University',
    established: 1944
  },
  {
    id: 'christ-cuttack',
    name: 'Christ College (Cuttack)',
    shortName: 'Christ College Cuttack',
    category: 'Degree College',
    district: 'Cuttack',
    city: 'Chandi Chhak, Cuttack',
    universityAffiliation: 'Utkal University',
    established: 1944
  },
  {
    id: 'sailabala-cuttack',
    name: 'Shailabala Women\'s Autonomous College (Cuttack)',
    shortName: 'Sailabala Women\'s College',
    category: 'Degree College',
    district: 'Cuttack',
    city: 'Mission Road, Cuttack',
    universityAffiliation: 'Rama Devi Women\'s University',
    established: 1913
  },
  {
    id: 'bhadrak-college',
    name: 'Bhadrak Autonomous College (Bhadrak)',
    shortName: 'Bhadrak Autonomous College',
    category: 'Degree College',
    district: 'Bhadrak',
    city: 'Bhadrak',
    universityAffiliation: 'Fakir Mohan University',
    established: 1948
  },
  {
    id: 'kendrapara-college',
    name: 'Kendrapara Autonomous College (Kendrapara)',
    shortName: 'Kendrapara Autonomous College',
    category: 'Degree College',
    district: 'Kendrapara',
    city: 'Kendrapara',
    universityAffiliation: 'Utkal University',
    established: 1959
  },
  {
    id: 'svm-jagatsinghpur',
    name: 'Swami Vivekananda Memorial Autonomous College (SVM College Jagatsinghpur)',
    shortName: 'SVM Autonomous College',
    category: 'Degree College',
    district: 'Jagatsinghpur',
    city: 'Jagatsinghpur',
    universityAffiliation: 'Utkal University',
    established: 1963
  },
  {
    id: 'gac-rourkela',
    name: 'Government Autonomous College Rourkela (Panposh)',
    shortName: 'Govt Autonomous College Rourkela',
    category: 'Degree College',
    district: 'Sundargarh',
    city: 'Panposh, Rourkela',
    universityAffiliation: 'Sambalpur University',
    established: 1961
  },
  {
    id: 'panchayat-bargarh',
    name: 'Panchayat College Bargarh (Bargarh)',
    shortName: 'Panchayat College Bargarh',
    category: 'Degree College',
    district: 'Bargarh',
    city: 'Bargarh Town',
    universityAffiliation: 'Sambalpur University',
    established: 1960
  },
  {
    id: 'rajdhani-bbsr',
    name: 'Rajdhani College (Bhubaneswar)',
    shortName: 'Rajdhani College Bhubaneswar',
    category: 'Degree College',
    district: 'Khordha',
    city: 'Baramunda, Bhubaneswar',
    universityAffiliation: 'Utkal University',
    established: 1973
  },
  {
    id: 'maharishi-bbsr',
    name: 'Maharishi College of Natural Law (Bhubaneswar)',
    shortName: 'Maharishi College Bhubaneswar',
    category: 'Degree College',
    district: 'Khordha',
    city: 'Saheed Nagar, Bhubaneswar',
    universityAffiliation: 'Utkal University',
    established: 1982
  },

  // 7. Medical & Health Sciences Colleges
  {
    id: 'scb-mch-cuttack',
    name: 'Srirama Chandra Bhanja Medical College and Hospital (SCB Medical Cuttack)',
    shortName: 'SCB Medical College Cuttack',
    category: 'Medical College',
    district: 'Cuttack',
    city: 'Mangalabag, Cuttack',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 1944
  },
  {
    id: 'mkcg-mch-berhampur',
    name: 'Maharaja Krushna Chandra Gajapati Medical College (MKCG Berhampur)',
    shortName: 'MKCG Medical College Berhampur',
    category: 'Medical College',
    district: 'Ganjam',
    city: 'Berhampur',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 1962
  },
  {
    id: 'vimsar-burla',
    name: 'Veer Surendra Sai Institute of Medical Sciences and Research (VIMSAR Burla)',
    shortName: 'VIMSAR Burla',
    category: 'Medical College',
    district: 'Sambalpur',
    city: 'Burla, Sambalpur',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 1959
  },
  {
    id: 'prm-mch-baripada',
    name: 'Pandit Raghunath Murmu Medical College and Hospital (PRMMCH Baripada)',
    shortName: 'PRM Medical College Baripada',
    category: 'Medical College',
    district: 'Mayurbhanj',
    city: 'Rangamatia, Baripada',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2017
  },
  {
    id: 'sln-mch-koraput',
    name: 'Saheed Laxman Nayak Medical College and Hospital (SLN MCH Koraput)',
    shortName: 'SLN Medical College Koraput',
    category: 'Medical College',
    district: 'Koraput',
    city: 'Koraput',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2017
  },
  {
    id: 'bb-mch-balangir',
    name: 'Bhima Bhoi Medical College and Hospital (BBMCH Balangir)',
    shortName: 'Bhima Bhoi Medical College Balangir',
    category: 'Medical College',
    district: 'Balangir',
    city: 'Balangir',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2018
  },
  {
    id: 'fmmch-balasore',
    name: 'Fakir Mohan Medical College and Hospital (FMMCH Balasore)',
    shortName: 'FM Medical College Balasore',
    category: 'Medical College',
    district: 'Balasore',
    city: 'Remuna, Balasore',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2018
  },
  {
    id: 'ddmch-keonjhar',
    name: 'Dharanidhar Medical College and Hospital (DDMCH Keonjhar)',
    shortName: 'Dharanidhar Medical College Keonjhar',
    category: 'Medical College',
    district: 'Keonjhar',
    city: 'Kabitra, Keonjhar',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2022
  },
  {
    id: 'kims-mch-bbsr',
    name: 'Kalinga Institute of Medical Sciences (KIMS Bhubaneswar)',
    shortName: 'KIMS Medical College',
    category: 'Medical College',
    district: 'Khordha',
    city: 'Patia, Bhubaneswar',
    universityAffiliation: 'KIIT Deemed to be University',
    established: 2007
  },
  {
    id: 'ims-sum-bbsr',
    name: 'Institute of Medical Sciences and SUM Hospital (IMS & SUM Bhubaneswar)',
    shortName: 'IMS & SUM Hospital',
    category: 'Medical College',
    district: 'Khordha',
    city: 'Kalinga Nagar, Bhubaneswar',
    universityAffiliation: 'SOA Deemed to be University',
    established: 2007
  },
  {
    id: 'hitech-mch-bbsr',
    name: 'Hi-Tech Medical College and Hospital (Bhubaneswar)',
    shortName: 'Hi-Tech Medical College BBSR',
    category: 'Medical College',
    district: 'Khordha',
    city: 'Pandara, Rasulgarh, Bhubaneswar',
    universityAffiliation: 'Utkal University / OUHS',
    established: 2005
  },
  {
    id: 'hitech-mch-rourkela',
    name: 'Hi-Tech Medical College and Hospital (Rourkela)',
    shortName: 'Hi-Tech Medical College Rourkela',
    category: 'Medical College',
    district: 'Sundargarh',
    city: 'Raghunathpali, Rourkela',
    universityAffiliation: 'Sambalpur University / OUHS',
    established: 2012
  },
  {
    id: 'sjmch-puri',
    name: 'Shri Jagannath Medical College and Hospital (SJMCH Puri)',
    shortName: 'Shri Jagannath Medical College Puri',
    category: 'Medical College',
    district: 'Puri',
    city: 'Samangara, Puri',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2021
  },
  {
    id: 'gmc-sundargarh',
    name: 'Government Medical College and Hospital (Sundargarh)',
    shortName: 'Govt Medical College Sundargarh',
    category: 'Medical College',
    district: 'Sundargarh',
    city: 'Sundargarh',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2022
  },
  {
    id: 'gmc-kalahandi',
    name: 'Government Medical College and Hospital (Bhawanipatna, Kalahandi)',
    shortName: 'Govt Medical College Kalahandi',
    category: 'Medical College',
    district: 'Kalahandi',
    city: 'Bhawanipatna',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2023
  },
  {
    id: 'gmc-jajpur',
    name: 'Jajpur Government Medical College and Hospital (Jajpur)',
    shortName: 'Govt Medical College Jajpur',
    category: 'Medical College',
    district: 'Jajpur',
    city: 'Jajpur Town',
    universityAffiliation: 'Odisha University of Health Sciences (OUHS)',
    established: 2024
  },
  {
    id: 'nist-berhampur',
    name: 'National Institute of Science and Technology (NIST University Berhampur)',
    shortName: 'NIST University Berhampur',
    category: 'Private University',
    district: 'Ganjam',
    city: 'Palur Hills, Berhampur',
    universityAffiliation: 'Unitary State Private University',
    established: 1996
  },
  {
    id: 'driems-cuttack',
    name: 'DRIEMS University (Dhaneswar Rath Institute of Engineering and Medical Sciences, Cuttack)',
    shortName: 'DRIEMS University Cuttack',
    category: 'Private University',
    district: 'Cuttack',
    city: 'Tangi, Cuttack',
    universityAffiliation: 'Unitary State Private University',
    established: 1999
  },
  {
    id: 'ouat-bbsr',
    name: 'Odisha University of Agriculture and Technology (OUAT College of Agriculture, Bhubaneswar)',
    shortName: 'OUAT Bhubaneswar',
    category: 'State University',
    district: 'Khordha',
    city: 'Siripur, Surya Nagar, Bhubaneswar',
    universityAffiliation: 'State Agricultural University',
    established: 1962
  },
  {
    id: 'kit-berhampur',
    name: 'Kalam Institute of Technology (KIT Berhampur)',
    shortName: 'Kalam Institute Berhampur',
    category: 'Engineering College',
    district: 'Ganjam',
    city: 'Govinda Vihar, Berhampur',
    universityAffiliation: 'BPUT Rourkela',
    established: 2008
  },
  {
    id: 'gate-berhampur',
    name: 'Gandhi Academy of Technology and Education (GATE Berhampur)',
    shortName: 'GATE Berhampur',
    category: 'Engineering College',
    district: 'Ganjam',
    city: 'Golanthara, Berhampur',
    universityAffiliation: 'BPUT Rourkela',
    established: 2009
  },
  {
    id: 'coeb-bbsr',
    name: 'College of Engineering Bhubaneswar (COEB / Koustuv Group)',
    shortName: 'COEB Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Patia, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 1999
  },
  {
    id: 'aiet-bbsr',
    name: 'Aryan Institute of Engineering and Technology (AIET Bhubaneswar)',
    shortName: 'Aryan Institute Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Arya Vihar, Taraboi, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2009
  },
  {
    id: 'kist-bbsr',
    name: 'Konark Institute of Science and Technology (KIST Bhubaneswar)',
    shortName: 'KIST Bhubaneswar',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Jatni, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2001
  },
  {
    id: 'cec-bbsr',
    name: 'Capital Engineering College (CEC Bhubaneswar)',
    shortName: 'Capital Engineering College',
    category: 'Engineering College',
    district: 'Khordha',
    city: 'Mahura, Janla, Bhubaneswar',
    universityAffiliation: 'BPUT Rourkela',
    established: 2010
  },
  {
    id: 'banki-college',
    name: 'Banki Autonomous College (Banki, Cuttack)',
    shortName: 'Banki Autonomous College',
    category: 'Degree College',
    district: 'Cuttack',
    city: 'Banki, Cuttack',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1961
  },
  {
    id: 'nayagarh-college',
    name: 'Nayagarh Autonomous College (Nayagarh)',
    shortName: 'Nayagarh Autonomous College',
    category: 'Degree College',
    district: 'Nayagarh',
    city: 'Nayagarh Town',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1961
  },
  {
    id: 'nimapara-college',
    name: 'Nimapara Autonomous College (Nimapara, Puri)',
    shortName: 'Nimapara Autonomous College',
    category: 'Degree College',
    district: 'Puri',
    city: 'Nimapara, Puri',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1963
  },
  {
    id: 'angul-college',
    name: 'Government Autonomous College Angul (Angul)',
    shortName: 'Govt Autonomous College Angul',
    category: 'Degree College',
    district: 'Angul',
    city: 'Angul Town',
    universityAffiliation: 'Utkal University (Autonomous)',
    established: 1957
  },
  {
    id: 'bhawanipatna-auto-college',
    name: 'Government Autonomous College Bhawanipatna (Kalahandi)',
    shortName: 'Govt Autonomous College Bhawanipatna',
    category: 'Degree College',
    district: 'Kalahandi',
    city: 'Bhawanipatna',
    universityAffiliation: 'Kalahandi University (Autonomous)',
    established: 1960
  }
];

export const DEFAULT_ODISHA_INSTITUTE = 'Odisha University of Technology and Research (OUTR / Formerly CET Bhubaneswar)';
export const DEFAULT_ODISHA_UNIVERSITY = 'Biju Patnaik University of Technology (BPUT Rourkela)';

export const ODISHA_INSTITUTE_CATEGORIES = [
  'Premier',
  'State University',
  'Govt Engineering',
  'Private University',
  'Engineering College',
  'Degree College',
  'Medical College'
] as const;

/**
 * Fast search helper across all Odisha institutes
 */
export function searchOdishaInstitutes(query: string): OdishaInstitute[] {
  if (!query || !query.trim()) return ODISHA_INSTITUTES;
  const q = query.toLowerCase().trim();
  return ODISHA_INSTITUTES.filter(inst => 
    inst.name.toLowerCase().includes(q) ||
    inst.shortName.toLowerCase().includes(q) ||
    inst.district.toLowerCase().includes(q) ||
    inst.city.toLowerCase().includes(q) ||
    inst.universityAffiliation.toLowerCase().includes(q) ||
    inst.category.toLowerCase().includes(q)
  );
}
