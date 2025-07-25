// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import styles from '../css/MainPageSearch.module.css';
// import { AiOutlineDown } from "react-icons/ai";

// interface TourRaw {
//   country: string;
//   price: string | number;
//   continent: string;
//   tourTypes?: string[];
// }

// interface Country {
//   id: number;
//   name: string;
//   price: number;
//   continent: string;
//   tourTypes: string[];
// }

// export interface Filters {
//   continent: string[];
//   countries: string[];
//   months: string[];
//   tourTypes: string[];
//   priceRange: [number, number];
// }

// const CONTINENTS = ['Європа', 'Азія', 'Південна Амерка', 'Північна Америка', 'Африка'];
// const MONTHS = [
//   'Січень','Лютий','Березень','Квітень','Травень','Червень',
//   'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
// ];
// const TOUR_TYPES = ['На машині', 'Екскурсії з гідом включені', 'Без екскурсій', 'Винний тур', 'Активний тур'];

// type StringArrayKeys = keyof Omit<Filters, 'priceRange'>;

// interface MainPageSearchProps {
//   onFiltersChange?: (filters: Filters) => void;
// }

// export default function MainPageSearch({ onFiltersChange }: MainPageSearchProps) {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [filters, setFilters] = useState<Filters>({
//     continent: [],
//     countries: [],
//     months: [],
//     tourTypes: [],
//     priceRange: [0, 1000],
//   });

//   const [activeAcc, setActiveAcc] = useState<{ [key: string]: boolean }>({});
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch('/MainPageHeader.json');
//       if (!res.ok) throw new Error("Failed to fetch JSON");
//       const data = await res.json();

//       const tours: Country[] = (data.bodyData.tours as TourRaw[]).map((t, i) => ({
//         id: i,
//         name: t.country,
//         price: Number(t.price),
//         continent: t.continent,
//         tourTypes: t.tourTypes || [],
//       }));
//       setCountries(tours);

//       const prices = tours.map(t => t.price);
//       const min = Math.min(...prices);
//       const max = Math.max(...prices);
//       setMinPrice(min);
//       setMaxPrice(max);

//       const sp: Record<string, string> = Object.fromEntries([...searchParams.entries()]);
//       setFilters(f => ({
//         ...f,
//         continent: sp.continent?.split(',') || [],
//         countries: sp.countries?.split(',') || [],
//         months: sp.months?.split(',') || [],
//         tourTypes: sp.tourTypes?.split(',') || [],
//         priceRange:
//           sp.priceMin && sp.priceMax
//             ? [Number(sp.priceMin), Number(sp.priceMax)]
//             : [min, max],
//       }));
//     }

//     fetchData();
//   }, [searchParams]);

//   useEffect(() => {
//     if (onFiltersChange) {
//       onFiltersChange(filters);
//     }
//   }, [filters, onFiltersChange]);

//   const filteredTours = countries.filter(tour => {
//     const matchContinent = filters.continent.length === 0 || filters.continent.includes(tour.continent);
//     const matchCountry = filters.countries.length === 0 || filters.countries.includes(tour.name);
//     const matchTourType = filters.tourTypes.length === 0 || tour.tourTypes.some(type => filters.tourTypes.includes(type));
//     const matchPrice = tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1];

//     return matchContinent && matchCountry && matchTourType && matchPrice;
//   });

//   const isFiltered =
//     filters.continent.length > 0 ||
//     filters.countries.length > 0 ||
//     filters.months.length > 0 ||
//     filters.tourTypes.length > 0 ||
//     filters.priceRange[0] !== minPrice ||
//     filters.priceRange[1] !== maxPrice;

//   useEffect(() => {
//     const qp: Record<string, string> = {};
//     if (filters.continent.length) qp.continent = filters.continent.join(',');
//     if (filters.countries.length) qp.countries = filters.countries.join(',');
//     if (filters.months.length) qp.months = filters.months.join(',');
//     if (filters.tourTypes.length) qp.tourTypes = filters.tourTypes.join(',');
//     qp.priceMin = String(filters.priceRange[0]);
//     qp.priceMax = String(filters.priceRange[1]);

//     router.push('/PageTours?' + new URLSearchParams(qp).toString(), { scroll: false });
//   }, [filters, router]);

//   const toggle = (key: StringArrayKeys, value: string) => {
//     setFilters(f => {
//       const arr = new Set(f[key]);
//       if (arr.has(value)) {
//         arr.delete(value);
//       } else {
//         arr.add(value);
//       }
//       return { ...f, [key]: Array.from(arr) };
//     });
//   };

