import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProjectsData, initialJournalData, initialSkillsList, dynamicTechVisuals } from '../data/portfolioData';

const DEFAULT_BIO1 = 'Politeknik Negeri Padang — Berfokus pada Robotika, Embedded System, Otomasi Industri, Kontrol PID, dan Elektronika Terapan. Berkomitmen mengembangkan perangkat keras dan firmware mikrokontroler yang tidak hanya fungsional secara teknis, tetapi juga efisien dan presisi.';
const DEFAULT_BIO2 = 'Terbiasa merancang solusi dari level skematik & layout PCB di KiCad, firmware mikrokontroler (ESP32-S3 / STM32 / Arduino C++), hingga integrasi sistem tingkat lanjut seperti micro-ROS 2 Jazzy dan PLC Ladder Diagram.';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('ferdy_projects_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialProjectsData;
  });

  const [journals, setJournals] = useState(() => {
    try {
      const saved = localStorage.getItem('ferdy_journal_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialJournalData;
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('ferdy_skills_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialSkillsList;
  });

  const [aboutPhoto, setAboutPhoto] = useState(() => {
    try {
      return (
        localStorage.getItem('ferdy_about_photo') ||
        localStorage.getItem('ferdy_profile_photo') ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
      );
    } catch (e) {
      return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80';
    }
  });

  const [dailyPhotos, setDailyPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('ferdy_daily_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', title: 'Ferdy Fernando — Daily', tag: 'Photo #1' },
      { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', title: 'Lab Session PNP', tag: 'Photo #2' },
      { src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80', title: 'Embedded & Robotics Work', tag: 'Photo #3' },
    ];
  });

  const [profileBio, setProfileBio] = useState(() => {
    try {
      const saved = localStorage.getItem('ferdy_profile_bio');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { bio1: DEFAULT_BIO1, bio2: DEFAULT_BIO2 };
  });

  const [galleryPhotos, setGalleryPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('ferdy_gallery_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const [isDbConnected, setIsDbConnected] = useState(false);

  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`LocalStorage quota exceeded for ${key}, skipping local cache:`, e);
    }
  };

  // Sync data from MongoDB Atlas API
  const refreshFromDb = useCallback(async () => {
    try {
      // 1. Projects
      try {
        const resP = await fetch('/api/projects');
        if (resP.ok) {
          const dataP = await resP.json();
          if (Array.isArray(dataP) && dataP.length > 0) {
            setProjects(dataP);
            safeSetItem('ferdy_projects_v2', JSON.stringify(dataP));
            setIsDbConnected(true);
          }
        }
      } catch (errP) {
        console.warn('Projects sync error:', errP);
      }

      // 2. Journals
      try {
        const resJ = await fetch('/api/journals');
        if (resJ.ok) {
          const dataJ = await resJ.json();
          if (Array.isArray(dataJ) && dataJ.length > 0) {
            setJournals(dataJ);
            safeSetItem('ferdy_journal_v2', JSON.stringify(dataJ));
          }
        }
      } catch (errJ) {
        console.warn('Journals sync error:', errJ);
      }

      // 3. Skills
      try {
        const resS = await fetch('/api/skills');
        if (resS.ok) {
          const dataS = await resS.json();
          if (Array.isArray(dataS) && dataS.length > 0) {
            setSkills(dataS);
            safeSetItem('ferdy_skills_v2', JSON.stringify(dataS));
          }
        }
      } catch (errS) {
        console.warn('Skills sync error:', errS);
      }

      // 4. Profile (photo, bio, gallery)
      try {
        const resProf = await fetch('/api/profile');
        if (resProf.ok) {
          const prof = await resProf.json();
          if (prof.photo) {
            setAboutPhoto(prof.photo);
            safeSetItem('ferdy_about_photo', prof.photo);
            safeSetItem('ferdy_profile_photo', prof.photo);
          }
          if (prof.bio1 || prof.bio2) {
            const bio = { bio1: prof.bio1 || DEFAULT_BIO1, bio2: prof.bio2 || DEFAULT_BIO2 };
            setProfileBio(bio);
            safeSetItem('ferdy_profile_bio', JSON.stringify(bio));
          }
          if (Array.isArray(prof.galleryPhotos) && prof.galleryPhotos.length > 0) {
            setGalleryPhotos(prof.galleryPhotos);
            safeSetItem('ferdy_gallery_photos', JSON.stringify(prof.galleryPhotos));
          }
        }
      } catch (errProf) {
        console.warn('Profile sync error:', errProf);
      }
    } catch (err) {
      console.warn('API sync warning (using cached data):', err);
    }
  }, []);

  useEffect(() => {
    refreshFromDb();
  }, [refreshFromDb]);

  // Modal actions
  const openProjectModal = (project) => {
    setModalState({ isOpen: true, type: 'project', data: project });
    document.body.style.overflow = 'hidden';
  };

  const openJournalModal = (journal) => {
    setModalState({ isOpen: true, type: 'journal', data: journal });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
    document.body.style.overflow = '';
  };

  // Projects CRUD (MongoDB + LocalStorage)
  const saveProject = async (projectData) => {
    const nextNum = projectData.num || String(projects.length + 1).padStart(2, '0');
    const finalData = {
      ...projectData,
      id: projectData.id || `proj-${Date.now()}`,
      num: nextNum,
    };

    // Optimistic UI update
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === finalData.id);
      const updated = idx >= 0 ? [...prev] : [finalData, ...prev];
      if (idx >= 0) updated[idx] = finalData;
      localStorage.setItem('ferdy_projects_v2', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      refreshFromDb();
    } catch (e) {
      console.error('Error saving project to MongoDB:', e);
    }
  };

  const deleteProject = async (id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('ferdy_projects_v2', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      refreshFromDb();
    } catch (e) {
      console.error('Error deleting project from MongoDB:', e);
    }
  };

  // Journals CRUD (MongoDB + LocalStorage)
  const saveJournal = async (journalData, editIndex = null) => {
    setJournals((prev) => {
      let updated;
      if (editIndex !== null && editIndex >= 0 && editIndex < prev.length) {
        updated = [...prev];
        updated[editIndex] = { ...prev[editIndex], ...journalData };
      } else {
        updated = [journalData, ...prev];
      }
      localStorage.setItem('ferdy_journal_v2', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch('/api/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journalData),
      });
      refreshFromDb();
    } catch (e) {
      console.error('Error saving journal to MongoDB:', e);
    }
  };

  const deleteJournal = async (indexOrWeek) => {
    const target = typeof indexOrWeek === 'number' ? journals[indexOrWeek]?.week : indexOrWeek;
    if (!target) return;

    setJournals((prev) => {
      const updated = prev.filter((j) => j.week !== target);
      localStorage.setItem('ferdy_journal_v2', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`/api/journals?week=${encodeURIComponent(target)}`, {
        method: 'DELETE',
      });
      refreshFromDb();
    } catch (e) {
      console.error('Error deleting journal from MongoDB:', e);
    }
  };

  // Skills CRUD (MongoDB + LocalStorage)
  const saveSkill = async (skillData, editIndex = null) => {
    setSkills((prev) => {
      let updated;
      if (editIndex !== null && editIndex >= 0 && editIndex < prev.length) {
        updated = [...prev];
        updated[editIndex] = { ...prev[editIndex], ...skillData };
      } else {
        updated = [...prev, skillData];
      }
      localStorage.setItem('ferdy_skills_v2', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      refreshFromDb();
    } catch (e) {
      console.error('Error saving skill to MongoDB:', e);
    }
  };

  const deleteSkill = async (indexOrName) => {
    const target = typeof indexOrName === 'number' ? skills[indexOrName]?.name : indexOrName;
    if (!target) return;

    setSkills((prev) => {
      const updated = prev.filter((s) => s.name !== target);
      localStorage.setItem('ferdy_skills_v2', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`/api/skills?name=${encodeURIComponent(target)}`, {
        method: 'DELETE',
      });
      refreshFromDb();
    } catch (e) {
      console.error('Error deleting skill from MongoDB:', e);
    }
  };

  // Profile photo update (saved to MongoDB)
  const updateAboutPhoto = async (photoUrl) => {
    setAboutPhoto(photoUrl);
    safeSetItem('ferdy_about_photo', photoUrl);
    safeSetItem('ferdy_profile_photo', photoUrl);

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field: 'profile_photo', value: photoUrl }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server status ${res.status}`);
      }
      return { success: true };
    } catch (e) {
      console.error('Error saving profile photo to DB:', e);
      throw e;
    }
  };

  // Bio update
  const updateBio = async (bio1, bio2) => {
    const newBio = { bio1, bio2 };
    setProfileBio(newBio);
    safeSetItem('ferdy_profile_bio', JSON.stringify(newBio));
    try {
      const [r1, r2] = await Promise.all([
        fetch('/api/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ field: 'bio1', value: bio1 }) }),
        fetch('/api/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ field: 'bio2', value: bio2 }) }),
      ]);
      if (!r1.ok || !r2.ok) {
        throw new Error('Gagal menyimpan bio ke server');
      }
      return { success: true };
    } catch (e) {
      console.error('Error saving bio:', e);
      throw e;
    }
  };

  // Gallery photos update
  const saveGalleryPhotos = async (photos) => {
    setGalleryPhotos(photos);
    safeSetItem('ferdy_gallery_photos', JSON.stringify(photos));
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field: 'gallery_photos', value: photos }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server status ${res.status}`);
      }
      return { success: true };
    } catch (e) {
      console.error('Error saving gallery:', e);
      throw e;
    }
  };

  // Auth (MongoDB + LocalStorage fallback)
  const verifyPassword = async (inputPass) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', password: inputPass }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.valid === true;
      }
    } catch (e) {}

    // Fallback to local
    const savedPass = localStorage.getItem('ferdy_admin_pass') || '2411012007';
    return inputPass === savedPass;
  };

  const changePassword = async (oldPass, newPass) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change', password: oldPass, newPassword: newPass }),
      });
      if (res.ok) {
        localStorage.setItem('ferdy_admin_pass', newPass);
        return true;
      }
    } catch (e) {}

    // Fallback
    const savedPass = localStorage.getItem('ferdy_admin_pass') || '2411012007';
    if (oldPass !== savedPass) return false;
    localStorage.setItem('ferdy_admin_pass', newPass);
    return true;
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        journals,
        skills,
        aboutPhoto,
        dailyPhotos,
        profileBio,
        galleryPhotos,
        modalState,
        isDbConnected,
        refreshFromDb,
        openProjectModal,
        openJournalModal,
        closeModal,
        saveProject,
        deleteProject,
        saveJournal,
        deleteJournal,
        saveSkill,
        deleteSkill,
        updateAboutPhoto,
        updateBio,
        saveGalleryPhotos,
        verifyPassword,
        changePassword,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
