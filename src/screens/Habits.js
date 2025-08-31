import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/globalStyles';
import { COLORS, DARK_COLORS, SPACING, BORDER_RADIUS } from '../../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const Habits = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    category: 'personal',
  });
  
  const { habits, addHabit, deleteHabit, toggleHabitCompletion, loadData, darkMode, forceUpdate } = useAppContext();
  
  // Tema değişikliklerinde stilleri optimize et
  const styles = useMemo(() => createGlobalStyles(darkMode), [darkMode, forceUpdate]);
  const colors = useMemo(() => darkMode ? DARK_COLORS : COLORS, [darkMode, forceUpdate]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      health: '🏃‍♂️',
      personal: '👤',
      work: '💼',
      study: '📚',
      finance: '💰',
    };
    return icons[category] || '🔄';
  };

  const getStreakColor = (streak) => {
    if (streak >= 7) return colors.success;
    if (streak >= 3) return colors.warning;
    return colors.gray500;
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);

  const handleAddHabit = async () => {
    if (newHabit.title.trim() === '') {
      Alert.alert('Hata', 'Alışkanlık başlığı gereklidir');
      return;
    }
    
    const habit = {
      id: Date.now(),
      title: newHabit.title,
      description: newHabit.description,
      category: newHabit.category,
      completedToday: false,
      streak: 0,
      longestStreak: 0,
      reminder: '09:00',
      createdAt: new Date().toISOString(),
      lastCompleted: null,
    };
    
    await addHabit(habit);
    setNewHabit({ title: '', description: '', category: 'personal' });
    setShowAddModal(false);
    Alert.alert('Başarılı', 'Alışkanlık eklendi!');
  };

  const handleDeleteHabit = async (habitId) => {
    Alert.alert(
      'Alışkanlığı Sil',
      'Bu alışkanlığı silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive', 
          onPress: async () => {
            await deleteHabit(habitId);
          }
        },
      ]
    );
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        bounces={true}
        key={`habits-${darkMode ? 'dark' : 'light'}-${forceUpdate}`} // Force re-render on theme change
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Alışkanlıklar</Text>
            <Text style={styles.bodyText}>
              {completedToday}/{totalHabits} bugün tamamlandı
            </Text>
          </View>
          <Button
            title="+ Ekle"
            size="small"
            onPress={() => navigation.navigate('AddHabit')}
          />
        </View>

                 {/* Stats Overview */}
         <View style={[styles.row, { marginBottom: SPACING.lg }]}>
           <Card style={[styles.statsCard, { backgroundColor: colors.primary + '10' }]}>
             <Text style={[styles.caption, { color: colors.primary, fontWeight: '600' }]}>Toplam Alışkanlık</Text>
             <Text style={[styles.statsNumber, { color: colors.primary }]}>
               {totalHabits}
             </Text>
           </Card>
           <Card style={[styles.statsCard, { backgroundColor: colors.success + '10' }]}>
             <Text style={[styles.caption, { color: colors.success, fontWeight: '600' }]}>Toplam Seri</Text>
             <Text style={[styles.statsNumber, { color: colors.success }]}>
               {totalStreak}
             </Text>
           </Card>
         </View>

        {/* Progress Bar */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Günlük İlerleme</Text>
          <View style={{ marginTop: SPACING.md }}>
            <View style={[styles.rowSpaceBetween, { marginBottom: SPACING.sm }]}>
              <Text style={styles.bodyText}>Tamamlanan</Text>
              <Text style={styles.bodyText}>
                {completedToday}/{totalHabits}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0}%`,
                }
              ]} />
            </View>
            <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
              %{totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0} tamamlandı
            </Text>
          </View>
        </Card>

        {/* Habits List */}
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            onPress={() => toggleHabitCompletion(habit.id)}
            onLongPress={() => {
              Alert.alert(
                'Alışkanlık İşlemleri',
                habit.title,
                [
                  { text: 'Düzenle', onPress: () => console.log('Düzenle:', habit.id) },
                  { text: 'Sil', style: 'destructive', onPress: () => handleDeleteHabit(habit.id) },
                  { text: 'İptal', style: 'cancel' },
                ]
              );
            }}
            activeOpacity={0.7}
          >
            <Card
              style={{
                marginBottom: SPACING.sm,
                opacity: habit.completedToday ? 0.7 : 1,
              }}
            >
              <View style={styles.rowSpaceBetween}>
                <View style={{ flex: 1 }}>
                  <View style={[styles.row, { marginBottom: SPACING.xs }]}>
                    <Text style={styles.caption}>
                      {getCategoryIcon(habit.category)}
                    </Text>
                    <Text style={[styles.caption, { marginLeft: SPACING.xs }]}>
                      {habit.category}
                    </Text>
                  </View>
                  
                  <Text style={[
                    styles.subtitle,
                    {
                      textDecorationLine: habit.completedToday ? 'line-through' : 'none',
                      color: habit.completedToday ? colors.gray500 : colors.textPrimary,
                    }
                  ]}>
                    {habit.title}
                  </Text>
                  
                  {habit.description && (
                    <Text style={[
                      styles.bodyText,
                      { marginTop: SPACING.xs }
                    ]}>
                      {habit.description}
                    </Text>
                  )}
                  
                  <View style={[styles.row, { marginTop: SPACING.sm }]}>
                                       <View style={{
                     backgroundColor: getStreakColor(habit.streak),
                     paddingHorizontal: SPACING.md,
                     paddingVertical: SPACING.xs,
                     borderRadius: BORDER_RADIUS.full,
                     marginRight: SPACING.sm,
                     elevation: 2,
                     shadowColor: getStreakColor(habit.streak),
                     shadowOffset: { width: 0, height: 1 },
                     shadowOpacity: 0.3,
                     shadowRadius: 3,
                   }}>
                     <Text style={{
                       color: colors.white,
                       fontSize: 11,
                       fontWeight: '700',
                       letterSpacing: 0.5,
                     }}>
                       🔥 {habit.streak} gün
                     </Text>
                   </View>
                    
                    <Text style={styles.caption}>
                      En uzun: {habit.longestStreak} gün
                    </Text>
                    
                    {habit.reminder && (
                      <Text style={[styles.caption, { marginLeft: SPACING.sm }]}>
                        ⏰ {habit.reminder}
                      </Text>
                    )}
                  </View>
                </View>
                
                                 <TouchableOpacity
                   style={{
                     width: 36,
                     height: 36,
                     borderRadius: 18,
                     borderWidth: 2,
                     borderColor: habit.completedToday ? colors.success : colors.gray300,
                     backgroundColor: habit.completedToday ? colors.success : 'transparent',
                     justifyContent: 'center',
                     alignItems: 'center',
                     elevation: habit.completedToday ? 4 : 1,
                     shadowColor: habit.completedToday ? colors.success : colors.gray300,
                     shadowOffset: { width: 0, height: 2 },
                     shadowOpacity: habit.completedToday ? 0.3 : 0.1,
                     shadowRadius: 4,
                   }}
                   onPress={() => toggleHabitCompletion(habit.id)}
                 >
                   {habit.completedToday && (
                     <Text style={{ 
                       color: colors.white, 
                       fontSize: 18, 
                       fontWeight: 'bold',
                       textShadowColor: 'rgba(0,0,0,0.2)',
                       textShadowOffset: { width: 0, height: 1 },
                       textShadowRadius: 1,
                     }}>✓</Text>
                   )}
                 </TouchableOpacity>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {habits.length === 0 && (
          <Card style={styles.emptyState}>
            <Text style={styles.subtitle}>Alışkanlık bulunamadı</Text>
            <Text style={styles.emptyStateText}>
              Henüz alışkanlık eklenmemiş. İlk alışkanlığınızı ekleyerek başlayın!
            </Text>
            <Button
              title="İlk Alışkanlığı Ekle"
              onPress={() => navigation.navigate('AddHabit')}
              style={{ marginTop: SPACING.md }}
            />
          </Card>
        )}
      </ScrollView>

      {/* Add Habit Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: SPACING.lg,
            width: '90%',
            maxHeight: '80%',
          }}>
            <Text style={styles.subtitle}>Yeni Alışkanlık Ekle</Text>
            
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.gray300,
                borderRadius: 8,
                padding: SPACING.md,
                marginTop: SPACING.md,
                fontSize: 16,
                color: colors.textPrimary,
              }}
              placeholder="Alışkanlık başlığı"
              placeholderTextColor={colors.textTertiary}
              value={newHabit.title}
              onChangeText={(text) => setNewHabit({...newHabit, title: text})}
            />
            
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.gray300,
                borderRadius: 8,
                padding: SPACING.md,
                marginTop: SPACING.md,
                fontSize: 16,
                height: 80,
                textAlignVertical: 'top',
                color: colors.textPrimary,
              }}
              placeholder="Açıklama (opsiyonel)"
              placeholderTextColor={colors.textTertiary}
              value={newHabit.description}
              onChangeText={(text) => setNewHabit({...newHabit, description: text})}
              multiline
            />
            
            <View style={{ marginTop: SPACING.lg, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                title="İptal"
                variant="outline"
                onPress={() => setShowAddModal(false)}
                style={{ flex: 1, marginRight: SPACING.sm }}
              />
              <Button
                title="Ekle"
                onPress={handleAddHabit}
                style={{ flex: 1, marginLeft: SPACING.sm }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Habits;
