import { TranslationKeys } from './en';

export const hi: TranslationKeys = {
  // Navigation & Header
  nav: {
    brand: "फार्मशील्ड (FarmSheild)",
    tagline: "पशु स्वास्थ्य एवं सुरक्षा पोर्टल",
    farmerRole: "किसान मोड (Farmer)",
    vetRole: "डॉक्टर मोड (Vet)",
    adminRole: "व्यवस्थापक (Admin)",
    qrScan: "क्यूआर स्कैन करें",
    language: "भाषा (Language)",
    english: "English",
    hindi: "हिंदी (Hindi)",
  },

  // Farmer Home Dashboard
  farmerHome: {
    greeting: "नमस्ते 👋",
    subGreeting: "आपका डिजिटल डेयरी और पशु सुरक्षा केंद्र",
    stats: {
      totalAnimals: "कुल पशु",
      underTreatment: "दवाई चल रही है",
      underWithdrawal: "दूध रोकने का समय",
      cleared: "दूध बेचना सुरक्षित",
    },
    actions: {
      myAnimals: "मेरे पशु",
      myAnimalsDesc: "पशु देखें और नया पशु जोड़ें",
      recordMedicine: "दवाई की जानकारी लिखें",
      recordMedicineDesc: "पशु को दी गई दवा की प्रविष्टि करें",
      isMilkSafe: "दूध सुरक्षित है?",
      isMilkSafeDesc: "जानें कब दूध बेच सकते हैं",
      warnings: "ज़रूरी चेतावनियाँ",
      warningsDesc: "दूध और दवा की सुरक्षा चेतावनियाँ",
      myRecords: "पुराना रिकॉर्ड",
      myRecordsDesc: "दवा देने का पुराना इतिहास",
      scanQr: "पशु क्यूआर (QR) स्कैन",
      scanQrDesc: "क्यूआर कोड से पशु की स्थिति जानें",
    },
  },

  // Animal Management
  animals: {
    title: "मेरे पशु (My Animals)",
    registerNew: "नया पशु जोड़ें",
    animalCode: "पशु टैग / नंबर",
    species: "पशु का प्रकार",
    breed: "नस्ल (Breed)",
    age: "उम्र / जन्म तारीख",
    weight: "वज़न (किलो)",
    purpose: "उपयोग",
    healthStatus: "स्वास्थ्य स्थिति",
    qrCode: "क्यूआर कोड",
    viewProfile: "विवरण देखें",
    generateQr: "क्यूआर कोड बनाएं",
    noAnimals: "अभी कोई पशु नहीं जोड़ा गया है। ऊपर बटन दबाकर पहला पशु जोड़ें।",
    status: {
      healthy: "स्वस्थ 🟢",
      sick: "बीमार 🟡",
      underTreatment: "दवाई चल रही है 💊",
      quarantine: "अलग रखा गया है 🔴",
    },
    speciesList: {
      cow: "गाय (Cow)",
      buffalo: "भैंस (Buffalo)",
      goat: "बकरी (Goat)",
      sheep: "भेड़ (Sheep)",
    },
    purposes: {
      milk: "दूध उत्पादन",
      meat: "मांस उत्पादन",
      breeding: "प्रजनन",
      other: "अन्य",
    },
  },

  // Medicine & Treatment Recording
  treatment: {
    title: "दवाई की जानकारी दर्ज करें",
    subtitle: "पशु को दी गई दवा दर्ज करें ताकि दूध बेचने की सही तारीख पता चल सके",
    selectAnimal: "पशु चुनें",
    selectMedicine: "दवाई का नाम चुनें",
    dose: "दवा की मात्रा (Dose)",
    doseUnit: "मात्रा की इकाई (मि.ली. / मि.ग्रा.)",
    route: "दवा देने का तरीका (इंजैक्शन/ओरल)",
    frequency: "दिन में कितनी बार",
    durationDays: "कितने दिन दवा देनी है",
    startDate: "दवा शुरू करने की तारीख",
    diseaseIndication: "बीमारी / लक्षण",
    productAffected: "प्रभावित उत्पाद (दूध / मांस)",
    veterinarianName: "डॉक्टर (Vet) का नाम",
    notes: "अन्य टिप्पणी",
    submit: "दवा दर्ज करें और सुरक्षित तारीख जानें",
    calculating: "सुरक्षित तारीख की गणना हो रही है...",
    successMsg: "दवाई की जानकारी सफलता से दर्ज हो गई!",
    preview: {
      calculatedSafeDate: "कब दूध बेच सकते हैं?:",
      withdrawalDays: "कितने दिन इंतज़ार करना होगा:",
      daysText: "दिन दवा खत्म होने के बाद",
    },
  },

  // Milk & Product Safety Check
  withdrawal: {
    title: "दूध सुरक्षित है?",
    subtitle: "दवा दी गई गाय/भैंस का दूध कब बेचना सुरक्षित है",
    safeTitle: "🥛 दूध बेचने के लिए सुरक्षित है",
    safeSub: "पशु के शरीर में दवा का प्रभाव समाप्त हो चुका है।",
    unsafeTitle: "🔴 यह दूध अभी न बेचें",
    unsafeSub: "दवा का असर अभी बाकी है। दूध में दवा का अवशेष हो सकता है।",
    reviewTitle: "🟡 डॉक्टर से जाँच कराएं",
    reviewSub: "दवा के नियम की स्पष्ट जानकारी उपलब्ध नहीं है।",
    safeAfter: "दूध इस तारीख के बाद बेचें:",
    remainingDays: "बाकी दिन:",
    medicineUsed: "दी गई दवाई:",
    treatmentEnded: "दवा खत्म होने की तारीख:",
    allAnimalsSafe: "आपके सभी पशुओं का दूध बेचने के लिए बिल्कुल सुरक्षित है!",
  },

  // Alerts & Notifications
  alerts: {
    title: "ज़रूरी चेतावनियाँ (Alerts)",
    subtitle: "दूध की सुरक्षा और दवा के असर की महत्वपूर्ण चेतावनियाँ",
    critical: "गंभीर चेतावनी 🔴",
    warning: "सावधानी 🟡",
    info: "सूचना 🟢",
    noAlerts: "कोई चेतावनी नहीं है। सब कुछ सुरक्षित है!",
    resolveAlert: "देखा गया (OK)",
  },

  // QR Code Scanner & Public Profile
  qr: {
    scannerTitle: "पशु क्यूआर (QR) जाँच",
    scanSubtitle: "पशु का क्यूआर कोड स्कैन करें या नंबर डालकर दूध की स्थिति देखें",
    enterTokenPlaceholder: "पशु का क्यूआर कोड नंबर लिखें (उदा: QR-COW-102)",
    lookupBtn: "स्थिति जांचें",
    publicProfileTitle: "पशु स्वास्थ्य एवं सुरक्षा प्रमाण-पत्र",
    publicNotice: "सार्वजनिक दूध सुरक्षा स्थिति",
    tagCode: "पशु का नंबर / आईडी:",
    speciesBreed: "प्रकार एवं नस्ल:",
    safetyStatus: "दूध सुरक्षा स्थिति:",
    clearedStatus: "🟢 दूध बेचना सुरक्षित है",
    withdrawalActive: "🔴 अभी दूध बेचना मना है (दवा चालू है)",
    reviewRequired: "🟡 डॉक्टर की सलाह लें",
    disclaimer: "यह प्रमाण-पत्र फार्मशील्ड डिजिटल इंजन द्वारा प्रमाणित है।",
  },

  // Veterinarian Dashboard
  vet: {
    title: "पशु चिकित्सक (Doctor) डैशबोर्ड",
    subtitle: "एंटीबायोटिक दवा उपयोग, एमआरएल (MRL) सीमा और फार्म की जांच",
    assignedFarms: "संबद्ध फार्म",
    activeTreatments: "चालू इलाज",
    complianceRisks: "जोखिम वाले पशु",
    amuTrend: "मासिक एंटीबायोटिक उपयोग",
    topMedicines: "सबसे ज़्यादा इस्तेमाल दवाएं",
    repeatedAlerts: "बार-बार दवा की चेतावनी",
    approveTreatment: "इलाज स्वीकृत करें",
  },

  // Admin Dashboard
  admin: {
    title: "सिस्टम एडमिनिस्ट्रेटर पोर्टल",
    subtitle: "दवाओं की सूची, FSSAI नियम एवं रिकॉर्ड प्रबंधन",
    manageMedicines: "दवाओं की सूची",
    manageRules: "एमआरएल (MRL) नियम",
    addMedicine: "नयी दवा जोड़ें",
    addRule: "नया एमआरएल नियम जोड़ें",
    jurisdiction: "मानक संस्था (उदा: FSSAI भारत)",
    mrlLimit: "अधिकतम सीमा (MRL Limit)",
    withdrawalPeriodDays: "सुरक्षित समय अवधि (दिन)",
  },

  // Common UI Buttons & Labels
  common: {
    cancel: "रद्द करें",
    save: "सुरक्षित करें",
    loading: "लोड हो रहा है...",
    backToHome: "मुख्य पृष्ठ पर जाएं",
    close: "बंद करें",
    refresh: "ताज़ा करें",
    active: "सक्रिय",
    completed: "पूरा हुआ",
    unknown: "अज्ञात",
  },
};
