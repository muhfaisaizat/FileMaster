import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Add } from 'iconsax-react';
import { X } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { Eye, EyeSlash } from 'iconsax-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { API_URL } from "../../../helpers/networt";
import axios from 'axios';

const AddUser = ({className, buttonProps, textButton}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const removeImage = () => {
        setImage(null);
    };

    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        status:'Aktif',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSelectChange = (value) => {
        setFormData({ ...formData, role: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nama, email, password, confirmPassword, role } = formData;
        const token = localStorage.getItem("token");
        const form = new FormData();
        form.append('name', formData.nama);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('role', formData.role);
        form.append('status', formData.status);
        if (fileInputRef.current.files[0]) {
            form.append("image", fileInputRef.current.files[0]);
        }

        // Validasi
        if (!nama) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama pengguna harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!email) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Email harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!password) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kata sandi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kata sandi tidak cocok.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!role) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Role harus dipilih.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/users`, form, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast({
                title: 'User Added Successfully',
                description: `User ${formData.nama} has been created.`,
                status: 'success',
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        } catch (error) {
            console.error('Error adding user:', error);
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request data:', error.request);
            } else {
                // Other errors (e.g., configuration issues)
                console.error('Error message:', error.message);
            }
            toast({
                title: 'Error Adding User',
                description: 'An internal server error occurred. Please try again later.',
                status: 'error',
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }
        

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={`bg-[#0036AA] hover:bg-[#0036AA] h-[36px] text-[14px] font-medium ${className}`} {...buttonProps}> <Add size="18" />  {!isMobile ? 'Tambahkan Pengguna' : textButton } </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[505px] ${isMobile && ('h-full')}`}>
                {!isMobile && (
                    <>
                        <div className='flex justify-end'>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" className='p-0 h-[20px]'>
                                    <X className='h-[12px] w-[12px]' />
                                </Button>
                            </DialogClose>
                        </div>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] font-semibold'>Tambah pengguna</DialogTitle>
                        </DialogHeader>
                    </>
                )}
                <div className={`grid gap-[16px] ${isMobile && ('pb-[45px]')}`}>
                    <div className='h-[154px] w-[154px]'>
                        <div
                            className={`relative flex items-center justify-center w-full h-full rounded-lg overflow-hidden ${image ? '' : 'border-dashed border-2 border-black'}`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {!image ? (
                                <button
                                    onClick={triggerFileInput}
                                    className="flex items-center gap-2  hover:text-black bg-transparent"
                                >
                                    <FiPlus size={20} />
                                    <span className="text-[14px] font-normal">Upload Image </span>
                                </button>
                            ) : (
                                <>
                                    <img
                                        src={image}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                                        onClick={triggerFileInput}
                                    />
                                    {hovered && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={triggerFileInput}
                                                className="text-[14px] font-normal text-white "
                                            >
                                                Change Cover
                                            </button>

                                        </div>
                                    )}
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="nama" className="text-[14px]">Nama pengguna<span className='text-rose-500'>*</span></Label>
                        <Input
                            id="nama"
                            placeholder="Masukkan Nama pengguna"
                            required
                            className="h-[36px] text-[14px] rounded-lg border-slate-300"
                            value={formData.nama}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="email" className="text-[14px]">Email<span className='text-rose-500'>*</span></Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Masukkan email anda"
                            required
                            className="h-[36px] text-[14px] rounded-lg border-slate-300"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password" className="text-[14px]">Kata Sandi<span className='text-rose-500'>*</span></Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Tulis Kata Sandi baru"
                                required
                                className="h-[36px] text-[14px] rounded-lg border-slate-300 pr-10"
                                value={formData.password}
                                onChange={handleInputChange}
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
                    <div className="grid gap-1">
                        <Label htmlFor="confirm-password" className="text-[14px]">Ulangi Kata Sandi Anda<span className='text-rose-500'>*</span></Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Ulangi Kata Sandi diatas"
                                required
                                className="h-[36px] text-[14px] rounded-lg border-slate-300 pr-10"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                {showConfirmPassword ? <EyeSlash size="16" color="#94A3B8" /> : <Eye size="16" color="#94A3B8" />}
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="role" className="text-[14px]">Role<span className='text-rose-500'>*</span></Label>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-full h-[36px] text-[14px] rounded-lg border-slate-300 ">
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Admin" className='text-[14px]'>Admin</SelectItem>
                                    <SelectItem value="Manager" className='text-[14px]'>Manager</SelectItem>
                                    <SelectItem value="Kasir" className='text-[14px]'>Kasir</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {isMobile && (
                        <div className='fixed flex justify-between bottom-0 py-[10px] w-[89%] bg-white'>
                            <DialogClose asChild>
                                <Button variant='secondary' className='text-[16px] font-bold h-[48px] w-[168.5px]' >Batal</Button>
                            </DialogClose>
                            <Button onClick={handleSubmit} className='text-[16px] font-bold h-[48px] w-[168.5px]' style={{ background: 'linear-gradient(90deg, #0241C1, #175DEC)' }} >Simpan</Button>
                        </div>
                    )}
                </div>
                {!isMobile && (
                    <DialogFooter>
                        <Button onClick={handleSubmit} className='bg-[#0036AA] hover:bg-[#0036AA] h-[36px] text-[14px] font-medium'>Simpan</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AddUser
