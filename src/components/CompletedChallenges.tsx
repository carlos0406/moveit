import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengerContext';
import styles from '../styles/completedChallenges.module.css'
export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext);
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}