import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/countdown.module.css'

export function Countdown() {
    const { minutes, seconds, active, hasFinished, resetCountdown, startCountdown } = useContext(CountdownContext);

    const [minuteL, minuteR] = String(minutes).padStart(2, '0').split('');
    const [secondsL, secondsR] = String(seconds).padStart(2, '0').split('');


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span className={styles.time}>{minuteL}</span>
                    <span className={styles.time}>{minuteR}</span>
                </div>
                <span >:</span>
                <div>
                    <span className={styles.time}>{secondsL}</span>
                    <span className={styles.time}>{secondsR}</span>
                </div>

            </div>
            {hasFinished ? (
                <button type="button"
                    disabled
                    className={styles.startCountdown}
                >   Terminou
                </button>
            ) : (
                    <>
                        {active ? (<button type="button"
                            className={` ${styles.startCountdown} ${styles.coutdownActive}`}
                            onClick={resetCountdown}
                        >   Abandonar ciclo

                        </button>)
                            : (<button type="button"
                                className={styles.startCountdown}
                                onClick={startCountdown}>
                                Iniciar ciclo

                            </button>)}
                    </>

                )}







        </div>
    )
}