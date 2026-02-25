import React, { createContext, useContext, useState, useEffect } from 'react';

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load selected organization from localStorage on mount
  useEffect(() => {
    try {
      const storedOrg = localStorage.getItem('selectedOrganization');
      if (storedOrg) {
        setSelectedOrganization(JSON.parse(storedOrg));
      }
    } catch (error) {
      console.error('Error loading organization from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever selectedOrganization changes
  useEffect(() => {
    if (selectedOrganization) {
      localStorage.setItem('selectedOrganization', JSON.stringify(selectedOrganization));
    } else {
      localStorage.removeItem('selectedOrganization');
    }
  }, [selectedOrganization]);

  const selectOrganization = (organization) => {
    setSelectedOrganization(organization);
  };

  const clearOrganization = () => {
    setSelectedOrganization(null);
  };

  const hasSelectedOrganization = () => {
    return selectedOrganization !== null;
  };

  const value = {
    selectedOrganization,
    selectOrganization,
    clearOrganization,
    hasSelectedOrganization,
    isLoading
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

export default OrganizationProvider;