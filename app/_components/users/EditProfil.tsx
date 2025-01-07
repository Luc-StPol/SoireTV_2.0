'use client';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
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

export default function EditProfil() {
  const [userPp, setUserPp] = useState(new Blob());
  const session = useSession();
  const userId = session.data?.user?.id;

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

    // Create body object with non-empty fields
    const body: UserData = {
      userId: userId || '',
    };
    if (userData.name !== '') body.name = userData.name;
    if (userData.email !== '') body.email = userData.email;
    if (userData.oldPassword !== '') body.oldPassword = userData.oldPassword;
    if (userData.newPassword !== '') body.newPassword = userData.newPassword;

    if (Object.keys(body).length > 0) {
      try {
        await editUserInformations(body);
      } catch (err) {
        console.log(err);
      }
    }

    if (userPp && userPp.type.startsWith('image/')) {
      try {
        const formData = new FormData();
        formData.append('file', userPp);
        formData.append('userId', `${userId}`);
        await editUserPp(formData);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('userPp does not contain an image');
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
