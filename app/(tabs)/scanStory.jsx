import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import scanStory from '@/mobx/scanStory';
import { usePopupContext } from '@/context/PopupContext';
import { Colors } from '@/constants/Colors';
import { observer } from 'mobx-react-lite';

const ScanStory = observer(() => {
  const { showPopup } = usePopupContext();
  
  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data); // Копируем строку в буфер обмена
    showPopup('Скопировано в буфер обмена!', 'success')
  };

  const removeUserCode = ( data ) => {
    scanStory.removeUserCode(data); // Удаляем код из Store
  };

  
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.Text}>{item}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(item)}>
                <Text style={[styles.Text, { color: 'blue' }]}>копировать</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeUserCode(item)}>
                <Text style={[styles.Text, { color: 'red' }]}>Удалить</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {scanStory.usersScans.length > 0 ? (
                <FlatList
                    data={scanStory.usersScans}
                    renderItem={renderItem}
                    keyExtractor={(item) => item} // Используйте уникальный ключ
                />
            ) : (
                <Text style={styles.Text}>История сканирования пуста</Text>
            )}
        </View>
    );
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.dark.tint,
        borderRadius:8
    },
    Text: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
        color: Colors.dark.text
    },
});

export default ScanStory;