import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/globalStyles';
import { COLORS, DARK_COLORS, SPACING, BORDER_RADIUS } from '../../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const Profile = ({ navigation }) => {
  const { getStats, habits, darkMode, toggleDarkMode, forceUpdate } = useAppContext();
  const stats = getStats();
  
  // Tema değişikliklerinde stilleri optimize et
  const styles = useMemo(() => createGlobalStyles(darkMode), [darkMode, forceUpdate]);
  const colors = useMemo(() => darkMode ? DARK_COLORS : COLORS, [darkMode, forceUpdate]);
  
  const userStats = {
    totalTasks: stats.totalTasks,
    completedTasks: stats.completedTasks,
    totalHabits: stats.totalHabits,
    currentStreak: stats.totalStreak,
    longestStreak: habits.length > 0 ? Math.max(...habits.map(h => h.longestStreak)) : 0,
    totalDays: 67, // Bu değer gerçek hesaplanacak
  };

  const handleStatPress = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{
          paddingHorizontal: SPACING.md,
          paddingVertical: SPACING.lg,
          paddingBottom: SPACING.xl + 120, // Tab bar için extra padding
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        key={`profile-${darkMode ? 'dark' : 'light'}-${forceUpdate}`} // Force re-render on theme change
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>İstatistikler</Text>
            <Text style={styles.bodyText}>
              Alışkanlık ve görev istatistikleriniz
            </Text>
          </View>
        </View>

        {/* Stats Overview */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Genel İstatistikler</Text>
          <View style={{ marginTop: SPACING.md }}>
            <View style={[styles.row, { marginBottom: SPACING.sm }]}>
                             <TouchableOpacity 
                 style={{ 
                   flex: 1, 
                   padding: SPACING.md,
                   borderRadius: BORDER_RADIUS.xl,
                   backgroundColor: colors.primary + '10',
                   elevation: 4,
                   shadowColor: colors.primary,
                   shadowOffset: { width: 0, height: 2 },
                   shadowOpacity: 0.15,
                   shadowRadius: 6,
                 }}
                 onPress={() => handleStatPress('Toplam Görev', `Toplam ${userStats.totalTasks} görev bulunuyor. ${userStats.completedTasks} tanesi tamamlandı.`)}
                 activeOpacity={0.7}
               >
                 <Text style={[styles.caption, { color: colors.primary, fontWeight: '600' }]}>Toplam Görev</Text>
                 <Text style={[styles.statsNumber, { fontSize: 24, color: colors.primary }]}>
                   {userStats.totalTasks}
                 </Text>
               </TouchableOpacity>
                             <TouchableOpacity 
                 style={{ 
                   flex: 1, 
                   padding: SPACING.md,
                   borderRadius: BORDER_RADIUS.xl,
                   backgroundColor: colors.success + '10',
                   marginLeft: SPACING.sm,
                   elevation: 4,
                   shadowColor: colors.success,
                   shadowOffset: { width: 0, height: 2 },
                   shadowOpacity: 0.15,
                   shadowRadius: 6,
                 }}
                 onPress={() => handleStatPress('Tamamlanan Görevler', `${userStats.completedTasks} görev başarıyla tamamlandı!`)}
                 activeOpacity={0.7}
               >
                 <Text style={[styles.caption, { color: colors.success, fontWeight: '600' }]}>Tamamlanan</Text>
                 <Text style={[styles.statsNumber, { fontSize: 24, color: colors.success }]}>
                   {userStats.completedTasks}
                 </Text>
               </TouchableOpacity>
            </View>
            
            <View style={[styles.row, { marginBottom: SPACING.sm }]}>
              <TouchableOpacity 
                style={{ 
                  flex: 1, 
                  padding: SPACING.md,
                  borderRadius: BORDER_RADIUS.xl,
                  backgroundColor: colors.secondary + '10',
                  elevation: 4,
                  shadowColor: colors.secondary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                }}
                onPress={() => handleStatPress('Toplam Alışkanlık', `${userStats.totalHabits} alışkanlık takip ediliyor.`)}
                activeOpacity={0.7}
              >
                <Text style={[styles.caption, { color: colors.secondary, fontWeight: '600' }]}>Toplam Alışkanlık</Text>
                <Text style={[styles.statsNumber, { fontSize: 24, color: colors.secondary }]}>
                  {userStats.totalHabits}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ 
                  flex: 1, 
                  padding: SPACING.md,
                  borderRadius: BORDER_RADIUS.xl,
                  backgroundColor: colors.warning + '10',
                  marginLeft: SPACING.sm,
                  elevation: 4,
                  shadowColor: colors.warning,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                }}
                onPress={() => handleStatPress('Mevcut Seri', `${userStats.currentStreak} günlük seri devam ediyor!`)}
                activeOpacity={0.7}
              >
                <Text style={[styles.caption, { color: colors.warning, fontWeight: '600' }]}>Mevcut Seri</Text>
                <Text style={[styles.statsNumber, { fontSize: 24, color: colors.warning }]}>
                  {userStats.currentStreak}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.row]}>
              <TouchableOpacity 
                style={{ 
                  flex: 1, 
                  padding: SPACING.md,
                  borderRadius: BORDER_RADIUS.xl,
                  backgroundColor: colors.error + '10',
                  elevation: 4,
                  shadowColor: colors.error,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                }}
                onPress={() => handleStatPress('En Uzun Seri', `En uzun seriniz ${userStats.longestStreak} gün!`)}
                activeOpacity={0.7}
              >
                <Text style={[styles.caption, { color: colors.error, fontWeight: '600' }]}>En Uzun Seri</Text>
                <Text style={[styles.statsNumber, { fontSize: 24, color: colors.error }]}>
                  {userStats.longestStreak}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ 
                  flex: 1, 
                  padding: SPACING.md,
                  borderRadius: BORDER_RADIUS.xl,
                  backgroundColor: colors.info + '10',
                  marginLeft: SPACING.sm,
                  elevation: 4,
                  shadowColor: colors.info,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                }}
                onPress={() => handleStatPress('Toplam Gün', `Uygulamayı ${userStats.totalDays} gündür kullanıyorsunuz.`)}
                activeOpacity={0.7}
              >
                <Text style={[styles.caption, { color: colors.info, fontWeight: '600' }]}>Toplam Gün</Text>
                <Text style={[styles.statsNumber, { fontSize: 24, color: colors.info }]}>
                  {userStats.totalDays}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Settings */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Ayarlar</Text>
          
          <View style={[styles.row, { paddingVertical: SPACING.md }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bodyText}>Karanlık Mod</Text>
              <Text style={styles.caption}>Karanlık tema kullan</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.gray300, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </Card>

        {/* App Info */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Uygulama Hakkında</Text>
          
          <View style={{ marginTop: SPACING.md }}>
            <Text style={styles.bodyText}>
              ProgressPal - Alışkanlık ve görev takip uygulaması
            </Text>
            <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
              Versiyon 1.0.0
            </Text>
            <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
              Alışkanlıklarınızı takip edin, hedeflerinize ulaşın!
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
