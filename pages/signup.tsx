import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import SignupComp from '@/app/_components/authentification/SignupComp';
import styles from '@/app/styles/component.module.scss';

export default function Signup() {
  const token = Cookies.get('token');
  const userId = Cookies.get('userId');
  const router = useRouter();

  if (token || userId) {
    router.push('/');
  }
  return (
    <div className={styles.authentificationBackground}>
      <h1 className="text-center max-md:mb-24 max-md:mt-8 max-md:text-8xl">
        Soirée TV
      </h1>
      <SignupComp />
    </div>
  );
}
