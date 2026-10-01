// ============================================================
// DATA PORTFOLIO FERDY FERNANDO — 2411012007
// D4 Teknik Elektronika — Politeknik Negeri Padang
// CARA TAMBAH DATA (pemula friendly):
// - Tambah JURNAL: copy 1 objek di journalData, ganti isi
// - Tambah PROYEK: copy 1 objek di projectsData, ganti isi
// - Foto: taruh di assets/images/journal/ atau assets/images/projects/
// - Google Drive: ganti "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI" dengan link asli
// ============================================================

// JURNAL BELAJAR — Minggu 1..6 (tambah di bawah untuk Minggu 7 dst)
const journalData = [
  {
    week: "Minggu 1",
    title: "Pengenalan Platform & Setup Mikrokontroler",
    date: "Minggu ke-1",
    summary: "Setup toolchain ESP32-S3 & Arduino IDE, pengujian GPIO digital dan pembacaan sensor analog LDR.",
    progress: "Berhasil melakukan setup toolchain ESP32-S3 & Arduino IDE, pengujian GPIO digital input/output, dan pembacaan sensor analog (LDR & ADC).",
    challenges: "Sedikit kendala pada driver CH340 / CP2102 baud rate serial komunikasi saat flashing firmware pertama kali.",
    result: "Mapping pinout ESP32 & clock internal berhasil dikuasai; rentang ADC stabil setelah kalibrasi.",
    learning: "Memahami mapping pinout mikrokontroler ESP32 secara mendalam dan cara kerja clock internal.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI"
  },
  {
    week: "Minggu 2",
    title: "Kendali Kecepatan Motor DC & Encoder",
    date: "Minggu ke-2",
    summary: "Pembacaan quadrature encoder via PCNT ESP32 dan PWM BTS7960.",
    progress: "Implementasi pembacaan quadrature encoder menggunakan hardware pulse counter (PCNT) ESP32 dan pengujian PWM motor driver BTS7960.",
    challenges: "Noise pada sinyal encoder saat motor ditarik arus tinggi menyebabkan pembacaan RPM melompat-lompat.",
    result: "RPM stabil setelah tambah kapasitor decoupling 100nF & pull-up eksternal.",
    learning: "Perlu penambahan kapasitor decoupling dan resistor pull-up untuk meredam noise encoder.",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI"
  },
  {
    week: "Minggu 3",
    title: "Algoritma Kendali PID Closed-Loop",
    date: "Minggu ke-3",
    summary: "PID dengan anti-windup untuk kestabilan 400 RPM.",
    progress: "Pemrograman algoritma PID (P, I, D) dengan anti-windup untuk kestabilan kecepatan rotasi motor pada 400 RPM.",
    challenges: "Tuning Kp, Ki, Kd agar tidak overshoot atau osilasi.",
    result: "Tuning optimal Kp=2.4, Ki=0.8, Kd=0.12 (Ziegler-Nichols).",
    learning: "Ziegler-Nichols membantu menemukan titik tuning optimal.",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI"
  },
  {
    week: "Minggu 4",
    title: "Perancangan Skematik & Layout PCB",
    date: "Minggu ke-4",
    summary: "Minimum system ESP32 + driver relay di KiCad, DRC check.",
    progress: "Desain rangkaian board minimum system ESP32 dan driver relay menggunakan KiCad, lengkap dengan DRC check.",
    challenges: "Menjaga trace width jalur power 12V/24V agar tidak panas.",
    result: "Ground plane digital-power terpisah; ground bounce hilang.",
    learning: "Pemisahan ground plane digital dan power krusial.",
    images: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI"
  },
  {
    week: "Minggu 5",
    title: "Otomasi Industri Berbasis PLC",
    date: "Minggu ke-5",
    summary: "Ladder Diagram untuk konveyor pemilahan otomatis.",
    progress: "Pemrograman Ladder Diagram untuk sistem konveyor pemilahan barang otomatis menggunakan sensor induktif dan pneumatik.",
    challenges: "Interlock safety agar silinder pneumatik tidak tabrakan.",
    result: "Simulasi sekuensial sempurna sebelum upload ke PLC fisik.",
    learning: "Interlock & simulasi sekuensial wajib sebelum hardware.",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI"
  },
  {
    week: "Minggu 6",
    title: "Integrasi ROS 2 Jazzy & Micro-ROS",
    date: "Minggu ke-6",
    summary: "ESP32 micro-ROS serial transport ke ROS 2.",
    progress: "Menghubungkan mikrokontroler ESP32 ke ekosistem ROS 2 Jazzy via micro-ROS serial transport untuk robot otonom.",
    challenges: "Sinkronisasi waktu antara ESP32 dan host ROS 2.",
    result: "Odometri /odom real-time latensi <15ms.",
    learning: "Time sync krusial untuk TF transform.",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI"
  }
  // TAMBAHKAN JURNAL BARU DI SINI — copy template di atas
];

// Legacy alias agar Home lama tetap jalan
const logbookData = journalData.map(function(j){
  return {
    week: j.week, title: j.title, date: j.date, progress: j.progress,
    challenges: j.challenges, evaluation: j.learning, status: "Selesai",
    images: j.images, googleDrive: j.googleDrive
  };
});

