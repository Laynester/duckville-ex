import { useEffect, useLayoutEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { Communication, Engine } from '../../engine';

interface AppConfig {
    socket: string;
}

const appState = () => {
    useEffect(() => {
        Engine.Instance;
    }, []);

    return {};
};

export const useApp = () => useBetween(appState);
