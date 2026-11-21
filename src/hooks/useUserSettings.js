import { useState, useEffect, useRef } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { rtdb } from '../firebase';

export function useUserSettings(userId = 'user123') {
  const [settings, setSettings] = useState({
    angle_threshold: 20,
    time_threshold_sec: 180,
    cooldown_period_min: 15,
    is_sound_enabled: true,
    is_popup_enabled: true,
  });
  const [saveStatus, setSaveStatus] = useState('');
  const debounceTimer = useRef(null);

  useEffect(() => {
    const settingsRef = ref(rtdb, `Users/${userId}/settings`);
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings((prev) => ({ ...prev, ...snapshot.val() }));
      }
    });
    return () => unsubscribe();
  }, [userId]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveStatus('Saving...');

    const settingsRef = ref(rtdb, `Users/${userId}/settings`);
    update(settingsRef, { [key]: value })
      .then(() => {
        setSaveStatus('Synced ✓');
        setTimeout(() => setSaveStatus(''), 1500);
      })
      .catch((err) => {
        console.error('Error updating setting:', err);
        setSaveStatus('Error!');
      });
  };

  const updateSettingDebounced = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveStatus('Saving...');

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateSetting(key, value);
    }, 150);
  };

  return { settings, saveStatus, updateSetting, updateSettingDebounced };
}