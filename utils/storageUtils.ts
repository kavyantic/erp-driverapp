import * as SecureStore from 'expo-secure-store';



export async function saveToSecureStore<T>(key: string, object: T): Promise<void> {
    try {
        const serializedData = JSON.stringify(object); 
        const base64Data = btoa(serializedData); 
        await SecureStore.setItemAsync(key, base64Data); 
        console.log("Data saved successfully!");
    } catch (error) {
        console.error("Error saving to secure store:", error);
    }
}

export async function getFromSecureStore<T>(key: string): Promise<T | null> {
    try {
        const base64Data = await SecureStore.getItemAsync(key); 
        if (!base64Data) {
            console.warn("No data found for key:", key);
            return null;
        }
        const serializedData = atob(base64Data); 
        const object: T = JSON.parse(serializedData); 
        console.log("Data retrieved successfully!");
        return object;
    } catch (error) {
        console.error("Error retrieving from secure store:", error);
        return null;
    }
}

export async function deleteFromStore(key:string){
        await SecureStore.deleteItemAsync(key)
}
