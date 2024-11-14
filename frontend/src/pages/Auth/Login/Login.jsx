import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeSlash } from 'iconsax-react';
import { useNavigate } from "react-router-dom";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { API_URL } from "../../../helpers/networt";
import axios from 'axios';

const Login = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        navigate("/panel");
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
              email,
              password,
            });
            const userRole = response.data.user.role;
            const info =response.data.message;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("id", response.data.user.id);
            if (rememberMe) {
                localStorage.setItem("savedEmail", email);
                localStorage.setItem("savedPassword", password);
                navigate("/panel"); // Navigasi hanya jika "Ingat Saya" dicentang
            } else {
                localStorage.removeItem("savedEmail");
                localStorage.removeItem("savedPassword");
                navigate("/panel"); // Tetap navigasi ke /panel setelah login berhasil
            }
          } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response ? error.response.data.message : "Something went wrong";
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: errorMessage,  // Pesan error dari response atau fallback
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
          }
    }
    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            <Toaster />
            <div className="mx-auto w-full max-w-[450px] pt-[52px] pb-[52px] ">
                <h1 className='text-center text-[30px] font-semibold'>Masuk ke akun anda</h1>
                <p className="text-[14px] text-center font-medium  text-gray-500 mt-[16px] mb-[36px]">
                    Masukkan email dan password anda
                </p>

                <div className="grid gap-[36px]">
                    <div className='grid gap-4'>
                        <div className="grid gap-1">
                            <Label htmlFor="email" className="text-[14px]">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-[40px] text-[14px] rounded-lg border-slate-300"
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="password" className="text-[14px]">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-[40px] text-[14px] rounded-lg border-slate-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                                >
                                    {showPassword ? <EyeSlash size="16" color="#94A3B8" /> : <Eye size="16" color="#94A3B8" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="rememberMe"   onChange={(e) => setRememberMe(e.target.checked)} />
                            <label
                                 htmlFor="rememberMe"
                                className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ingat Saya
                            </label>
                        </div>
                        <Link to="/auth/forgot-password" className="ml-auto inline-block text-[14px] font-medium ">
                            Lupa Password?
                        </Link>
                    </div>
                    <Button onClick={handleLogin} className="w-full h-[40px]  text-[14px] font-medium bg-[#0036AA] hover:bg-[#0036AA]">
                        Masuk
                    </Button>
                   
                </div>
            </div>
        </div>
    )
}

export default Login
