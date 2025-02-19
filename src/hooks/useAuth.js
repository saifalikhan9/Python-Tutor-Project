import { useState, useEffect } from "react";
import axios from "axios";



const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(false);

  const url = import.meta.env.VITE_API_URL;



  // Sync auth state with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signup = async (username, password) => {
    if (!username || !password) return;

    try {
      setIsLoading(true);
      const res = await axios.post(`${url}/api/signup`, { username, password });

      return res.data;
    } catch (error) {
      console.error(error|| "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    if (!username || !password) return;

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${url}/api/login`,
        { username, password },
        { withCredentials: true }
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token); // Store token
        setIsAuthenticated(true);
      }
      if (res.data?.apiKey) {
        localStorage.setItem("apiKey", res.data.apiKey); // Store apiKey
      }
      
      return res.data;
    } catch (error) {
      console.error(error?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${url}/api/logout`, { withCredentials: true });
      localStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error?.message || "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${url}/api/refresh-token`,{},
        { withCredentials: true }
      );
      console.log(res.data,"refreshToken");

      

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token); // Store new token
        setIsAuthenticated(true);
      }

      return res.data;
    } catch (error) {
      console.error(error?.message || "Token refresh failed");
      logout(); // Log out if refresh fails
    }
  };

  // Axios interceptor to handle token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshToken();
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return {
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
  };
};

export default useAuth;
