import AsyncStorage from "@react-native-community/async-storage";

export async function saveItemAsync<T>(key: string, value: T, tenant: string = 'default'): Promise<void> {
    try {
        await AsyncStorage.setItem(`${tenant}_${key}`, JSON.stringify(value));
        console.log('save item, key: ' + key);
    } catch (e) {
        console.error(e);
    }
}

export async function getItemAsync<T>(key: string, tenant: string = 'default'): Promise<T | null> {
    try {
        const value = await AsyncStorage.getItem(`${tenant}_${key}`);
        if (value) {
            return JSON.parse(value) as T;
        }else{
            return null;
        }
    } catch (e) {
        console.error(e);
    }
    return null
}

export async function removeItemAsync(key: string, tenant: string = 'default'): Promise<void> {
    try {
        await AsyncStorage.removeItem(`${tenant}_${key}`);
    } catch (error) {
        console.error(error);
    }
}