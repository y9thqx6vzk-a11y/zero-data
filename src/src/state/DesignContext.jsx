import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialDesignVector, ARCHETYPES } from '../engine/initial_state';

const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [designVector, setDesignVector] = useState(initialDesignVector);
  
  const loadArchetype = useCallback((name) => {
    if (ARCHETYPES[name]) {
      setDesignVector(ARCHETYPES[name]);
    }
  }, []);

  const updateParameter = useCallback((key, value) => {
    setDesignVector((prev) => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  }, []);

  return (
    <DesignContext.Provider value={{ designVector, loadArchetype, updateParameter }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesignEngine = () => {
  const context = useContext(DesignContext);
  if (!context) throw new Error("useDesignEngine must be used within DesignProvider");
  return context;
};
