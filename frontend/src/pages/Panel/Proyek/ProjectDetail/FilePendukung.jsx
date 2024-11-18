import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Pdf from '../../../../assets/pdf.png';
import Docx from '../../../../assets/docx.png';
import File from '../../../../assets/file.png';
import { Add } from 'iconsax-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';

const FilePendukung = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null);

    const formatData = (apiData) => {
        return {
          id: apiData.id_project_pendukung, 
          id_project: apiData.id_project,
          file: apiData.other_file, 
          isi: apiData.file, 
          pekerjaan: apiData.pekerjaan,
          format: apiData.format
        };
      };

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id_project");
        try {
            const response = await axios.get(`${API_URL}/api/detail-project-pendukung/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map(formatData);
               
                setUploadedFiles(formattedData);
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    // Ambil data dari API
    useEffect(() => {
    
        fetchData();
    }, []);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file =>
            file.type === "application/pdf" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ).map((file, index) => ({
            id: uploadedFiles.length + index + 1,
            name: file.name,
            file: file,
        }));

        if (validFiles.length > 0) {
            setUploadedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert("Harap unggah file PDF atau DOCX.");
        }
    };

    const handleUploadClick = () => {
        document.getElementById("pendukung").click();
    };

    const handleView = (file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            window.open(url, '_blank');
            URL.revokeObjectURL(url);
        } else {
            alert("File tidak tersedia untuk dilihat.");
        }
    };

    const handleDownload = (fileName, renameFile) => {
        if (fileName) {
            const url = `${API_URL}/download/${fileName}?rename=${renameFile}`;

        // Membuat elemen <a> untuk mendownload file
        const link = document.createElement("a");
        link.href = url;
        link.download = renameFile || fileName;  // Nama file saat diunduh
        link.click();  // Memulai download
        } else {
            alert("File tidak tersedia untuk diunduh.");
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
    
        try {
            // Mengirimkan permintaan DELETE ke API
            await axios.delete(`${API_URL}/api/detail-project-pendukung/${selectedFileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const updatedFiles = uploadedFiles.filter(file => file.id !== selectedFileId);
            setUploadedFiles(updatedFiles);
    
            
        } catch (error) {
            console.error("Gagal menghapus pengguna:", error);
    
            
        }
        
        setDialogOpen(false);
        setSelectedFileId(null);
    };


    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-[16px] font-semibold'>File Pendukung</h1>
                <Button onClick={handleUploadClick} className='bg-[#0036AA] gap-2 h-[36px] font-medium hover:bg-[#315197]'>
                    <Add size={20} /> <p className='text-[14px] font-medium'>Tambahkan File</p>
                </Button>
                <input
                    id="pendukung"
                    type="file"
                    accept=".pdf, .docx"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>

            <div className="container mx-auto">
                {uploadedFiles.length > 0 ? (
                    <div className="flex flex-wrap -m-4 mt-[12px]">
                        {uploadedFiles.map((item) => (
                            <div key={item.id} title={item.name} className="lg:w-1/5 md:w-1/2 p-4 w-1/2">
                                <div className="grid justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-[164px]">
                                            <DropdownMenuItem
                                               onClick={() => window.open(`${API_URL}/uploads/${item.isi}`, '_blank')}
                                                className="p-3 gap-3 text-[14px] font-medium"
                                            >
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDownload(item.isi, item.file)}
                                                className="p-3 gap-3 text-[14px] font-medium"
                                            >
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedFileId(item.id);
                                                    setDialogOpen(true);
                                                }}
                                                className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500"
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="grid gap-[16px]">
                                    <div className="grid justify-center">
                                        <img
                                            src={item.file.endsWith('.pdf') ? Pdf : Docx}
                                            alt="file icon"
                                            className="w-[40px] h-[40px]"
                                        />
                                    </div>
                                    <h3 className="text-center text-[12px] font-medium">
                                        {item.file.length > 20 ? `${item.name.slice(0, 20)}...` : item.file}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center py-[24px] text-center'>
                        <img src={File} alt="file" className='w-[40px] h-[40px]' />
                        <h3 className='text-[16px] font-semibold'>File tidak tersedia</h3>
                        <p className='text-[14px] text-[#717179]'>Upload file yang diperlukan menampilkan file</p>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
                            File yang terhapus tidak dapat dipulihkan kembali. Pastikan untuk mengecek ulang sebelum menghapus file.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='mt-[16px]'>
                        <DialogClose asChild>
                            <Button variant="outline" className='text-[14px] font-medium h-[40px]'>
                                Batal
                            </Button>
                        </DialogClose>
                        <Button onClick={handleDelete} className='bg-[#EF4343] text-[14px] hover:bg-[#EF4343] h-[40px]'>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FilePendukung;