// PROYEK — 01..05 (tambah di bawah untuk Proyek 06 dst)
const projectsData = [
  {
    id: "01-dual-axis-solar-tracking",
    num: "01",
    category: "Solar & Control System",
    title: "Dual Axis Solar Tracking",
    desc: "Sistem solar tracking dua sumbu menggunakan sensor LDR dan kendali PID untuk mengarahkan panel menuju sumber cahaya secara presisi.",
    technologies: ["Arduino Nano", "4 LDR", "2 Servo", "PID Control"],
    tech: ["Arduino Nano", "4 LDR", "2 Servo", "PID Control"],
    status: "Development",
    problem: "Panel surya statis kehilangan potensi daya hingga 40% karena sudut datang sinar matahari berubah.",
    objective: "Merancang pelacak dua sumbu (azimuth & elevasi) otomatis yang selalu tegak lurus cahaya.",
    systemDesign: "4 LDR di 4 kuadran (Atas, Bawah, Kiri, Kanan). MCU baca divider, proses PID, gerakkan 2 servo.",
    hardware: ["Arduino Nano (ATmega328P)", "4x LDR", "2x Servo MG996R", "Panel Surya 10W", "Step Down 5V/3A"],
    result: "Efisiensi +34.8% vs panel statis 15° selama 8 jam (08.00-16.00).",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI",
    projectLink: ""
  },
  {
    id: "02-motor-speed-pid-control",
    num: "02",
    category: "Motor Control & Embedded",
    title: "Motor Speed PID Control",
    desc: "Kendali kecepatan motor presisi tinggi menggunakan feedback encoder kuadratur dan driver BTS7960 berbasis ESP32.",
    technologies: ["ESP32", "BTS7960", "PG45 Motor", "Quadrature Encoder", "PID"],
    tech: ["ESP32", "BTS7960", "PG45 Motor", "Quadrature Encoder", "PID"],
    status: "Development",
    problem: "Kecepatan motor DC tanpa feedback berfluktuasi saat diberi beban.",
    objective: "Mempertahankan RPM konstan sesuai setpoint, overshoot minimal.",
    systemDesign: "Encoder baca pulsa A/B → hitung RPM → PID 100Hz → PWM BTS7960.",
    hardware: ["ESP32 DevKit V1", "BTS7960 43A", "PG45 Encoder 11 PPR", "Power Supply 24V 10A"],
    result: "Settling <250ms, overshoot <4.5%, error 0 RPM saat dibebani.",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI",
    projectLink: ""
  },
  {
    id: "03-robotics-platform",
    num: "03",
    category: "Robotics & ROS 2",
    title: "Robotics Platform",
    desc: "Platform robotika mobile untuk autonomous navigation, odometry, dan integrasi ROS 2 Jazzy.",
    technologies: ["ESP32", "Motor Controller", "Encoder", "ROS 2 Jazzy", "Python", "C++"],
    tech: ["ESP32", "Motor Controller", "Encoder", "ROS 2 Jazzy", "Python", "C++"],
    status: "Development",
    problem: "Butuh base modular low-level motor + high-level ROS 2.",
    objective: "Banguni Differential Drive terintegrasi ROS 2.",
    systemDesign: "ESP32: PID + odometri + micro-ROS Serial. SBC: SLAM & perencanaan jalur.",
    hardware: ["ESP32-S3 Dual Core", "2x PG45 + Encoder", "Chassis Aluminium", "LiFePO4 12.8V 6Ah"],
    result: "Akurasi odometri 98.2%, integrasi rviz2 transparan.",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI",
    projectLink: ""
  },
  {
    id: "04-plc-automation",
    num: "04",
    category: "Industrial Automation",
    title: "PLC Industrial Automation",
    desc: "Otomasi PLC untuk sekuens sensor dan aktuator industri presisi tinggi.",
    technologies: ["PLC", "Sensors", "Actuators", "Ladder Logic"],
    tech: ["PLC", "Sensors", "Actuators", "Ladder Logic"],
    status: "Completed",
    problem: "Pemilahan manual lambat & human error.",
    objective: "Otomatisasi pemilahan logam/non-logam & pneumatik.",
    systemDesign: "Sensor induktif/optik → PLC Ladder → Solenoid pneumatik.",
    hardware: ["PLC Out Transistor/Relay", "Sensor Induktif & Photoelectric", "Silinder Double Acting + 5/2 Way", "Motor Konveyor 24V"],
    result: "1.2 detik/objek, keandalan 100% (500 cycle).",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI",
    projectLink: ""
  },
  {
    id: "05-smart-electrical-system",
    num: "05",
    category: "Power & Embedded Monitoring",
    title: "Smart Electrical System",
    desc: "Monitoring & kontrol parameter listrik AC via PZEM-004T, ESP32, dan OLED.",
    technologies: ["PZEM-004T", "ESP32", "OLED", "Automation"],
    tech: ["PZEM-004T", "ESP32", "OLED", "Automation"],
    status: "Development",
    problem: "Monitoring daya/arus/faktor daya tanpa telemetry real-time.",
    objective: "Pembaca V, I, P, Energy, Power Factor presisi + proteksi overcurrent.",
    systemDesign: "PZEM-004T CT → ESP32 UART → OLED + Relay cut-off.",
    hardware: ["ESP32", "PZEM-004T v3.0 + CT 100A", "OLED 0.96 I2C SSD1306", "Relay 30A"],
    result: "Akurasi 99.1% vs Fluke DMM (100W-1500W).",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    googleDrive: "MASUKKAN_LINK_GOOGLE_DRIVE_DI_SINI",
    projectLink: ""
  }
  // TAMBAHKAN PROYEK BARU DI SINI — copy template di atas
];
