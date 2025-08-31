export const COLORS = {
  // Ana renkler
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // İkincil renkler
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  // Nötr renkler
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Durum renkleri
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Arka plan renkleri
  background: '#F9FAFB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // Metin renkleri
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
};

// Karanlık mod renkleri
export const DARK_COLORS = {
  // Ana renkler (aynı kalır)
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // İkincil renkler (aynı kalır)
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  // Nötr renkler
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#1F2937',
  gray100: '#374151',
  gray200: '#4B5563',
  gray300: '#6B7280',
  gray400: '#9CA3AF',
  gray500: '#D1D5DB',
  gray600: '#E5E7EB',
  gray700: '#F3F4F6',
  gray800: '#F9FAFB',
  gray900: '#FFFFFF',
  
  // Durum renkleri (aynı kalır)
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Arka plan renkleri (karanlık)
  background: '#111827',
  surface: '#1F2937',
  card: '#374151',
  
  // Metin renkleri (karanlık)
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  textInverse: '#111827',
};

export const TYPOGRAPHY = {
  // Font boyutları
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Font ağırlıkları
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Satır yükseklikleri
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const SPACING = {
  // Margin ve padding değerleri
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATION,
};
