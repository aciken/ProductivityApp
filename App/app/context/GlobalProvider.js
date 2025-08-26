import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';
import { Platform } from 'react-native'


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAdventure, setSelectedAdventure] = useState(null);
    const [isWorkSessionActive, setIsWorkSessionActive] = useState(false);
    const [workSessionSettings, setWorkSessionSettings] = useState({ duration: 50 * 60, goal: '' });
    const [timer, setTimer] = useState(0);
    const [totalWorkTime, setTotalWorkTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isWorkSessionActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
                setTotalWorkTime(prev => prev + 1);
            }, 1000);
        } else if (isWorkSessionActive && timer === 0) {
            endWorkSession(); // End session when timer finishes
        }
        return () => clearInterval(interval);
    }, [isWorkSessionActive, timer]);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
                setUser(JSON.parse(token));
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        };
        checkAuth();


    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://0ba0-109-245-204-138.ngrok-free.app/signin', { email, password });
            if(response.status === 200) {
                await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
                setIsAuthenticated(true);   
                setUser(response.data.user);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }; 
    
    const signup = async (name,email, password) => {


    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };  

    const startWorkSession = (settings) => {
        setWorkSessionSettings(settings);
        setTimer(settings.duration);
        setIsWorkSessionActive(true);
    };

    const endWorkSession = () => {
        setIsWorkSessionActive(false);
        setTimer(0);
    };
    
    return (
        <GlobalContext.Provider value={{ 
            user, 
            isAuthenticated, 
            error, 
            setError, 
            setIsAuthenticated, 
            setUser, 
            login, 
            logout, 
            signup, 
            selectedAdventure, 
            setSelectedAdventure,
            isWorkSessionActive,
            workSessionSettings,
            startWorkSession,
            endWorkSession,
            timer,
            totalWorkTime
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
    
    
    
    
    
