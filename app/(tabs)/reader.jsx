import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Linking } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import userData from "@/mobx/userData";
import useLoading from "@/hooks/useLoading";
import { usePopupContext } from "@/context/PopupContext";
import scanStory from "@/mobx/scanStory";
import { Colors } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import anim2 from "@/assets/animation/anim2.json";
import { CameraType } from "expo-camera/build/legacy/Camera.types";

const Reader = () => {
    const [scanned, setScanned] = useState(false);
    const { loading, startLoading, stopLoading } = useLoading();
    const [permission, requestPermission] = useCameraPermissions();
    const { showPopup } = usePopupContext();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await requestPermission();
            return status === "granted";
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        try {
            setScanned(true);
            Linking.openURL(data).catch(() => {
                showPopup(`Содержимое кода не ссылка: ${data}`, "warning");
            });
            const dataToSave = {
                id: userData.authData.user.id,
                data,
            };
            scanStory.addUserCode(dataToSave);
            console.log(scanStory.usersScans);
        } catch (error) {
            console.error("Ошибка при сканировании штрихкода:", error);
            setTimeout(() => {
                setScanned(false);
            }, 500);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.containerCentrallity}>
                    <ActivityIndicator size="large" color={Colors.dark.text} />
                </View>
            ) : (
                permission?.granted && (
                    <CameraView
                        style={styles.camera}
                        facing={CameraType.back}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barCodeScannerSettings={{
                            barCodeTypes: ["qr"],
                        }}
                    >
                        <LottieView
                            source={anim2}
                            style={{ flex: 1 }}
                            autoPlay
                            loop
                        />
                    </CameraView>
                )
            )}
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
    camera: {
        flex: 1,
    },
});

export default Reader;
