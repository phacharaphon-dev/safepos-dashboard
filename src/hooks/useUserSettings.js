import { useState, useEffect, useRef } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { rtdb } from '../firebase';

const DEFAULT_SETTINGS = {
  angle_threshold: 22,
  time_threshold_sec: 10,
  cooldown_period_min: 1,
  is_sound_enabled: true,
  is_popup_enabled: true,
};

export function useUserSettings(userId = 'user123') {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saveStatus, setSaveStatus] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    const settingsRef = ref(rtdb, `Users/${userId}/settings`);
    const unsub = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings((prev) => ({ ...prev, ...snapshot.val() }));
      }
    });
    return () => unsub();
  }, [userId]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveStatus('Saving...');
    const settingsRef = ref(rtdb, `Users/${userId}/settings`);
    update(settingsRef, { [key]: value })
      .then(() => {
        setSaveStatus('Synced');
        setTimeout(() => setSaveStatus(''), 1500);
      })
      .catch(() => setSaveStatus('Sync Failed'));
  };

  const updateSettingDebounced = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveStatus('Saving...');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const settingsRef = ref(rtdb, `Users/${userId}/settings`);
      update(settingsRef, { [key]: value })
        .then(() => {
          setSaveStatus('Synced');
          setTimeout(() => setSaveStatus(''), 1500);
        })
        .catch(() => setSaveStatus('Sync Failed'));
    }, 200);
  };

  return { settings, saveStatus, updateSetting, updateSettingDebounced };
}