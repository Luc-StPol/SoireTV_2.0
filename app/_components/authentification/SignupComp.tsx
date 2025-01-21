'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from '@/app/styles/form.module.scss';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { addUser } from '@/lib/api/authentification';

export default function SignupComp() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
    userName: '',
  });
  const [isOpen, setisOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'userEmail' && userData.userEmail != '') {
      setIsValidEmail(/\S+@\S+\.\S+/.test(userData.userEmail));
    }
    if (e.target.name === 'userPassword' && userData.userPassword != '') {
      setIsValidPassword(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|;:'",.<>/?\\/-]).{8,}$/.test(
          userData.userPassword,
        ),
      );
    }
  };

  const handleAddUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsError(false);
    if (!isValidEmail || !isValidPassword) {
      return null;
    }
    try {
      const response = await addUser(userData);
      if (response) {
        setisOpen(true);
      }
    } catch {
      setIsError(true);
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className={`${styles.formContainer} flex-col items-center`}>
      <h3>Créer un compte</h3>
      <form method="post" onSubmit={handleAddUser}>
        <div className={styles.formInput}>
          <input
            type="email"
            name="userEmail"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            required
          />
          {isValidEmail ? null : (
            <p className="text-center text-sm text-red-500">Email invalide</p>
          )}
        </div>
        <div className={styles.formInput}>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            placeholder="Nom d'utilisateur"
            required
          />
        </div>
        <div className={styles.formInput}>
          <input
            type="password"
            name="userPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mot de passe"
            required
          />
          {isValidPassword ? null : (
            <p className="text-center text-sm text-red-500">
              Mot de passe invalide
            </p>
          )}
        </div>
        {isError ? (
          <p className="text-center text-sm text-red-500">
            L&apos;email existe déjà
          </p>
        ) : null}
        <div className={`${styles.formButton} m-11 justify-center`}>
          <button type="submit">S&apos;inscrire</button>
        </div>
      </form>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setisOpen(open);
          if (!open) {
            handleClose();
          }
        }}
      >
        <DialogContent className="bg-white">
          <div>Votre compte à bien été créé !</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
