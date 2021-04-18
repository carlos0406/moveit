import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengerContext';
import styles from '../styles/profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/carlos0406.png" alt="Nome da pessoa " />
            <div>
                <strong> Carlos Henrique</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}