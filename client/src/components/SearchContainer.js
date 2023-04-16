import React, { useMemo, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { useAppContext } from '../context/appContext';

const SearchContainer = () => {
    const [localSearch, setLocalSearch] = useState('');
    const {
      isLoading,
      handleChange,
    } = useAppContext();
    
    const debounce = () => {
      let timeoutID;
      return (e) => {
        setLocalSearch(e.target.value);
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          handleChange({ name: e.target.name, value: e.target.value });
        }, 1000);
      };
    };
    const optimizedDebounce = useMemo(() => debounce(), 
    // eslint-disable-next-line
    []);
  return (
    <>
        <form className='nav-search-container'>
            <input
                type='search'
                name='search'
                value={localSearch}
                onChange={optimizedDebounce}
                className='nav-search'
                placeholder='Search for products, brands and categories'
            />
            <button disabled={isLoading} className='search-btn'><BiSearch className='search-icon' /></button>
        </form>
    </>
  )
}

export default SearchContainer