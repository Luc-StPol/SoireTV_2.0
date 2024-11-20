import SignupComp from "../_components/authentification/SignupComp";
import styles from "@/app/styles/component.module.scss"

export default function Signup(){
    return (
        <div className={styles.authentificationBackground}>
            <h1 className="text-center max-md:text-8xl max-md:mt-8 max-md:mb-24">Soirée TV</h1>
            <SignupComp />
        </div>
    )
}