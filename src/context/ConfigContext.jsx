import React, { createContext, useState, useEffect, useContext } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchConfig = async () => {
        try {
            // Include credentials to preserve session
            const response = await fetch('/api/get_config.php', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setConfig(data);
            } else {
                console.error('Failed to fetch config');
            }
        } catch (error) {
            console.error('Error fetching config:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const updateConfig = async (newConfig) => {
        // Optimistic UI update
        const previousConfig = config;
        setConfig(newConfig);
        try {
            const response = await fetch('/api/save_config.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newConfig),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to save config');
            }
            return true;
        } catch (error) {
            console.error('Error saving config:', error);
            // Revert to previous config on failure
            setConfig(previousConfig);
            await fetchConfig();
            return false;
        }
    };

    return (
        <ConfigContext.Provider value={{ config, loading, updateConfig, fetchConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
