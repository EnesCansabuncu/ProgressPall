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

const Tasks = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
  });
  
  const { tasks, addTask, deleteTask, toggleTaskCompletion, loadData, darkMode, forceUpdate } = useAppContext();
  
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.gray500;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return 'Belirsiz';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      work: '💼',
      health: '🏃‍♂️',
      personal: '👤',
      shopping: '🛒',
      study: '📚',
    };
    return icons[category] || '📝';
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  const handleAddTask = async () => {
    if (newTask.title.trim() === '') {
      Alert.alert('Hata', 'Görev başlığı gereklidir');
      return;
    }
    
    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      category: newTask.category,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    await addTask(task);
    setNewTask({ title: '', description: '', priority: 'medium', category: 'personal' });
    setShowAddModal(false);
    Alert.alert('Başarılı', 'Görev eklendi!');
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      'Görevi Sil',
      'Bu görevi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive', 
          onPress: async () => {
            await deleteTask(taskId);
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
        key={`tasks-${darkMode ? 'dark' : 'light'}-${forceUpdate}`} // Force re-render on theme change
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Görevler</Text>
            <Text style={styles.bodyText}>
              {completedCount} tamamlandı, {pendingCount} bekliyor
            </Text>
          </View>
          <Button
            title="+ Ekle"
            size="small"
            onPress={() => navigation.navigate('AddTask')}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabContainer}>
          {[
            { key: 'all', label: 'Tümü', count: tasks.length },
            { key: 'pending', label: 'Bekleyen', count: pendingCount },
            { key: 'completed', label: 'Tamamlanan', count: completedCount },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                filter === tab.key && styles.tabActive,
              ]}
              onPress={() => setFilter(tab.key)}
            >
              <Text style={[
                styles.tabText,
                filter === tab.key && styles.tabTextActive,
              ]}>
                {tab.label}
              </Text>
              <Text style={[
                styles.tabText,
                filter === tab.key && styles.tabTextActive,
                { fontSize: 10, marginTop: 2 },
              ]}>
                {tab.count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tasks List */}
        {filteredTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() => toggleTaskCompletion(task.id)}
            onLongPress={() => {
              Alert.alert(
                'Görev İşlemleri',
                task.title,
                [
                  { text: 'Düzenle', onPress: () => console.log('Düzenle:', task.id) },
                  { text: 'Sil', style: 'destructive', onPress: () => handleDeleteTask(task.id) },
                  { text: 'İptal', style: 'cancel' },
                ]
              );
            }}
            activeOpacity={0.7}
          >
                         <Card
               style={{
                 marginBottom: SPACING.md,
                 opacity: task.completed ? 0.7 : 1,
                 backgroundColor: task.completed ? colors.gray50 : colors.surface,
               }}
             >
              <View style={styles.rowSpaceBetween}>
                <View style={{ flex: 1 }}>
                  <View style={[styles.row, { marginBottom: SPACING.xs }]}>
                    <Text style={styles.caption}>
                      {getCategoryIcon(task.category)}
                    </Text>
                    <Text style={[styles.caption, { marginLeft: SPACING.xs }]}>
                      {task.category}
                    </Text>
                  </View>
                  <Text style={[
                    styles.subtitle,
                    {
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                      color: task.completed ? colors.gray500 : colors.textPrimary,
                    }
                  ]}>
                    {task.title}
                  </Text>
                  {task.description && (
                    <Text style={[
                      styles.bodyText,
                      { marginTop: SPACING.xs }
                    ]}>
                      {task.description}
                    </Text>
                  )}
                  <View style={[styles.row, { marginTop: SPACING.sm }]}>
                                       <View style={{
                     backgroundColor: getPriorityColor(task.priority),
                     paddingHorizontal: SPACING.md,
                     paddingVertical: SPACING.xs,
                     borderRadius: BORDER_RADIUS.full,
                     marginRight: SPACING.sm,
                     elevation: 2,
                     shadowColor: getPriorityColor(task.priority),
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
                       {getPriorityText(task.priority)}
                     </Text>
                   </View>
                    <Text style={styles.caption}>
                      Son Tarih: {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                    </Text>
                  </View>
                </View>
                                 <View style={{
                   width: 28,
                   height: 28,
                   borderRadius: 14,
                   borderWidth: 2,
                   borderColor: task.completed ? colors.success : colors.gray300,
                   backgroundColor: task.completed ? colors.success : 'transparent',
                   justifyContent: 'center',
                   alignItems: 'center',
                   elevation: task.completed ? 4 : 1,
                   shadowColor: task.completed ? colors.success : colors.gray300,
                   shadowOffset: { width: 0, height: 2 },
                   shadowOpacity: task.completed ? 0.3 : 0.1,
                   shadowRadius: 4,
                 }}>
                   {task.completed && (
                     <Text style={{ 
                       color: colors.white, 
                       fontSize: 16, 
                       fontWeight: 'bold',
                       textShadowColor: 'rgba(0,0,0,0.2)',
                       textShadowOffset: { width: 0, height: 1 },
                       textShadowRadius: 1,
                     }}>✓</Text>
                   )}
                 </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {filteredTasks.length === 0 && (
          <Card style={styles.emptyState}>
            <Text style={styles.subtitle}>Görev bulunamadı</Text>
            <Text style={styles.emptyStateText}>
              {filter === 'all' 
                ? 'Henüz görev eklenmemiş. İlk görevinizi ekleyerek başlayın!'
                : filter === 'completed'
                ? 'Henüz tamamlanan görev yok. Görevlerinizi tamamlayarak ilerleyin!'
                : 'Tüm görevler tamamlandı! Tebrikler! 🎉'
              }
            </Text>
            {filter === 'all' && (
              <Button
                title="İlk Görevi Ekle"
                onPress={() => navigation.navigate('AddTask')}
                style={{ marginTop: SPACING.md }}
              />
            )}
          </Card>
        )}
      </ScrollView>

      {/* Add Task Modal */}
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
            <Text style={styles.subtitle}>Yeni Görev Ekle</Text>
            
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
              placeholder="Görev başlığı"
              placeholderTextColor={colors.textTertiary}
              value={newTask.title}
              onChangeText={(text) => setNewTask({...newTask, title: text})}
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
              value={newTask.description}
              onChangeText={(text) => setNewTask({...newTask, description: text})}
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
                onPress={handleAddTask}
                style={{ flex: 1, marginLeft: SPACING.sm }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Tasks;
