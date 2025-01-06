'use client';

// eslint-disable-next-line import/order
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from '@/app/styles/form.module.scss';

export default function LoginComp() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        userEmail: userData.userEmail,
        userPassword: userData.userPassword,
      });
      if (result?.ok) {
        // Récupérer la valeur de l'ID de l'utilisateur
        const session = await getSession();
        if (session) {
          router.push('/');
        }
      }
    } catch (err) {
      console.log('erreur de connexion', err);
    }
  };

  return (
    <div className={`${styles.formContainer} justify-center`}>
      <form method="post" onSubmit={handleLoginUser}>
        <div className="flex items-center max-md:flex-col">
          <div className={styles.formInput}>
            <input
              type="email"
              name="userEmail"
              id="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className={styles.formInput}>
            <input
              type="password"
              name="userPassword"
              onChange={handleChange}
              placeholder="Mot de passe"
            />
          </div>
          <div className={styles.formButton}>
            <button type="submit">Se connecter</button>
          </div>
        </div>
        <div className="my-4 flex justify-center max-md:flex-col max-md:text-center">
          <p className="mx-3 max-md:m-4">Pas encore de compte ?</p>
          <Link href="/signup" className="text-blue-500">
            Inscrivez-vous ici
          </Link>
        </div>
      </form>
    </div>
  );
}
