import { useState, useEffect } from 'react';

const AVATAR_KEY = 'thangaraj_profile_avatar';
export const DEFAULT_AVATAR = '/thangaraj-profile.jpg';

export const getStoredAvatar = (): string => {
  if (typeof window === 'undefined') return DEFAULT_AVATAR;
  return localStorage.getItem(AVATAR_KEY) || DEFAULT_AVATAR;
};

export const setStoredAvatar = (url: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AVATAR_KEY, url);
  window.dispatchEvent(new Event('avatar-updated'));
};

export const resetStoredAvatar = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AVATAR_KEY);
  window.dispatchEvent(new Event('avatar-updated'));
};

export const useAvatar = () => {
  const [avatar, setAvatar] = useState<string>(getStoredAvatar);

  useEffect(() => {
    const handleUpdate = () => {
      setAvatar(getStoredAvatar());
    };
    window.addEventListener('avatar-updated', handleUpdate);
    return () => window.removeEventListener('avatar-updated', handleUpdate);
  }, []);

  return avatar;
};
