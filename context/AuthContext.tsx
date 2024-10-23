import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface AuthContextProps {
    token: string;
    name: string;
    username: string;

}

interface AuthActionContextProps {
    login: (payload: AuthSession) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

interface Institute {
    name: string
    id: number;
    logo: string;
}

interface InstituteContextProps {
    updateInstitute: (institute: Institute) => Promise<void>;
    institute: Institute | null
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthActionContext = createContext<AuthActionContextProps | undefined>(undefined);
export const InstituteContext = createContext<InstituteContextProps | undefined>(undefined);



export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthSession {
    username: string;
    name: string;
    token: string;
    licenseNumber: string;

}

export enum SecureKeys {
    INSTITUTE_INFO = "instituteinfoskeyecure",
    SESSION_INFO = "sessionkeysecure",
    TOKEN = "tokenkeysecure"
}

const initState = { name: "", token: "", username: "", licenseNumber: "" }
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [institute, setInstitute] = useState<Institute | null>({ logo: "", id: 1, name: "The JBS" })
    const [session, setSession] = useState<AuthSession>({ name: "", token: "", username: "", licenseNumber: "" });
    const [loading, setLoading] = useState(true); // For handling initial load
    const isAuthenticated = !!session;

    useEffect(() => {
        // Load user token from SecureStore on app start
        const loadUser = async () => {
            const userInfo = await SecureStore.getItemAsync(SecureKeys.SESSION_INFO)
            const token = await SecureStore.getItemAsync(SecureKeys.TOKEN)
            const instiuteInfo = await SecureStore.getItemAsync(SecureKeys.TOKEN)




            if (!(userInfo && token && instiuteInfo)) {
                // setSession(initState)
                // setInstitute(null)

                return
            }
            const parsed: AuthSession = JSON.parse(userInfo)
            const instituteParsed = JSON.parse(instiuteInfo)
            setSession(parsed)
            setInstitute(instituteParsed)
            setLoading(false);

        };

        loadUser();
    }, []);

    const login = useCallback(async (info: AuthSession): Promise<void> => {
        await SecureStore.setItemAsync(SecureKeys.SESSION_INFO, JSON.stringify(info));
        await SecureStore.setItemAsync(SecureKeys.TOKEN, info.token)
        setSession(info);
    }, [setSession])

    const logout = useCallback(async (): Promise<void> => {
        await SecureStore.deleteItemAsync('userToken');
        setSession(initState);
    }, [setSession])

    const updateInstitute = useCallback(async (institute: Institute): Promise<void> => {
        await SecureStore.setItemAsync(SecureKeys.INSTITUTE_INFO, JSON.stringify(institute))
        setInstitute(institute)
    }, [setInstitute])

    return (
        <InstituteContext.Provider value={{ updateInstitute, institute }}>
            <AuthContext.Provider value={session}>

                <AuthActionContext.Provider value={{ loading, login, logout }}>


                    {children}

                </AuthActionContext.Provider>
            </AuthContext.Provider>
        </InstituteContext.Provider>
    );
};




