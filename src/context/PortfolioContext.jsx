import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialProjectsData, initialJournalData, initialSkillsList } from '../data/portfolioData';

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

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const [isDbConnected, setIsDbConnected] = useState(false);

  // Sync data from MongoDB Atlas API
  const refreshFromDb = useCallback(async () => {
    try {
      // 1. Projects
      const resP = await fetch('/api/projects');
      if (resP.ok) {
        const dataP = await resP.json();
        if (Array.isArray(dataP) && dataP.length > 0) {
          setProjects(dataP);
          localStorage.setItem('ferdy_projects_v2', JSON.stringify(dataP));
          setIsDbConnected(true);
        }
      }

      // 2. Journals
      const resJ = await fetch('/api/journals');
      if (resJ.ok) {
        const dataJ = await resJ.json();
        if (Array.isArray(dataJ) && dataJ.length > 0) {
          setJournals(dataJ);
          localStorage.setItem('ferdy_journal_v2', JSON.stringify(dataJ));
        }
      }

      // 3. Skills
      const resS = await fetch('/api/skills');
      if (resS.ok) {
        const dataS = await resS.json();
        if (Array.isArray(dataS) && dataS.length > 0) {
          setSkills(dataS);
          localStorage.setItem('ferdy_skills_v2', JSON.stringify(dataS));
        }
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

  // Profile photo update
  const updateAboutPhoto = (photoUrl) => {
    setAboutPhoto(photoUrl);
    try {
      localStorage.setItem('ferdy_about_photo', photoUrl);
      localStorage.setItem('ferdy_profile_photo', photoUrl);
    } catch (e) {}
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
