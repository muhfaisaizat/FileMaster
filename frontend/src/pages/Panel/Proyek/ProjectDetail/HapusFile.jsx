import React from 'react'
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
import { Export, DocumentForward, Trash, DocumentText, DocumentUpload } from 'iconsax-react';
import { X } from "lucide-react";
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';

const HapusFile = ({ UploadedFile, setUploadedFile, DataFileUtama,  setDataFileUtama, fetchDataLOG, fetchDataUtama }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id_project");
        const iduser = localStorage.getItem("id");

        try {
            // Mengirimkan permintaan DELETE ke API
            await axios.delete(`${API_URL}/api/detail-project-utama/${UploadedFile[0].id_project_utama}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await axios.post(`${API_URL}/api/log-aktivitas`, {
                id_project: id,
                id_user: iduser,
                aktivitas: "menghapus file",
                keterangan: UploadedFile[0].other_file
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });



            const updatedFiles = DataFileUtama.filter(file => file.id !== UploadedFile[0].id_project_utama);
            setDataFileUtama(updatedFiles);
            fetchDataUtama();
            fetchDataLOG();


        } catch (error) {
            console.error("Gagal menghapus pengguna:", error);


        }

        setUploadedFile(null)
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className='h-[36px] px-[12px]'
                >
                    <Trash size={16} color='#EF4444' />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[512px]">
                <div className='flex justify-end'>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost" className='p-0 h-[20px]'>
                            <X className='h-[16px] w-[16px]' />
                        </Button>
                    </DialogClose>
                </div>
                <DialogHeader>
                    <DialogTitle className='text-[18px] font-semibold'>Apakah anda yakin untuk menghapus file?</DialogTitle>
                    <DialogDescription className='text-[14px] text-[#71717A]'>
                        File yang terhapus tidak dapat dipulihkan kembali. Pastikan untuk mengecek ulang sebelum menghapus file
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mt-[16px]'>
                    <DialogClose asChild>
                        <Button variant="outline" className='text-[14px] font-medium h-[40px]'>
                            Batal
                        </Button>
                    </DialogClose>
                    <Button onClick={() => handleDelete()} className='bg-[#EF4343] text-[14px] hover:bg-[#EF4343] h-[40px]'>Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default HapusFile