//   return (
//     <div className={styles.wrapper}>
//       <p className={styles.wrappercounter}>
//         Знайдено турів: {isFiltered ? filteredTours.length : countries.length} з {countries.length}
//       </p>

//       <p className={styles.wrapperfilter}>Відсортувати за:</p>

//       <div className={styles.filtersScrollable}>
//         {isFiltered && (
//           <div className={styles.activeFilters}>
//             <div className={styles.filtersList}>
//               {filters.continent.map(c => (
//                 <button key={`cont-${c}`} className={styles.filterChip} onClick={() => toggle('continent', c)}>
//                   {c} ✖
//                 </button>
//               ))}
//               {filters.countries.map(c => (
//                 <button key={`country-${c}`} className={styles.filterChip} onClick={() => toggle('countries', c)}>
//                   {c} ✖
//                 </button>
//               ))}
//               {filters.months.map(m => (
//                 <button key={`month-${m}`} className={styles.filterChip} onClick={() => toggle('months', m)}>
//                   {m} ✖
//                 </button>
//               ))}
//               {filters.tourTypes.map(t => (
//                 <button key={`type-${t}`} className={styles.filterChip} onClick={() => toggle('tourTypes', t)}>
//                   {t} ✖
//                 </button>
//               ))}
//               {(filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) && (
//                 <button
//                   className={styles.filterChip}
//                   onClick={() => setFilters(f => ({ ...f, priceRange: [minPrice, maxPrice] }))}
//                 >
//                   Ціна: {filters.priceRange[0]}–{filters.priceRange[1]} ✖
//                 </button>
//               )}
//             </div>

//             <div className={styles.clearButtonWrapper}>
//               <button
//                 className={styles.clearButton}
//                 onClick={() => {
//                   setFilters({
//                     continent: [],
//                     countries: [],
//                     months: [],
//                     tourTypes: [],
//                     priceRange: [minPrice, maxPrice],
//                   });
//                   setActiveAcc({});
//                 }}
//               >
//                 Очистити все
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Континент */}
//         <div className={styles.accordion}>
//           <button onClick={() => setActiveAcc(a => ({ ...a, continent: !a.continent }))}>
//             Континент <AiOutlineDown className={styles.arrow} />
//           </button>
//           {activeAcc.continent && (
//             <div className={styles.panel}>
//               {CONTINENTS.map(c => (
//                 <label key={c}>
//                   <input
//                     type="checkbox"
//                     checked={filters.continent.includes(c)}
//                     onChange={() => toggle('continent', c)}
//                   />
//                   {c}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Країна */}
//         <div className={styles.accordion}>
//           <button onClick={() => setActiveAcc(a => ({ ...a, countries: !a.countries }))}>
//             Країна <AiOutlineDown className={styles.arrow} />
//           </button>
//           {activeAcc.countries && (
//             <div className={styles.panel}>
//               {Array.from(new Set(countries.map(c => c.name))).map(cn => (
//                 <label key={cn}>
//                   <input
//                     type="checkbox"
//                     checked={filters.countries.includes(cn)}
//                     onChange={() => toggle('countries', cn)}
//                   />
//                   {cn}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Місяць */}
//         <div className={styles.accordion}>
//           <button onClick={() => setActiveAcc(a => ({ ...a, months: !a.months }))}>
//             Дата <AiOutlineDown className={styles.arrow} />
//           </button>
//           {activeAcc.months && (
//             <div className={styles.panel}>
//               {MONTHS.map(m => (
//                 <label key={m}>
//                   <input
//                     type="checkbox"
//                     checked={filters.months.includes(m)}
//                     onChange={() => toggle('months', m)}
//                   />
//                   {m}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Тип туру */}
//         <div className={styles.accordion}>
//           <button onClick={() => setActiveAcc(a => ({ ...a, tourTypes: !a.tourTypes }))}>
//             Тип туру <AiOutlineDown className={styles.arrow} />
//           </button>
//           {activeAcc.tourTypes && (
//             <div className={styles.panel}>
//               {TOUR_TYPES.map(t => (
//                 <label key={t}>
//                   <input
//                     type="checkbox"
//                     checked={filters.tourTypes.includes(t)}
//                     onChange={() => toggle('tourTypes', t)}
//                   />
//                   {t}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Ціна */}
//         <div className={styles.accordion}>
//           <button onClick={() => setActiveAcc(a => ({ ...a, price: !a.price }))}>
//             Ціна <AiOutlineDown className={styles.arrow} />
//           </button>
//           {activeAcc.price && (
//             <div className={styles.panel}>
//               <input
//                 type="range"
//                 min={minPrice}
//                 max={maxPrice}
//                 value={filters.priceRange[1]}
//                 onChange={e =>
//                   setFilters(f => ({
//                     ...f,
//                     priceRange: [minPrice, Number(e.target.value)],
//                   }))
//                 }
//               />
//               <div className={styles.priceRangeLabels}>
//                 <span>{filters.priceRange[0]}</span>
//                 <span>{filters.priceRange[1]}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../css/MainPageSearch.module.css';
import { AiOutlineDown } from 'react-icons/ai';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../api/firebase';

