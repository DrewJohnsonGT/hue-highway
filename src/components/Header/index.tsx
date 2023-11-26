'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaChartPie,
  FaChevronDown,
  FaListOl,
  FaRegCheckCircle,
  FaRegEdit,
  FaSortAmountUp,
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_TITLE } from '~/constants';
import { useAppContext } from '~/context/useAppContext';
import styles from './index.module.css';

export const Header = () => {
  const { colors, isEditMode, setColors, toggleEditMode } = useAppContext();
  const pathname = usePathname();
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

  const handleSortColors = () => {
    const sortedColors = [...colors].sort((a, b) => b.count - a.count);
    setColors(sortedColors);
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
      <h1 className={styles.title}>{SITE_TITLE}</h1>
      <div className={styles.floatingActionButton} onClick={toggleMenu}>
        {isMenuOpen ? <FaChevronDown /> : <FaBars />}
      </div>
      {isMenuOpen && (
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.menuItem} onClick={handleSortColors}>
            <FaSortAmountUp />
            Sort
          </div>
          {pathname === '/counter' && (
            <Link href={'/chart'} style={{ textDecoration: 'none' }}>
              <div className={styles.menuItem}>
                <FaChartPie size={20} />
                Chart
              </div>
            </Link>
          )}
          {pathname === '/chart' && (
            <Link href={'/counter'} style={{ textDecoration: 'none' }}>
              <div className={styles.menuItem}>
                <FaListOl />
                Counter
              </div>
            </Link>
          )}
          <div
            className={styles.menuItem}
            style={{ borderBottom: 'none' }}
            onClick={toggleEditMode}>
            {isEditMode ? <FaRegCheckCircle /> : <FaRegEdit />}
            {isEditMode ? 'Done' : 'Edit'}
          </div>
        </div>
      )}
    </div>
  );
};
