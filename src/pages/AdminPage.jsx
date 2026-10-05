import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, Plus, Edit2, Trash2, Key, FolderKanban, BookOpen, Wrench, ArrowLeft, Check, AlertCircle, User, Image, FileText, Loader2 } from 'lucide-react';
import { compressImageFile, formatGoogleDriveUrl } from '../utils/imageCompressor';

export const AdminPage = () => {
  const {
    projects,
    saveProject,
    deleteProject,
    journals,
    saveJournal,
    deleteJournal,
    skills,
    saveSkill,
    deleteSkill,
    aboutPhoto,
    updateAboutPhoto,
    profileBio,
    updateBio,
    galleryPhotos,
    saveGalleryPhotos,
    verifyPassword,
    changePassword,
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('projek'); // 'projek' | 'jurnal' | 'skills' | 'sandi' | 'profil'
  const [statusMsg, setStatusMsg] = useState(null);

  // PROFIL FORM STATE
  const [bioForm, setBioForm] = useState({ bio1: '', bio2: '' });
  const [bioEditMode, setBioEditMode] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);

  // PROJECT FORM STATE
  const [pEditId, setPEditId] = useState(null);
  const [pForm, setPForm] = useState({
    title: '',
    category: '',
    status: 'Development',
    technologies: '',
    googleDrive: '',
    desc: '',
    problem: '',
    result: '',
    images: [],
  });

  // JOURNAL FORM STATE
  const [jEditIndex, setJEditIndex] = useState(null);
  const [jForm, setJForm] = useState({
    week: '',
    date: '',
    title: '',
    googleDrive: '',
    summary: '',
    progress: '',
    challenges: '',
    result: '',
    learning: '',
    images: [],
  });

  // SKILL FORM STATE
  const [sEditIndex, setSEditIndex] = useState(null);
  const [sForm, setSForm] = useState({
    name: '',
    icon: '',
  });

  // PASSWORD CHANGE FORM STATE
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const flashMessage = (text, isError = false) => {
    setStatusMsg({ text, isError });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = await verifyPassword(passwordInput);
    if (isValid) {
      setIsAuthenticated(true);
      setLoginError(false);
      flashMessage('Berhasil masuk ke Admin Panel');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Multiple image upload helper using FileReader
  const handleImageUpload = (files, callback) => {
    const readers = [];
    const newImages = [];
    Array.from(files).forEach((file) => {
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(readers).then((results) => {
      callback(results);
    });
  };

  // --- PROJECT ACTIONS ---
  const handleEditProject = (proj) => {
    setPEditId(proj.id);
    setPForm({
      title: proj.title || '',
      category: proj.category || '',
      status: proj.status || 'Development',
      technologies: (proj.technologies || []).join(', '),
      googleDrive: proj.googleDrive || '',
      desc: proj.desc || '',
      problem: proj.problem || '',
      result: proj.result || '',
      images: proj.images || [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!pForm.title) {
      flashMessage('Judul proyek tidak boleh kosong!', true);
      return;
    }

    const techArray = pForm.technologies
      ? pForm.technologies.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const projectData = {
      ...pForm,
      technologies: techArray,
      tech: techArray,
      id: pEditId || `proj-${Date.now()}`,
    };

    saveProject(projectData);
    setPEditId(null);
    setPForm({
      title: '',
      category: '',
      status: 'Development',
      technologies: '',
      googleDrive: '',
      desc: '',
      problem: '',
      result: '',
      images: [],
    });
    flashMessage(pEditId ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!');
  };

  // --- JOURNAL ACTIONS ---
  const handleEditJournal = (journal, idx) => {
    setJEditIndex(idx);
    setJForm({
      week: journal.week || '',
      date: journal.date || '',
      title: journal.title || '',
      googleDrive: journal.googleDrive || '',
      summary: journal.summary || '',
      progress: journal.progress || '',
      challenges: journal.challenges || '',
      result: journal.result || '',
      learning: journal.learning || '',
      images: journal.images || [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveJournal = (e) => {
    e.preventDefault();
    if (!jForm.title || !jForm.week) {
      flashMessage('Minggu & Judul jurnal wajib diisi!', true);
      return;
    }

    saveJournal(jForm, jEditIndex);
    setJEditIndex(null);
    setJForm({
      week: '',
      date: '',
      title: '',
      googleDrive: '',
      summary: '',
      progress: '',
      challenges: '',
      result: '',
      learning: '',
      images: [],
    });
    flashMessage(jEditIndex !== null ? 'Jurnal berhasil diperbarui!' : 'Jurnal baru berhasil ditambahkan!');
  };

  // --- SKILL ACTIONS ---
  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (!sForm.name || !sForm.icon) {
      flashMessage('Nama & Icon URL wajib diisi!', true);
      return;
    }

    saveSkill(sForm, sEditIndex);
    setSEditIndex(null);
    setSForm({ name: '', icon: '' });
    flashMessage(sEditIndex !== null ? 'Skill diperbarui!' : 'Skill baru ditambahkan!');
  };

  // --- CHANGE PASSWORD ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      flashMessage('Kata sandi baru dan konfirmasi tidak cocok!', true);
      return;
    }
    if (newPass.length < 4) {
      flashMessage('Kata sandi minimal 4 karakter!', true);
      return;
    }
    const success = await changePassword(oldPass, newPass);
    if (success) {
      flashMessage('Kata sandi berhasil diubah!');
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      flashMessage('Kata sandi lama salah!', true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-[#121622] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-2 text-white">
            <Shield className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-black uppercase tracking-tight">Admin HP</h1>
          </div>
          <p className="text-xs text-white/60 mb-6">
            Kelola Proyek, Jurnal, dan Skills dari HP / Browser secara real-time.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-white/50 block mb-1">Kata Sandi</label>
              <input
                type="password"
                placeholder="Masukkan kata sandi..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white transition-all"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Kata sandi salah. Coba lagi.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-white text-black py-3 text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg active:scale-95"
            >
              Masuk
            </button>
          </form>

          <Link
            to="/"
            className="flex items-center justify-center gap-1 text-xs text-white/40 mt-6 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Portofolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-white" />
          <h1 className="font-black uppercase text-base sm:text-lg text-white">
            Admin Panel HP
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xs px-3.5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            Lihat Web
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs px-3.5 py-2 rounded-full bg-white text-black font-black uppercase tracking-wider hover:bg-white/80 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Floating Alert Message */}
      {statusMsg && (
        <div
          className={`fixed top-20 right-4 z-50 px-5 py-3 rounded-2xl border shadow-2xl flex items-center gap-2 text-sm font-medium animate-fadeIn ${
            statusMsg.isError
              ? 'bg-red-950/90 border-red-500 text-red-200'
              : 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
          }`}
        >
          {statusMsg.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {statusMsg.text}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-4">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('projek')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              activeTab === 'projek' ? 'bg-white text-black shadow-lg scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" /> Etalase Proyek ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('jurnal')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              activeTab === 'jurnal' ? 'bg-white text-black shadow-lg scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Jurnal ({journals.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              activeTab === 'skills' ? 'bg-white text-black shadow-lg scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" /> Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab('sandi')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              activeTab === 'sandi' ? 'bg-white text-black shadow-lg scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Key className="w-3.5 h-3.5" /> Sandi
          </button>
          <button
            onClick={() => { setActiveTab('profil'); setBioForm({ bio1: profileBio?.bio1 || '', bio2: profileBio?.bio2 || '' }); }}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all ${
              activeTab === 'profil' ? 'bg-white text-black shadow-lg scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Profil & Foto
          </button>
        </div>

        {/* ================= TAB 1: PROJEK ================= */}
        {activeTab === 'projek' && (
          <div className="space-y-8">
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="font-black uppercase text-base sm:text-lg text-white mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                {pEditId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h2>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Judul Proyek</label>
                    <input
                      placeholder="Cth: Dual Axis Solar Tracking"
                      value={pForm.title}
                      onChange={(e) => setPForm({ ...pForm, title: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Kategori</label>
                    <input
                      placeholder="Cth: Robotics & Control"
                      value={pForm.category}
                      onChange={(e) => setPForm({ ...pForm, category: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Status</label>
                    <select
                      value={pForm.status}
                      onChange={(e) => setPForm({ ...pForm, status: e.target.value })}
                      className="w-full rounded-xl bg-[#0C0C0C] border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    >
                      <option value="Development">Development</option>
                      <option value="Completed">Completed</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Teknologi (pisahkan koma)</label>
                    <input
                      placeholder="ESP32, PID, BTS7960, C++"
                      value={pForm.technologies}
                      onChange={(e) => setPForm({ ...pForm, technologies: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/50 block mb-1">Link Google Drive Dokumentasi</label>
                    <input
                      placeholder="https://drive.google.com/..."
                      value={pForm.googleDrive}
                      onChange={(e) => setPForm({ ...pForm, googleDrive: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/50 block mb-1">Deskripsi Singkat</label>
                    <textarea
                      placeholder="Ringkasan cara kerja proyek..."
                      rows={2}
                      value={pForm.desc}
                      onChange={(e) => setPForm({ ...pForm, desc: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Masalah / Latar Belakang</label>
                    <textarea
                      placeholder="Masalah yang diselesaikan..."
                      rows={2}
                      value={pForm.problem}
                      onChange={(e) => setPForm({ ...pForm, problem: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Hasil & Capaian</label>
                    <textarea
                      placeholder="Hasil pengujian performa..."
                      rows={2}
                      value={pForm.result}
                      onChange={(e) => setPForm({ ...pForm, result: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Upload Foto */}
                <div className="pt-2">
                  <label className="text-xs text-white/50 block mb-1">
                    Foto Dokumentasi (Upload langsung dari HP / Galeri)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length) {
                        handleImageUpload(e.target.files, (newImages) => {
                          setPForm((prev) => ({
                            ...prev,
                            images: [...prev.images, ...newImages],
                          }));
                        });
                      }
                    }}
                    className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />

                  {/* Image previews */}
                  {pForm.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {pForm.images.map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20 group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setPForm((prev) => ({
                                ...prev,
                                images: prev.images.filter((_, idx) => idx !== i),
                              }))
                            }
                            className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-black uppercase tracking-wider hover:bg-white/90 transition-all shadow-md active:scale-95"
                  >
                    {pEditId ? 'Simpan Perubahan' : 'Tambah Proyek'}
                  </button>
                  {pEditId && (
                    <button
                      type="button"
                      onClick={() => {
                        setPEditId(null);
                        setPForm({
                          title: '',
                          category: '',
                          status: 'Development',
                          technologies: '',
                          googleDrive: '',
                          desc: '',
                          problem: '',
                          result: '',
                          images: [],
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Projects List */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white/70">
                Daftar Proyek Aktif ({projects.length})
              </h3>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#121622] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xl text-white/40">{proj.num}</span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{proj.title}</h4>
                      <p className="text-xs text-white/50">{proj.category} · {proj.status}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleEditProject(proj)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Edit Proyek"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus proyek "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          flashMessage('Proyek berhasil dihapus.');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: JURNAL ================= */}
        {activeTab === 'jurnal' && (
          <div className="space-y-8">
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="font-black uppercase text-base sm:text-lg text-white mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                {jEditIndex !== null ? 'Edit Jurnal' : 'Tambah Jurnal Mingguan'}
              </h2>

              <form onSubmit={handleSaveJournal} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Minggu</label>
                    <input
                      placeholder="Cth: Minggu 7"
                      value={jForm.week}
                      onChange={(e) => setJForm({ ...jForm, week: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Keterangan Waktu</label>
                    <input
                      placeholder="Cth: Minggu ke-7"
                      value={jForm.date}
                      onChange={(e) => setJForm({ ...jForm, date: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/50 block mb-1">Judul Jurnal</label>
                    <input
                      placeholder="Cth: Implementasi SLAM & Nav2 Robotik"
                      value={jForm.title}
                      onChange={(e) => setJForm({ ...jForm, title: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/50 block mb-1">Link Google Drive</label>
                    <input
                      placeholder="https://drive.google.com/..."
                      value={jForm.googleDrive}
                      onChange={(e) => setJForm({ ...jForm, googleDrive: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/50 block mb-1">Ringkasan</label>
                    <textarea
                      placeholder="Ringkasan materi minggu ini..."
                      rows={2}
                      value={jForm.summary}
                      onChange={(e) => setJForm({ ...jForm, summary: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Progres Yang Dicapai</label>
                    <textarea
                      placeholder="Detail progres pengerjaan..."
                      rows={2}
                      value={jForm.progress}
                      onChange={(e) => setJForm({ ...jForm, progress: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Kendala & Tantangan</label>
                    <textarea
                      placeholder="Masalah hardware/firmware..."
                      rows={2}
                      value={jForm.challenges}
                      onChange={(e) => setJForm({ ...jForm, challenges: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Hasil</label>
                    <textarea
                      placeholder="Hasil pengujian..."
                      rows={2}
                      value={jForm.result}
                      onChange={(e) => setJForm({ ...jForm, result: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Pembelajaran Penting</label>
                    <textarea
                      placeholder="Pelajaran yang didapatkan..."
                      rows={2}
                      value={jForm.learning}
                      onChange={(e) => setJForm({ ...jForm, learning: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Upload Foto Jurnal */}
                <div className="pt-2">
                  <label className="text-xs text-white/50 block mb-1">
                    Foto Dokumentasi Praktikum / Percobaan
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length) {
                        handleImageUpload(e.target.files, (newImages) => {
                          setJForm((prev) => ({
                            ...prev,
                            images: [...prev.images, ...newImages],
                          }));
                        });
                      }
                    }}
                    className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />

                  {jForm.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {jForm.images.map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setJForm((prev) => ({
                                ...prev,
                                images: prev.images.filter((_, idx) => idx !== i),
                              }))
                            }
                            className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-black uppercase tracking-wider hover:bg-white/90 transition-all shadow-md active:scale-95"
                  >
                    {jEditIndex !== null ? 'Simpan Perubahan Jurnal' : 'Tambah Jurnal'}
                  </button>
                  {jEditIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setJEditIndex(null);
                        setJForm({
                          week: '',
                          date: '',
                          title: '',
                          googleDrive: '',
                          summary: '',
                          progress: '',
                          challenges: '',
                          result: '',
                          learning: '',
                          images: [],
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Journal List */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white/70">
                Daftar Jurnal Belajar ({journals.length})
              </h3>
              {journals.map((j, idx) => (
                <div
                  key={idx}
                  className="bg-[#121622] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 transition-all"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                      {j.week} — {j.date}
                    </span>
                    <h4 className="font-bold text-sm text-white mt-0.5">{j.title}</h4>
                    <p className="text-xs text-white/50 line-clamp-1">{j.summary}</p>
                  </div>

                  <div className="flex gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleEditJournal(j, idx)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Edit Jurnal"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus catatan "${j.week} - ${j.title}"?`)) {
                          deleteJournal(idx);
                          flashMessage('Jurnal berhasil dihapus.');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                      title="Hapus Jurnal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SKILLS ================= */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="font-black uppercase text-base sm:text-lg text-white mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                {sEditIndex !== null ? 'Edit Skill' : 'Tambah Skill / Tools'}
              </h2>

              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Nama Skill</label>
                    <input
                      placeholder="Cth: FreeRTOS, Next.js, SolidWorks"
                      value={sForm.name}
                      onChange={(e) => setSForm({ ...sForm, name: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Icon URL (SVG / PNG)</label>
                    <input
                      placeholder="https://cdn.simpleicons.org/... atau link gambar"
                      value={sForm.icon}
                      onChange={(e) => setSForm({ ...sForm, icon: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-black uppercase tracking-wider hover:bg-white/90 transition-all shadow-md active:scale-95"
                  >
                    {sEditIndex !== null ? 'Simpan Perubahan' : 'Tambah Skill'}
                  </button>
                  {sEditIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setSEditIndex(null);
                        setSForm({ name: '', icon: '' });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-[#121622] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center relative group"
                >
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain mb-2" />
                  <p className="text-xs font-bold uppercase text-white">{skill.name}</p>

                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setSEditIndex(idx);
                        setSForm(skill);
                      }}
                      className="p-1 rounded-lg bg-white/10 text-white hover:bg-white/20"
                      title="Edit"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus skill "${skill.name}"?`)) {
                          deleteSkill(idx);
                          flashMessage('Skill dihapus.');
                        }
                      }}
                      className="p-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                      title="Hapus"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SANDI ================= */}
        {activeTab === 'sandi' && (
          <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg mx-auto shadow-xl">
            <h2 className="font-black uppercase text-base sm:text-lg text-white mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" /> Ganti Kata Sandi Admin
            </h2>
            <p className="text-xs text-white/50 mb-6">
              Ubah kata sandi untuk melindungi dashboard Admin HP dari akses tidak berizin.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1">Kata Sandi Saat Ini</label>
                <input
                  type="password"
                  placeholder="Sandi lama..."
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-white/50 block mb-1">Kata Sandi Baru</label>
                <input
                  type="password"
                  placeholder="Sandi baru..."
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-white/50 block mb-1">Konfirmasi Kata Sandi Baru</label>
                <input
                  type="password"
                  placeholder="Ulangi sandi baru..."
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 rounded-xl bg-white text-black py-3 text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-md active:scale-95"
              >
                Simpan Sandi Baru
              </button>
            </form>
          </div>
        )}
        {/* ================= TAB 5: PROFIL & FOTO ================= */}
        {activeTab === 'profil' && (
          <div className="space-y-8">

            {/* --- FOTO PROFIL --- */}
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="font-black uppercase text-base sm:text-lg text-white mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-sky-400" /> Foto Profil (About)
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative shrink-0">
                  <img
                    src={aboutPhoto}
                    alt="Foto Profil"
                    className="w-28 h-28 rounded-2xl object-cover border border-white/20"
                  />
                  {photoUploading && (
                    <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center text-white text-xs gap-1">
                      <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
                      <span>Menyimpan...</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Upload Foto dari HP / Galeri (Otomatis Kompres & Cepat)</label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={photoUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setPhotoUploading(true);
                        try {
                          flashMessage('Mengompres foto profil...');
                          const compressed = await compressImageFile(file, 1000, 1000, 0.82);
                          flashMessage('Menyimpan ke database...');
                          await updateAboutPhoto(compressed);
                          flashMessage('✅ Foto profil berhasil disimpan permanen!');
                        } catch (err) {
                          alert(`Gagal menyimpan foto: ${err.message}`);
                          flashMessage('❌ Gagal menyimpan foto');
                        } finally {
                          setPhotoUploading(false);
                          e.target.value = '';
                        }
                      }}
                      className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Atau masukkan URL foto (Google Drive / link langsung)</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... atau link foto"
                        id="photoUrlInput"
                        disabled={photoUploading}
                        className="flex-1 rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                      />
                      <button
                        type="button"
                        disabled={photoUploading}
                        onClick={async () => {
                          const inputEl = document.getElementById('photoUrlInput');
                          const rawUrl = inputEl?.value?.trim();
                          if (!rawUrl) return;
                          setPhotoUploading(true);
                          try {
                            const formatted = formatGoogleDriveUrl(rawUrl);
                            flashMessage('Menyimpan foto...');
                            await updateAboutPhoto(formatted);
                            inputEl.value = '';
                            flashMessage('✅ Foto profil berhasil disimpan!');
                          } catch (err) {
                            alert(`Gagal menyimpan foto: ${err.message}`);
                          } finally {
                            setPhotoUploading(false);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-black uppercase hover:bg-white/90 transition-all disabled:opacity-50"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- BIO / DESKRIPSI --- */}
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="font-black uppercase text-base sm:text-lg text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" /> Bio & Deskripsi
              </h2>
              {!bioEditMode ? (
                <div className="space-y-3">
                  <p className="text-sm text-white/80 leading-relaxed bg-white/5 rounded-xl p-4">{profileBio?.bio1}</p>
                  <p className="text-sm text-white/50 leading-relaxed bg-white/5 rounded-xl p-4">{profileBio?.bio2}</p>
                  <button
                    onClick={() => { setBioForm({ bio1: profileBio?.bio1 || '', bio2: profileBio?.bio2 || '' }); setBioEditMode(true); }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/10 text-sm font-semibold hover:bg-white/20 transition-all"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Bio
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Paragraf 1 (Utama)</label>
                    <textarea
                      rows={4}
                      value={bioForm.bio1}
                      onChange={(e) => setBioForm({ ...bioForm, bio1: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Paragraf 2 (Detail Teknis)</label>
                    <textarea
                      rows={3}
                      value={bioForm.bio2}
                      onChange={(e) => setBioForm({ ...bioForm, bio2: e.target.value })}
                      className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={async () => {
                        await updateBio(bioForm.bio1, bioForm.bio2);
                        setBioEditMode(false);
                        flashMessage('Bio berhasil diperbarui!');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-black uppercase hover:bg-white/90 transition-all"
                    >
                      Simpan Bio
                    </button>
                    <button
                      type="button"
                      onClick={() => setBioEditMode(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- FOTO GALERI (Marquee) --- */}
            <div className="bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="font-black uppercase text-base sm:text-lg text-white mb-1 flex items-center gap-2">
                <Image className="w-4 h-4 text-emerald-400" /> Foto Galeri Homepage
              </h2>
              <p className="text-xs text-white/40 mb-4">Foto-foto ini tampil di slideshow/marquee bawah homepage. Upload dari HP atau masukkan URL.</p>

              {/* Add new photo */}
              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs text-white/50 block mb-1">Upload Foto Baru dari HP (Otomatis Kompres & Cepat)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={photoUploading}
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || !files.length) return;
                      setPhotoUploading(true);
                      try {
                        flashMessage(`Mengompres ${files.length} foto...`);
                        const compressedList = await Promise.all(
                          Array.from(files).map((f) => compressImageFile(f, 1000, 800, 0.8))
                        );
                        flashMessage('Menyimpan ke database...');
                        const updated = [...galleryPhotos, ...compressedList];
                        await saveGalleryPhotos(updated);
                        flashMessage(`✅ ${compressedList.length} foto galeri berhasil ditambahkan!`);
                      } catch (err) {
                        alert(`Gagal menyimpan foto galeri: ${err.message}`);
                      } finally {
                        setPhotoUploading(false);
                        e.target.value = '';
                      }
                    }}
                    className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Atau tambah via URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://... link foto proyek kamu"
                      value={newGalleryUrl}
                      disabled={photoUploading}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="flex-1 rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white"
                    />
                    <button
                      type="button"
                      disabled={photoUploading}
                      onClick={async () => {
                        if (!newGalleryUrl.trim()) return;
                        setPhotoUploading(true);
                        try {
                          const formatted = formatGoogleDriveUrl(newGalleryUrl.trim());
                          const updated = [...galleryPhotos, formatted];
                          await saveGalleryPhotos(updated);
                          setNewGalleryUrl('');
                          flashMessage('✅ Foto galeri ditambahkan!');
                        } catch (err) {
                          alert(`Gagal menambah foto: ${err.message}`);
                        } finally {
                          setPhotoUploading(false);
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-black uppercase hover:bg-white/90 transition-all disabled:opacity-50"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <h3 className="font-bold text-xs uppercase tracking-wider text-white/50 mb-3">
                Foto Saat Ini ({galleryPhotos.length})
                {galleryPhotos.length === 0 && <span className="ml-2 text-white/30 normal-case font-normal">— kosong, menampilkan foto bawaan</span>}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {galleryPhotos.map((photo, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-white/10 group aspect-video">
                    <img src={photo} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={async () => {
                          if (window.confirm(`Hapus foto galeri #${idx + 1}?`)) {
                            const updated = galleryPhotos.filter((_, i) => i !== idx);
                            await saveGalleryPhotos(updated);
                            flashMessage('Foto dihapus dari galeri.');
                          }
                        }}
                        className="p-2 rounded-xl bg-red-600 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-lg">#{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
