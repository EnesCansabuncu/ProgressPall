import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/globalStyles';
import { COLORS, DARK_COLORS, SPACING, BORDER_RADIUS } from '../../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const Dashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { tasks, habits, getStats, loadData, darkMode, forceUpdate } = useAppContext();
  const stats = getStats();
  
  // Tema değişikliklerinde stilleri optimize et
  const styles = useMemo(() => createGlobalStyles(darkMode), [darkMode, forceUpdate]);
  const colors = useMemo(() => darkMode ? DARK_COLORS : COLORS, [darkMode, forceUpdate]);
  
  // Tema değişikliğinde arka plan rengini zorla güncelle
  useEffect(() => {
    console.log('Dashboard theme changed to:', darkMode ? 'dark' : 'light');
    console.log('Background color:', colors.background);
    console.log('Force update triggered:', forceUpdate);
    console.log('SafeArea style:', styles.safeArea);
    console.log('Container style:', styles.container);
  }, [darkMode, forceUpdate, colors.background, styles.safeArea, styles.container]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getProgressPercentage = () => {
    return stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 80) return colors.success;
    if (percentage >= 60) return colors.warning;
    return colors.error;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{
          paddingHorizontal: SPACING.md,
          paddingVertical: SPACING.lg,
          paddingBottom: SPACING.xl + 120, // Tab bar için daha fazla padding
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        showsVerticalScrollIndicator={false}
        bounces={true}
        key={`dashboard-${darkMode ? 'dark' : 'light'}-${forceUpdate}`} // Force re-render on theme change
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Merhaba! 👋</Text>
            <Text style={styles.bodyText}>
              Bugün {new Date().toLocaleDateString('tr-TR', { weekday: 'long' })} günü
            </Text>
          </View>
        </View>

        {/* Progress Overview */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Günlük İlerleme</Text>
          <View style={{ marginTop: SPACING.md }}>
            <View style={[styles.rowSpaceBetween, { marginBottom: SPACING.sm }]}>
              <Text style={styles.bodyText}>Görevler</Text>
              <Text style={styles.bodyText}>
                {stats.completedTasks}/{stats.totalTasks}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                {
                  backgroundColor: getProgressColor(),
                  width: `${getProgressPercentage()}%`,
                }
              ]} />
            </View>
            <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
              %{Math.round(getProgressPercentage())} tamamlandı
            </Text>
          </View>
        </Card>

        {/* Quick Actions Card */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>🚀 Hızlı İşlemler</Text>
          <View style={{ marginTop: SPACING.md }}>
            <View style={[styles.row, { marginBottom: SPACING.sm }]}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.primary,
                  padding: SPACING.lg,
                  borderRadius: BORDER_RADIUS.xl,
                  marginRight: SPACING.sm,
                  alignItems: 'center',
                  elevation: 6,
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
                onPress={() => navigation.navigate('AddTask')}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 28, marginBottom: SPACING.sm }}>✅</Text>
                <Text style={{ 
                  color: colors.white, 
                  fontWeight: '700',
                  fontSize: 16,
                  letterSpacing: 0.3,
                }}>Görev Ekle</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.success,
                  padding: SPACING.lg,
                  borderRadius: BORDER_RADIUS.xl,
                  marginLeft: SPACING.sm,
                  alignItems: 'center',
                  elevation: 6,
                  shadowColor: colors.success,
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
                onPress={() => navigation.navigate('AddHabit')}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 28, marginBottom: SPACING.sm }}>🔄</Text>
                <Text style={{ 
                  color: colors.white, 
                  fontWeight: '700',
                  fontSize: 16,
                  letterSpacing: 0.3,
                }}>Alışkanlık Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={[styles.row, { marginBottom: SPACING.lg }]}>
          <TouchableOpacity 
            style={[styles.statsCard, { backgroundColor: colors.primary + '10' }]}
            onPress={() => navigation.navigate('Tasks')}
            activeOpacity={0.7}
          >
            <Text style={[styles.caption, { color: colors.primary, fontWeight: '600' }]}>Toplam Görev</Text>
            <Text style={[styles.statsNumber, { color: colors.primary }]}>
              {stats.totalTasks}
            </Text>
            <Text style={[styles.caption, { color: colors.primary, fontSize: 11, fontWeight: '600' }]}>
              Tıklayın →
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statsCard, { backgroundColor: colors.success + '10' }]}
            onPress={() => navigation.navigate('Habits')}
            activeOpacity={0.7}
          >
            <Text style={[styles.caption, { color: colors.success, fontWeight: '600' }]}>Toplam Alışkanlık</Text>
            <Text style={[styles.statsNumber, { color: colors.success }]}>
              {stats.totalHabits}
            </Text>
            <Text style={[styles.caption, { color: colors.success, fontSize: 11, fontWeight: '600' }]}>
              Tıklayın →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>🔥 Mevcut Seri</Text>
          <View style={{ marginTop: SPACING.md, alignItems: 'center' }}>
            <Text style={[styles.statsNumber, { fontSize: 36, color: colors.warning }]}>
              {stats.totalStreak}
            </Text>
            <Text style={styles.bodyText}>günlük seri devam ediyor!</Text>
            <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
              Seriyi bozmayın, devam edin! 💪
            </Text>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Hızlı İşlemler</Text>
          <View style={{ marginTop: SPACING.md }}>
            <Button
              title="Görevler Sayfasına Git"
              onPress={() => navigation.navigate('Tasks')}
              style={{ marginBottom: SPACING.sm }}
            />
            <Button
              title="Alışkanlıklar Sayfasına Git"
              variant="outline"
              onPress={() => navigation.navigate('Habits')}
            />
          </View>
        </Card>

        {/* Recent Activity */}
        <Card>
          <Text style={styles.subtitle}>Son Aktiviteler</Text>
          <View style={{ marginTop: SPACING.md }}>
            {tasks.length > 0 || habits.length > 0 ? (
              <>
                {tasks.slice(0, 2).map((task) => (
                  <View key={task.id} style={[styles.row, { marginBottom: SPACING.sm }]}>
                    <View style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: task.completed ? colors.success : colors.primary,
                      marginRight: SPACING.sm,
                      marginTop: 6,
                    }} />
                    <Text style={styles.bodyText}>
                      "{task.title}" görevi {task.completed ? 'tamamlandı' : 'eklendi'}
                    </Text>
                  </View>
                ))}
                {habits.slice(0, 1).map((habit) => (
                  <View key={habit.id} style={[styles.row, { marginBottom: SPACING.sm }]}>
                    <View style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: habit.completedToday ? colors.success : colors.warning,
                      marginRight: SPACING.sm,
                      marginTop: 6,
                    }} />
                    <Text style={styles.bodyText}>
                      "{habit.title}" alışkanlığı {habit.completedToday ? 'bugün tamamlandı' : 'güncellendi'}
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.bodyText}>
                Henüz aktivite yok. İlk görevinizi veya alışkanlığınızı ekleyerek başlayın!
              </Text>
            )}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
