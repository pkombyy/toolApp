import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Linking } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"; // Убедитесь, что у вас установлена expo-camera
import useLoading from "@/hooks/useLoading";
import { usePopupContext } from "@/context/PopupContext";
import scanStory from "@/mobx/scanStory";
import { Colors } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import anim2 from "@/assets/animation/anim2.json";

const Reader = () => {
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const { showPopup } = usePopupContext();

    useEffect(() => {
        const getCameraPermissions = async () => {
            await requestPermission();
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            try {
                // Проверяем, является ли отсканированный код ссылкой
                // await  Linking.openURL(data);
                scanStory.addUserCode(data,showPopup);
                console.log(scanStory.usersScans);
                showPopup(`Содержимое кода: ${data}`, "success");
            } catch (error) {
                showPopup(`Содержимое кода не ссылка: ${data}`, "warning");
                console.log(error)
            } finally {
                // Сбрасываем состояние сканирования через 2 секунды
                setTimeout(() => {
                    setScanned(false);
                }, 2000);
            }
        }
    };

    if (permission === null) {
        return <ActivityIndicator size="large" color={Colors.dark.text} />;
    }
    if (permission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <CameraView
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <LottieView
                        source={anim2}
                        style={{ flex: 1 }}
                        autoPlay
                        loop
                    />
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerCentrallity: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Reader;