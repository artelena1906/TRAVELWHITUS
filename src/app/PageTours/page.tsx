'use client';
import { useState, Suspense } from 'react';
import styles from './css/PageTours.module.css';
import MainPageSearch from '../MainPage/tsx/MainPageSearch';
import MainPageSectionTourAll from '../MainPage/tsx/MainPageSectionTourAll';
import { Filters } from '../MainPage/tsx/MainPageSearch';

export default function PageTours() {
  const [filters, setFilters] = useState<Filters | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.leftcolumn}>
        <Suspense fallback={<div>Завантаження фільтрів...</div>}>
          <MainPageSearch onFiltersChange={setFilters} />
        </Suspense>
      </div>
      <div className={styles.rightcolumn}>
        <MainPageSectionTourAll filters={filters} />
      </div>
    </div>
  );
}
