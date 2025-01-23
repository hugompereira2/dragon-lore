import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Alert from '@/components/Alert/Alert';

type AlertType = 'success' | 'error' | 'info';

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

type Alert = {
  type: AlertType;
  message: string;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<Alert[]>([]);

  const hideAlert = (index: number) => {
    setAlertMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const showAlert = (message: string, type: AlertType) => {
    const newAlert: Alert = { message, type };
    setAlertMessages((prev) => [...prev, newAlert]);
  };

  useEffect(() => {
    if (alertMessages.length > 0) {
      const timer = setTimeout(() => {
        setAlertMessages((prev) => prev.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertMessages]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alertMessages.map((alert, index) => (
        <Alert
          key={index}
          message={alert.message}
          type={alert.type}
          onClose={() => hideAlert(index)}
        />
      ))}
      {children}
    </AlertContext.Provider>
  );
};
