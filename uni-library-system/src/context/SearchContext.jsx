import React, { createContext, useState, useContext } from 'react';
import { MOCK_MATERIALS } from '../services/mockData';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(MOCK_MATERIALS);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setResults(MOCK_MATERIALS);
      return;
    }

    const filtered = MOCK_MATERIALS.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.author.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, results, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
