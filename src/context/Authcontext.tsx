"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axiosClient from "../lib/axiosclient";

//--------Define types for the auth context
interface AuthContextType {
  mobile: string;
  otpsent: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  sendOtp: (mobile: string) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (otp: string) => Promise<{ success: boolean; message?: string; token?: string }>;
  logout: () => void;
}

//-----------Create Auth Context with proper typing
const AuthContext = createContext<AuthContextType | null>(null);
//------------Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

//----------------Create a provider for Auth Context
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [mobile, setMobile] = useState<string>("");
  const [otpsent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    //------------------------Load token on refresh
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  //---------------------Function to send OTP
  const sendOtp = async (mobile: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setLoading(true);
      const response = await axiosClient.post("/send-otp", { mobile: mobile });
      if (response.data.success) {
        setMobile(mobile);
        setOtpSent(true);
      }
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      return { 
        success: false, 
        message: error.response?.data?.message || "Something went wrong" 
      };
    }
  };

  //------------------------Function to verify OTP
  const verifyOtp = async (otp: string): Promise<{ success: boolean; message?: string; token?: string }> => {  
    try {
      setLoading(true);
      const response = await axiosClient.post("/verify-otp", { mobile: mobile, otp: otp });
      if (response.data.success) {
        setIsAuthenticated(true);
        setToken(response.data.token);
        //-----------Save token to localStorage
        localStorage.setItem("authToken", response.data.token);
      }
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      return { 
        success: false, 
        message: error.response?.data?.message || "Something went wrong" 
      };
    }
  };

  //----------------------Function to logout
  const logout = (): void => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("authToken");
    setMobile("");
    setOtpSent(false);
  };

    return (
    <AuthContext.Provider
      value={{
        mobile,
        otpsent,
        loading,
        isAuthenticated,
        token,
        sendOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//-----------------Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};