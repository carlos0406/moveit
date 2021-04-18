import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;

}

interface ChallegensContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenges: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;


}
export const ChallengesContext = createContext({} as ChallegensContextData);
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set("level", String(level));
        Cookies.set("currentExperience", String(currentExperience));
        Cookies.set("challengesCompleted", String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setLevelUpModalOpen(false)
    }

    function startNewChallenges() {
        new Audio('/notification.mp3').play();

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} XP!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            levelUp,
            startNewChallenges,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )


}