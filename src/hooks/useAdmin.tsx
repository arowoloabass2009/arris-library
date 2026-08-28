// ============================================================
// ARRIS LIBRARY — Admin Context Hook
// ============================================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkAdminSession, authenticateAdmin, logoutAdmin } from '../lib/deviceId';

interface AdminContextType {
  isAdmin: boolean;
  adminId: string | null;
  login: (code: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  adminId: null,
  login: () => false,
  logout: () => {},
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    const adminStatus = checkAdminSession();
    setIsAdmin(adminStatus);
    if (adminStatus) setAdminId('202608');
  }, []);

  const login = (code: string): boolean => {
    const ok = authenticateAdmin(code);
    if (ok) {
      setIsAdmin(true);
      setAdminId('202608');
    }
    return ok;
  };

  const logout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setAdminId(null);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminId, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
