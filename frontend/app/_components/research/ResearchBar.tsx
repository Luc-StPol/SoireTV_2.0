
import styles from '@/app/styles/researchBar.module.scss'

export default function ResearchBar(){
    return (
        <div className={styles.searchBar}>
            <input type="search" placeholder='search' />
        </div>
    )
}