'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaChartBar,
  FaChartPie,
  FaChevronDown,
  FaListOl,
  FaRegCheckCircle,
  FaRegEdit,
  FaSortAmountUp,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_TITLE } from '~/constants';
import { ActionType, useAppState } from '~/context/useAppState';
import styles from './index.module.css';

export const Header = () => {
  const {
    dispatch,
    state: { isEditMode },
  } = useAppState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.root}>
      <span className={styles.logoAndTitle}>
        <Image
          src="/images/logo.jpg"
          width={50}
          height={50}
          alt="logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>{SITE_TITLE}</h1>
      </span>
      <div className={styles.floatingActionButton} onClick={toggleMenu}>
        {isMenuOpen ? <FaChevronDown /> : <FaBars />}
      </div>
      {isMenuOpen && (
        <div className={styles.menu} ref={menuRef} onClick={handleClose}>
          <div
            className={styles.menuItem}
            onClick={() => {
              dispatch({ type: ActionType.SortColors });
            }}>
            <FaSortAmountUp />
            Sort
          </div>
          <Link href={'/counter'} style={{ textDecoration: 'none' }}>
            <div className={styles.menuItem}>
              <FaListOl />
              Counter
            </div>
          </Link>
          <Link href={'/pie'} style={{ textDecoration: 'none' }}>
            <div className={styles.menuItem}>
              <FaChartPie size={20} />
              Pie
            </div>
          </Link>
          <Link href={'/bar'} style={{ textDecoration: 'none' }}>
            <div className={styles.menuItem}>
              <FaChartBar size={20} />
              Bar
            </div>
          </Link>
          <div
            className={styles.menuItem}
            style={{ borderBottom: 'none' }}
            onClick={() => {
              dispatch({ type: ActionType.ToggleEditMode });
            }}>
            {isEditMode ? <FaRegCheckCircle /> : <FaRegEdit />}
            {isEditMode ? 'Done' : 'Edit'}
          </div>
        </div>
      )}
    </div>
  );
};
