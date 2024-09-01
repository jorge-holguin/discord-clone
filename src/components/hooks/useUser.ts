import { useEffect, useState } from 'react';
import { useRandomUser } from './useRandomUser';

export const useUser = () => {
  const [user, setUser] = useState<string | null>(null);
  const randomUser = useRandomUser();

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    } else {
      localStorage.setItem('username', randomUser);
      setUser(randomUser);
    }
  }, [randomUser]);

  return user;
};
