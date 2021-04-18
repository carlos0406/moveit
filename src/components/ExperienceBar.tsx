import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengerContext';
import styles from '../styles/experienceBar.module.css';
export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
    const levelPercetual = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0Xp</span>
            <div>
                <div style={{ width: `${levelPercetual}%` }}></div>

                <span style={{ left: `${levelPercetual}%` }} className={styles.currentExperience}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel}Xp</span>
        </header>
    );
}