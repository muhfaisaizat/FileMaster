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

const ViewProfile = ({ isOpen, setIsOpen, selectedProduct }) => {
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


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={`sm:max-w-[439px] p-[25px] ${isMobile && ('h-full')}`}>
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
                            <DialogTitle className='text-[18px] font-semibold'>Detail pengguna</DialogTitle>
                        </DialogHeader>
                    </>
                )}
                <div className={`${isMobile ? 'pb-[45px]' : 'grid gap-[16px] py-[12px]'}`}>
                    <div className='h-[154px] w-[154px]'>
                        <img src={selectedProduct.foto} alt={selectedProduct.nama} className='w-full h-full rounded-[8px]' />
                    </div>
                    <table className={`table-auto w-full ${isMobile && ('mt-[16px]')} `}>
                        <tbody className=' w-full text-[14px]'>
                            <tr>
                                <td className=' w-[37%] py-4 text-slate-500'>Nama</td>
                                <td className=' w-[63%] py-4'>{selectedProduct.nama}</td>
                            </tr>
                            <tr>
                                <td className=' w-[37%] py-4 text-slate-500'>Role</td>
                                <td className=' w-[63%] py-4'>{selectedProduct.role}</td>
                            </tr>
                            <tr>
                                <td className=' w-[37%] py-4 text-slate-500'>Email</td>
                                <td className=' w-[63%] py-4'>{selectedProduct.email}</td>
                            </tr>
                            <tr>
                                <td className=' w-[37%] py-4 text-slate-500'>Status</td>
                                <td className=' w-[63%] py-4'>{selectedProduct.status}</td>
                            </tr>
                            <tr>
                                <td className=' w-[37%] py-4 text-slate-500'>Tanggal dibuat</td>
                                <td className=' w-[63%] py-4'>{selectedProduct.date}</td>
                            </tr>
                        </tbody>
                    </table>
                    {isMobile && (
                        <div className='fixed flex justify-between bottom-0 py-[10px] w-[84.5%] bg-white'>
                            <DialogClose asChild>
                                <Button variant='secondary' className='text-[16px] font-bold h-[48px] w-full' >Kembali</Button>
                            </DialogClose>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ViewProfile
