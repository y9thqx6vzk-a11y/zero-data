import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialDesignVector, ARCHETYPES } from '../engine/initial_state';

// יצירת ערוץ תקשורת
const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  // כאן נשמר המצב הנוכחי של העיצוב
  const [designVector, setDesignVector] = useState(initialDesignVector);
  
  // פונקציה לטעינת סגנון שלם (למשל "וינטג'")
  const loadArchetype = useCallback((name) => {
    if (ARCHETYPES[name]) {
      setDesignVector(ARCHETYPES[name]);
    }
  }, []);

  // פונקציה לשינוי פרמטר בודד (למשל רק "כאוס")
  // אנו מוודאים שהערך תמיד נשאר בין 0 ל-1
  const updateParameter = useCallback((key, value) => {
    setDesignVector((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(1, value))
    }));
  }, []);

  const value = {
    designVector,
    loadArchetype,
    updateParameter
  };

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
};

// Hook פשוט לשימוש בקומפוננטות
export const useDesignEngine = () => {
  return useContext(DesignContext);
};