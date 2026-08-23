import React, { createContext, useState, useContext } from 'react';
import { MOCK_MATERIALS } from '../services/mockData';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState('');
  const [results, setResults] = useState([]);

  // Load materials (combining initial mock materials and real-time uploads from localStorage)
  const getCombinedMaterials = () => {
    const uploaded = JSON.parse(localStorage.getItem('uni_materials') || '[]');
    return [...uploaded, ...MOCK_MATERIALS];
  };

  const refreshMaterials = () => {
    const allMaterials = getCombinedMaterials();
    if (!searchQuery.trim()) {
      setResults(allMaterials);
      return;
    }
    const filtered = allMaterials.filter(item =>
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.department && item.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setResults(filtered);
  };

  const setSearchQuery = (query) => {
    setSearchQueryState(query);
    const allMaterials = getCombinedMaterials();
    if (!query.trim()) {
      setResults(allMaterials);
      return;
    }

    const filtered = allMaterials.filter(item =>
      (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
      (item.author && item.author.toLowerCase().includes(query.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase())) ||
      (item.code && item.code.toLowerCase().includes(query.toLowerCase())) ||
      (item.department && item.department.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);
  };

  // Initial load & window storage listener
  React.useEffect(() => {
    refreshMaterials();
    const handleStorageChange = () => refreshMaterials();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, handleSearch: setSearchQuery, results, refreshMaterials }}>
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
