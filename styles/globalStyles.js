import { StyleSheet } from 'react-native';
import { COLORS, DARK_COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from './theme';

// Karanlık mod desteği için stil oluşturucu fonksiyon
export const createGlobalStyles = (isDarkMode = false) => {
  const colors = isDarkMode ? DARK_COLORS : COLORS;
  
  return StyleSheet.create({
    // Container stilleri
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    contentContainer: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.lg,
      paddingBottom: SPACING.xl + 20, // Tab bar için extra padding
    },
    
    // Card stilleri
    card: {
      backgroundColor: colors.surface,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.lg,
      marginVertical: SPACING.md,
      ...SHADOWS.lg,
      borderWidth: 0,
      elevation: 8,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
    
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    
    // Text stilleri
    title: {
      fontSize: TYPOGRAPHY.fontSize['2xl'],
      fontWeight: TYPOGRAPHY.fontWeight.extrabold,
      color: colors.textPrimary,
      marginBottom: SPACING.sm,
      lineHeight: TYPOGRAPHY.fontSize['2xl'] * 1.1,
      letterSpacing: -0.5,
    },
    
    subtitle: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: colors.textPrimary,
      marginBottom: SPACING.xs,
      lineHeight: TYPOGRAPHY.fontSize.lg * 1.2,
      letterSpacing: -0.2,
    },
    
    bodyText: {
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
      lineHeight: TYPOGRAPHY.fontSize.base * 1.6,
      letterSpacing: 0.1,
    },
    
    caption: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textTertiary,
      lineHeight: TYPOGRAPHY.fontSize.sm * 1.5,
      letterSpacing: 0.2,
    },
    
    // Button stilleri
    button: {
      backgroundColor: colors.primary,
      borderRadius: BORDER_RADIUS.xl,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      minHeight: 52,
      borderWidth: 0,
    },
    
    buttonText: {
      color: colors.white,
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      textAlign: 'center',
      letterSpacing: 0.3,
    },
    
    buttonSecondary: {
      backgroundColor: colors.gray100,
      borderWidth: 1,
      borderColor: colors.gray300,
    },
    
    buttonSecondaryText: {
      color: colors.textPrimary,
    },
    
    buttonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    
    buttonOutlineText: {
      color: colors.primary,
    },
    
    buttonDisabled: {
      backgroundColor: colors.gray300,
      opacity: 0.6,
    },
    
    buttonDisabledText: {
      color: colors.gray500,
    },
    
    // Input stilleri
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.gray300,
      borderRadius: BORDER_RADIUS.md,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.base,
      color: colors.textPrimary,
      minHeight: 48,
    },
    
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    
    inputError: {
      borderColor: colors.error,
    },
    
    inputLabel: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textPrimary,
      marginBottom: SPACING.xs,
    },
    
    inputErrorText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: colors.error,
      marginTop: SPACING.xs,
    },
    
    // Layout stilleri
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    
    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    
    column: {
      flexDirection: 'column',
    },
    
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    // Header stilleri
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SPACING.md,
      marginBottom: SPACING.xl,
    },
    
    headerLeft: {
      flex: 1,
    },
    
    headerRight: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Progress bar stilleri
    progressBar: {
      height: 12,
      backgroundColor: colors.gray100,
      borderRadius: BORDER_RADIUS.full,
      overflow: 'hidden',
      marginVertical: SPACING.md,
      elevation: 1,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    
    progressFill: {
      height: '100%',
      borderRadius: BORDER_RADIUS.full,
      elevation: 2,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    
    // Stats card stilleri
    statsCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.lg,
      marginHorizontal: SPACING.sm,
      alignItems: 'center',
      elevation: 6,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      borderWidth: 0,
    },
    
    statsNumber: {
      fontSize: TYPOGRAPHY.fontSize['4xl'],
      fontWeight: TYPOGRAPHY.fontWeight.extrabold,
      color: colors.textPrimary,
      marginVertical: SPACING.xs,
      letterSpacing: -1,
      textShadowColor: colors.shadow || 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    
    // Divider stilleri
    divider: {
      height: 1,
      backgroundColor: colors.gray200,
      marginVertical: SPACING.sm,
    },
    
    // Badge stilleri
    badge: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      borderRadius: BORDER_RADIUS.full,
      backgroundColor: colors.primary,
    },
    
    badgeText: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.white,
    },
    
    // Status stilleri
    statusSuccess: {
      backgroundColor: colors.success + '20',
      borderColor: colors.success,
    },
    
    statusWarning: {
      backgroundColor: colors.warning + '20',
      borderColor: colors.warning,
    },
    
    statusError: {
      backgroundColor: colors.error + '20',
      borderColor: colors.error,
    },
    
    statusInfo: {
      backgroundColor: colors.info + '20',
      borderColor: colors.info,
    },
    
    // Tab stilleri
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.gray50,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.xs,
      marginBottom: SPACING.lg,
      elevation: 2,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    
    tab: {
      flex: 1,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.sm,
      borderRadius: BORDER_RADIUS.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    tabActive: {
      backgroundColor: colors.surface,
      elevation: 4,
      shadowColor: colors.shadow || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    
    tabText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    
    tabTextActive: {
      color: colors.textPrimary,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
    },
    
    // Empty state stilleri
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.xl,
    },
    
    emptyStateIcon: {
      fontSize: 48,
      marginBottom: SPACING.md,
      opacity: 0.5,
    },
    
    emptyStateText: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.sm,
    },
    
    emptyStateSubtext: {
      fontSize: TYPOGRAPHY.fontSize.base,
      color: colors.textTertiary,
      textAlign: 'center',
    },
  });
};

// Varsayılan stiller (açık mod için)
export const globalStyles = createGlobalStyles(false);