interface TourRaw {
  country: string;
  price: number;
  continent: string;
  tourTypes?: string[];
  month?: string;
}

interface Country {
  id: string;
  name: string;
  price: number;
  continent: string;
  tourTypes: string[];
  month?: string;
}

export interface Filters {
  continent: string[];
  countries: string[];
  months: string[];
  tourTypes: string[];
  priceRange: [number, number];
}

const CONTINENTS = ['Європа', 'Азія', 'Південна Амерка', 'Північна Америка', 'Африка'];
const MONTHS = [
  'Січень','Лютий','Березень','Квітень','Травень','Червень',
  'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
];
const TOUR_TYPES = ['На машині', 'Екскурсії з гідом включені', 'Без екскурсій', 'Винний тур', 'Активний тур'];

type StringArrayKeys = keyof Omit<Filters, 'priceRange'>;

interface MainPageSearchProps {
  onFiltersChange?: (filters: Filters) => void;
}

export default function MainPageSearch({ onFiltersChange }: MainPageSearchProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filters, setFilters] = useState<Filters>({
    continent: [],
    countries: [],
    months: [],
    tourTypes: [],
    priceRange: [0, 1000],
  });
  const [activeAcc, setActiveAcc] = useState<{ [key: string]: boolean }>({});
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, 'tours'));
        const toursData: Country[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as TourRaw;
          toursData.push({
            id: doc.id,
            name: data.country,
            price: data.price,
            continent: data.continent,
            tourTypes: data.tourTypes || [],
            month: data.month || '',
          });
        });
        setCountries(toursData);

        const prices = toursData.map((t) => t.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);

        const sp: Record<string, string> = Object.fromEntries([...searchParams.entries()]);
        const initialFilters: Filters = {
          continent: sp.continent?.split(',') || [],
          countries: sp.countries?.split(',') || [],
          months: sp.months?.split(',') || [],
          tourTypes: sp.tourTypes?.split(',') || [],
          priceRange:
            sp.priceMin && sp.priceMax
              ? [Number(sp.priceMin), Number(sp.priceMax)]
              : [min, max],
        };

        setFilters(initialFilters);
        setInitialLoadDone(true);
      } catch (error) {
        console.error('Ошибка загрузки туров из Firebase:', error);
      }
    }

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (initialLoadDone && onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange, initialLoadDone]);

  const filteredTours = countries.filter((tour) => {
    const matchContinent =
      filters.continent.length === 0 || filters.continent.includes(tour.continent);
    const matchCountry =
      filters.countries.length === 0 || filters.countries.includes(tour.name);
    const matchTourType =
      filters.tourTypes.length === 0 ||
      tour.tourTypes.some((type) => filters.tourTypes.includes(type));
    const matchPrice =
      tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1];
    const matchMonth =
      filters.months.length === 0 || (tour.month && filters.months.includes(tour.month));

    return matchContinent && matchCountry && matchTourType && matchPrice && matchMonth;
  });

  const isFiltered =
    filters.continent.length > 0 ||
    filters.countries.length > 0 ||
    filters.months.length > 0 ||
    filters.tourTypes.length > 0 ||
    filters.priceRange[0] !== minPrice ||
    filters.priceRange[1] !== maxPrice;

  useEffect(() => {
    if (!initialLoadDone) return;
    const qp: Record<string, string> = {};
    if (filters.continent.length) qp.continent = filters.continent.join(',');
    if (filters.countries.length) qp.countries = filters.countries.join(',');
    if (filters.months.length) qp.months = filters.months.join(',');
    if (filters.tourTypes.length) qp.tourTypes = filters.tourTypes.join(',');
    qp.priceMin = String(filters.priceRange[0]);
    qp.priceMax = String(filters.priceRange[1]);

    router.push('/PageTours?' + new URLSearchParams(qp).toString(), { scroll: false });
  }, [filters, router, initialLoadDone]);

  const toggle = (key: StringArrayKeys, value: string) => {
    setFilters((f) => {
      const arr = new Set(f[key]);
      arr.has(value) ? arr.delete(value) : arr.add(value);
      return { ...f, [key]: Array.from(arr) };
    });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.wrappercounter}>
        Знайдено турів: {isFiltered ? filteredTours.length : countries.length} з {countries.length}
      </p>

      <p className={styles.wrapperfilter}>Відсортувати за:</p>

      <div className={styles.filtersScrollable}>
        {isFiltered && (
          <div className={styles.activeFilters}>
            <div className={styles.filtersList}>
              {filters.continent.map((c) => (
                <button key={`cont-${c}`} className={styles.filterChip} onClick={() => toggle('continent', c)}>
                  {c} ✖
                </button>
              ))}
              {filters.countries.map((c) => (
                <button key={`country-${c}`} className={styles.filterChip} onClick={() => toggle('countries', c)}>
                  {c} ✖
                </button>
              ))}
              {filters.months.map((m) => (
                <button key={`month-${m}`} className={styles.filterChip} onClick={() => toggle('months', m)}>
                  {m} ✖
                </button>
              ))}
              {filters.tourTypes.map((t) => (
                <button key={`type-${t}`} className={styles.filterChip} onClick={() => toggle('tourTypes', t)}>
                  {t} ✖
                </button>
              ))}
              {(filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) && (
                <button
                  className={styles.filterChip}
                  onClick={() => setFilters((f) => ({ ...f, priceRange: [minPrice, maxPrice] }))}
                >
                  Ціна: {filters.priceRange[0]}–{filters.priceRange[1]} ✖
                </button>
              )}
            </div>
            <div className={styles.clearButtonWrapper}>
              <button
                className={styles.clearButton}
                onClick={() => {
                  setFilters({
                    continent: [],
                    countries: [],
                    months: [],
                    tourTypes: [],
                    priceRange: [minPrice, maxPrice],
                  });
                  setActiveAcc({});
                }}
              >
                Очистити все
              </button>
            </div>
          </div>
        )}

            {/* Континент */}
        <div className={styles.accordion}>
          <button onClick={() => setActiveAcc(a => ({ ...a, continent: !a.continent }))}>
            Континент <AiOutlineDown className={styles.arrow} />
          </button>
          {activeAcc.continent && (
            <div className={styles.panel}>
              {CONTINENTS.map(c => (
                <label key={c}>
                  <input
                    type="checkbox"
                    checked={filters.continent.includes(c)}
                    onChange={() => toggle('continent', c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Країна */}
        <div className={styles.accordion}>
          <button onClick={() => setActiveAcc(a => ({ ...a, countries: !a.countries }))}>
            Країна <AiOutlineDown className={styles.arrow} />
          </button>
          {activeAcc.countries && (
            <div className={styles.panel}>
              {Array.from(new Set(countries.map(c => c.name))).map(cn => (
                <label key={cn}>
                  <input
                    type="checkbox"
                    checked={filters.countries.includes(cn)}
                    onChange={() => toggle('countries', cn)}
                  />
                  {cn}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Місяць */}
        <div className={styles.accordion}>
          <button onClick={() => setActiveAcc(a => ({ ...a, months: !a.months }))}>
            Дата <AiOutlineDown className={styles.arrow} />
          </button>
          {activeAcc.months && (
            <div className={styles.panel}>
              {MONTHS.map(m => (
                <label key={m}>
                  <input
                    type="checkbox"
                    checked={filters.months.includes(m)}
                    onChange={() => toggle('months', m)}
                  />
                  {m}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Тип туру */}
        <div className={styles.accordion}>
          <button onClick={() => setActiveAcc(a => ({ ...a, tourTypes: !a.tourTypes }))}>
            Тип туру <AiOutlineDown className={styles.arrow} />
          </button>
          {activeAcc.tourTypes && (
            <div className={styles.panel}>
              {TOUR_TYPES.map(t => (
                <label key={t}>
                  <input
                    type="checkbox"
                    checked={filters.tourTypes.includes(t)}
                    onChange={() => toggle('tourTypes', t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ціна */}
        <div className={styles.accordion}>
          <button onClick={() => setActiveAcc(a => ({ ...a, price: !a.price }))}>
            Ціна <AiOutlineDown className={styles.arrow} />
          </button>
          {activeAcc.price && (
            <div className={styles.panel}>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={e =>
                  setFilters(f => ({
                    ...f,
                    priceRange: [minPrice, Number(e.target.value)],
                  }))
                }
              />
              <div className={styles.priceRangeLabels}>
                <span>{filters.priceRange[0]}</span>
                <span>{filters.priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

