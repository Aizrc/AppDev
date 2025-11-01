export const APP_NAME = 'Valenzuela CSS';
export const APP_VERSION = '1.0.0';

export const COLORS = {
  primary: '#0D2C54',
  secondary: '#145DA0',
  accent: '#0E86D4',
  background: '#F4F6F8',
  text: '#1C1C1C',
  highlight: '#89CFF0',
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const STORAGE_KEYS = {
  USER_TOKEN: 'valenzuela_user_token',
  USER_DATA: 'valenzuela_user_data',
  PRIVACY_ACCEPTED: 'valenzuela_privacy_accepted',
  OFFLINE_SURVEYS: 'valenzuela_offline_surveys',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};
