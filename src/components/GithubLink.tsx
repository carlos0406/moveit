import styles from '../styles/githubLink.module.css'

export function GitHubLink() {

    return (
        <div className={styles.githubLinkContainer}>
            <strong>Disponivel em:</strong>
            <a href="https://github.com/carlos0406/moveit" target="_blank">
                carlos0406/moveit
                <img src="/icons/githubicon.png" alt="" />
            </a>
        </div>
    );
}