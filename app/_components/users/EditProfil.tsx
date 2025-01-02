'use client';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { SetStateAction, useState } from 'react';

import styles from '@/app/styles/form.module.scss';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { editUserInformations, editUserPp } from '@/lib/api/users';

import EditUserPp from './EditUserPp';

interface UserData {
  userId: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  name?: string;
}

interface Form extends FormData {
  file: Blob;
  userId: string;
}

export default function EditProfil() {
  const [userPp, setUserPp] = useState(new Blob());
  const userId = Cookies.get('userId');

  const handleUserPpChange = (newUserPp: SetStateAction<Blob>) => {
    setUserPp(newUserPp);
  };

  const [userData, setUserData] = useState<UserData>({
    userId: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userId) {
      setUserData({
        ...userData,
        userId: userId,
      });
    }
    if (
      userData.name !== '' ||
      userData.email !== '' ||
      userData.oldPassword !== '' ||
      userData.newPassword !== ''
    ) {
      try {
        console.log(userData);
        const response = await editUserInformations(userData);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    if (userPp) {
      try {
        console.log('userPp', userPp);

        const formData = new FormData();
        formData.append('file', userPp);
        formData.append('userId', `${userId}`);
        const response = await editUserPp(formData);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-white">
        <FontAwesomeIcon icon={faPen} />
      </DialogTrigger>
      <DialogContent className={styles.dialogContainer}>
        <DialogHeader>
          <DialogTitle>Modifier votre profil</DialogTitle>
          <div className={`${styles.formContainer}`}>
            <form method="post" onSubmit={handleSubmit}>
              <div className={`${styles.formInput}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className={`${styles.formInput}`}>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Nom d'utilisateur"
                />
              </div>
              <div className={`${styles.formInput}`}>
                <input
                  type="password"
                  name="oldPassword"
                  onChange={handleChange}
                  placeholder="Ancien mot de passe"
                />
              </div>
              <div className={`${styles.formInput}`}>
                <input
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  placeholder="Mot de passe"
                />
              </div>
              <div>
                <EditUserPp OnUserPpChange={handleUserPpChange} />
              </div>
              <div className="mb-1 mt-4 flex justify-center">
                <button type="submit">Enregistrer</button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
