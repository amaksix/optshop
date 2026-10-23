import { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'sm-cookie-consent';
const LegalContext = createContext(null);

export function LegalProvider({ children }) {
  const [open, setOpen] = useState(null);
  const [accepted, setAccepted] = useState(() => localStorage.getItem(STORAGE_KEY) === 'accepted');

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setAccepted(true);
  };

  return (
    <LegalContext.Provider value={{ open, setOpen, accepted, accept }}>
      {children}
    </LegalContext.Provider>
  );
}

export function useLegal() {
  const context = useContext(LegalContext);
  if (!context) throw new Error('useLegal must be used within LegalProvider');
  return context;
}
