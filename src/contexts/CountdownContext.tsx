import { ReactNode, useContext, useEffect, useState, createContext } from "react";

import { ChallengesContext } from "./ChallengerContext";


interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    active: boolean;
    resetCountdown: () => void;
    startCountdown: () => void;


}

interface CountDownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountDownProviderProps) {
    const { startNewChallenges } = useContext(ChallengesContext)
    const [time, setTime] = useState(0.05 * 60)
    const [active, setActive] = useState(false)
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [hasFinished, setHasFinished] = useState(false);
    function startCountdown() {
        setActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setActive(false);
        setHasFinished(false);
        setTime(25 * 60);

    }

    useEffect(() => {
        if (active && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (active && time === 0) {
            setHasFinished(true)
            setActive(false)
            startNewChallenges();
        }
    }, [active, time]);
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            active,
            resetCountdown,
            startCountdown

        }}>
            {children}
        </CountdownContext.Provider>
    )
}