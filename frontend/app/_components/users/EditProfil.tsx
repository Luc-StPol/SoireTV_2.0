import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateAction, useState } from 'react';

import styles from '@/app/styles/form.module.scss';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EditUserPp from './EditUserPp';

export default function EditProfil() {

  const [userPp, setUserPp] = useState()

  const handleUserPpChange = (newUserPp: SetStateAction<undefined>) => {
    setUserPp(newUserPp)
  }

  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
    userName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log(userPp)
  }

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
                  name="userEmail"
                  id="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className={`${styles.formInput}`}>
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  placeholder="Nom d'utilisateur"
                />
              </div>
              <div className={`${styles.formInput}`}>
                <input
                  type="password"
                  name="userPassword"
                  onChange={handleChange}
                  placeholder="Ancien mot de passe"
                />
              </div>
              <div className={`${styles.formInput}`}>
                <input
                  type="password"
                  name="userPassword"
                  onChange={handleChange}
                  placeholder="Mot de passe"
                />
              </div>
              <div>
                <EditUserPp OnUserPpChange={handleUserPpChange}/>
              </div>
              <div className='flex justify-center mb-1 mt-4'>
              <button>Enregistrer</button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
