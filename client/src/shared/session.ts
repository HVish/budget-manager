const SESSION_KEY = 'profile';

interface Profile {
  _id: string;
  name: string;
  email: string;
}

export function setSession(profile: Profile) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
}

export function getSession() {
  try {
    const profileStr = window.localStorage.getItem(SESSION_KEY);
    if (!profileStr) return null;
    return JSON.parse(profileStr) as Profile;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function clearSession() {
  window.localStorage.clear();
}
