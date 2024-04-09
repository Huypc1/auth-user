import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UseContext = createContext({});
export function UseContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then((response) => {
        const userData = response.data; // Đảm bảo API trả về dữ liệu trong một đối tượng có thuộc tính 'data'
        setUser(userData);
      });
    }
  }, [user]); // Chuyển user vào mảng dependencies của useEffect
   console.log(user);
  return (
    <UseContext.Provider value={{ user, setUser }}> 
      {children}
    </UseContext.Provider>
  );
}
