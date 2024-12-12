'use client';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/app/context/Authorization';
import styles from '@/app/styles/component.module.scss';
import ppDefault from '@/public/images/ppDefault.png';
import logo from '@/public/images/SoireeTV_Icone-removebg-transformed.png';

import ResearchFriend from '../research/ReasearchFriend';
import ResearchMovie from '../research/ReasearchMovie';

export default function Header() {
  const { isAuthentificated } = useAuth();

  if (!isAuthentificated) {
    return null;
  }
  return (
    <div>
      <header
        className={`${styles.header} max-md:static max-md:h-36 max-md:flex-col`}
      >
        <div className="flex items-center justify-center max-md:w-11/12">
          <div className="mr-8 size-14 md:hidden">
            <FontAwesomeIcon icon={faBars} className="size-full" />
          </div>
          <Link href="/">
            <Image
              src={logo}
              alt="logo canapé"
              width={200}
              className="max-md:mr-6 max-md:w-28 md:ml-2"
            />
          </Link>
          <h1 className="text-3xl md:hidden">Soirée TV</h1>
        </div>
        <div className="flex max-md:w-full max-md:justify-center">
          <div className="max-md:w-11/12">
            <ResearchMovie />
          </div>
          <div className="max-md:hidden">
            <ResearchFriend />
          </div>
        </div>
        <nav className="flex items-center max-md:hidden">
          <Link href="/profil">
            <Image src={ppDefault} alt="photo de profil" width={110} />
          </Link>
        </nav>
      </header>
    </div>
  );
}
