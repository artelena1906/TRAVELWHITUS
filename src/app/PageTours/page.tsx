'use client';
import { useState } from 'react';
import styles from './css/PageTours.module.css';
import MainPageSearch from '../MainPage/tsx/MainPageSearch';
import MainPageSectionTour from '../MainPage/tsx/MainPageSectionTour';
import { Filters } from '../MainPage/tsx/MainPageSearch';

export default function PageTours() {
  const [filters, setFilters] = useState<Filters | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.leftcolumn}>
        <MainPageSearch onFiltersChange={setFilters} />
      </div>
      <div className={styles.rightcolumn}>
        <MainPageSectionTour filters={filters} />
      </div>
    </div>
  );
}
