'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';

import styles from '@/app/styles/component.module.scss';

export default function LayerLeft(props: {
  children:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<AwaitedReactNode>
    | null
    | undefined;
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Vérifie initialement
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <div>{props.children}</div>
      ) : (
        <div className="relativ flex">
          <div
            className={`h-[calc(100vh-105px)] w-8 border-e-8 border-primary ${styles.leftHeader}`}
          >
            <div className="absolute bottom-4 left-10">
              <button onClick={() => signOut()}>Logout</button>
            </div>
          </div>
          <div>
            <div className={styles.onglet}>
              <Link href="/user/watchlist">Film à voir</Link>
              <Link href="/user/favoris">Vos Favoris</Link>
              <Link href="/user/watched">Vos notations</Link>
            </div>
            <div className="mt-40">{props.children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
