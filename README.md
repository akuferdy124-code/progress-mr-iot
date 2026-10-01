# 🚀 Portfolio Ferdy Fernando — Progress MR IoT

Website portofolio interaktif dengan Admin Panel untuk update data secara real-time dari HP.

🌐 **Live:** https://ferdy-fernando.vercel.app  
🔧 **Admin Panel:** https://ferdy-fernando.vercel.app/admin  
📦 **GitHub:** https://github.com/akuferdy124-code/progress-mr-iot

---

## 🏗️ Tech Stack

- **Frontend:** React + Vite + TailwindCSS
- **Backend API:** Vercel Serverless Functions (`/api/`)
- **Database:** MongoDB Atlas (`portfolio_db`)
- **Deploy:** Vercel (auto-deploy dari GitHub `main` branch)

---

## 📁 Struktur API

```
api/
├── lib/mongodb.js     → koneksi MongoDB Atlas
├── projects.js        → CRUD proyek (GET, POST, DELETE)
├── journals.js        → CRUD jurnal mingguan (GET, POST, DELETE)
├── skills.js          → CRUD skills (GET, POST, DELETE)
└── auth.js            → verifikasi & ganti password admin
```

---

## 🤖 Panduan untuk Agent: Cara Push ke GitHub

> **PENTING:** Git Portable sudah terinstall di komputer ini tanpa perlu Admin.
> Lokasi: `C:\Users\HYPE AMD\PortableGit\`

### STEP 1 — Set PATH Git di setiap sesi PowerShell baru

```powershell
$env:PATH = "$env:USERPROFILE\PortableGit\bin;$env:USERPROFILE\PortableGit\cmd;" + $env:PATH
```

### STEP 2 — Masuk ke folder proyek

```powershell
cd "C:\Users\HYPE AMD\OneDrive\Dokumen\Arduino\kandangayam__1_\PORTOFOLIO2"
```

### STEP 3 — Verifikasi Git berjalan

```powershell
git --version
# Output: git version 2.46.2.windows.1
```

### STEP 4 — Cek status perubahan

```powershell
git status
```

### STEP 5 — Push ke GitHub

```powershell
git add .
git commit -m "update: deskripsi perubahan kamu"
git push origin main
```

> ✅ Vercel akan otomatis deploy setelah push berhasil (~2 menit).

---

## 🔑 Autentikasi GitHub

Remote sudah terkonfigurasi dengan token:
```
origin → https://akuferdy124-code:<TOKEN>@github.com/akuferdy124-code/progress-mr-iot.git
```

Jika token expired, buat token baru di:
👉 https://github.com/settings/tokens/new  
Scope yang diperlukan: ✅ `repo`

Lalu update remote:
```powershell
git remote set-url origin https://akuferdy124-code:<TOKEN_BARU>@github.com/akuferdy124-code/progress-mr-iot.git
```

---

## ⚙️ Environment Variables di Vercel

Sudah terkonfigurasi di Vercel Dashboard:
- `MONGODB_URI` → MongoDB Atlas connection string

> Jangan tambahkan `.env` ke git! File ini sudah di `.gitignore`.

---

## 🔒 MongoDB Atlas

- **Cluster:** Cluster0 (AWS Singapore)
- **User:** `akuferdy124_db_user`
- **IP Whitelist:** `0.0.0.0/0` (allow from anywhere)
- **Database:** `portfolio_db`
- **Collections:** `projects`, `journals`, `skills`, `settings`

---

## 🔄 Workflow Update Konten

```
Edit kode lokal
    ↓
git add . && git commit -m "..." && git push origin main
    ↓
Vercel auto-deploy (2 menit)
    ↓
https://ferdy-fernando.vercel.app live & updated!
```

Atau update data tanpa coding:
```
Buka https://ferdy-fernando.vercel.app/admin dari HP
    ↓
Login dengan password admin
    ↓
Tambah/Edit/Hapus Proyek / Jurnal / Skills
    ↓
Data langsung tersimpan ke MongoDB → tampil ke dosen!
```

---

## 🛠️ Troubleshooting untuk Agent

| Masalah | Solusi |
|---------|--------|
| `git not recognized` | Jalankan STEP 1 (set PATH) |
| `git push rejected` | Gunakan `git push origin main --force` |
| API 404 di Vercel | Cek `vercel.json` sudah ada route `/api/(.*)` |
| API 500 MongoDB error | Cek IP Whitelist di MongoDB Atlas |
| Token expired | Buat token baru di GitHub Settings |

---

## 📋 Perintah Lengkap Agent (Copy-Paste Siap Pakai)

```powershell
# Setup PATH + masuk folder + push sekaligus
$env:PATH = "$env:USERPROFILE\PortableGit\bin;$env:USERPROFILE\PortableGit\cmd;" + $env:PATH
cd "C:\Users\HYPE AMD\OneDrive\Dokumen\Arduino\kandangayam__1_\PORTOFOLIO2"
git add .
git commit -m "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main
```
