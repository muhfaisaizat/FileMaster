import React,{useState, useEffect} from 'react'
import { Input } from '@/components/ui/input'
import { SearchNormal1 } from 'iconsax-react';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Pdf from '../../../../assets/pdf.png'
import Docx from '../../../../assets/docx.png'
import File from '../../../../assets/file.png'
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


const FileUtama = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const DataRole = [
        { id: "m5gr84i9", name: 'pdf' },
        { id: "m5gr84i7", name: 'docx' },
    ];
    const [DataFileUtama, setDataFileUtama] = useState([
        // { id: 1, file: 'Form Prndaftaran.pdf' , format:'pdf'},
        // { id: 2, file: 'F3.docx', format:'docx' },
        // { id: 3, file: 'Informasi Pekerjaan.docx', format:'docx' },
    ])

    const formatData = (apiData) => {
        return {
          id: apiData.id_project_utama, 
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
            const response = await axios.get(`${API_URL}/api/detail-project-utama/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map(formatData);
               
                setDataFileUtama(formattedData);
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
    const [selectedFileId, setSelectedFileId] = useState(null);

    const [selectedFormats, setSelectedFormats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFormatToggle = (format) => {
        setSelectedFormats((prevSelected) =>
          prevSelected.includes(format)
            ? prevSelected.filter((item) => item !== format)
            : [...prevSelected, format]
        );
      };

      const filteredData = DataFileUtama.filter((item) =>
        (selectedFormats.length === 0 || selectedFormats.includes(item.format)) &&
        item.file.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleDelete = async () => {
        const token = localStorage.getItem("token");
    
        try {
            // Mengirimkan permintaan DELETE ke API
            await axios.delete(`${API_URL}/api/detail-project-utama/${selectedFileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const updatedFiles = DataFileUtama.filter(file => file.id !== selectedFileId);
            setDataFileUtama(updatedFiles);
    
            
        } catch (error) {
            console.error("Gagal menghapus pengguna:", error);
    
            
        }
        
        setDialogOpen(false);
        setSelectedFileId(null);
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
    


    return (
        <div>
            <div className=' flex gap-[12px] py-[12px]'>
                <div className="relative w-[200px] h-[32px]">
                    <SearchNormal1 className="absolute left-[16px] top-1/2 transform -translate-y-1/2 " size={16} />
                    <Input
                        placeholder="Cari dokumen"
                        className="w-full h-full pl-[40px] text-[14px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className=" h-[32px] text-[14px] border-slate-300">
                            <ChevronDown size={16} className="mr-2" />Semua file
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[120px]">
                        {DataRole.map((role) => (
                            <DropdownMenuItem key={role.id} className="h-[36px] p-[12px]" onClick={() => handleFormatToggle(role.name)} >
                                <Checkbox
                                    className="capitalize"
                                    checked={selectedFormats.includes(role.name)}
                                    onCheckedChange={() => handleFormatToggle(role.name)}
                                />
                                <span className="ml-[8px] text-[14px]">{role.name}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]" onClick={() => setSelectedFormats([])}>
                            Hapus Filter
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <h2 className='text-[16px] font-semibold h-[36px] items-center'>File Utama</h2>

            <div className="container mx-auto">
                {filteredData.length > 0 ? (
                    <div className="flex flex-wrap -m-4">
                        {filteredData.map((item) => (
                            <div key={item.id} className="lg:w-1/5 sm:w-1/2 md:w-1/3 p-4 w-1/2" title={item.file}>
                                <div className="grid justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-[100px]">
                                        <DropdownMenuItem onClick={() => window.open(`${API_URL}/uploads/${item.isi}`, '_blank')} className="p-3 gap-3 text-[14px] font-medium ">
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                           onClick={() => handleDownload(item.isi, item.file)}
                                             className="p-3 gap-3 text-[14px] font-medium ">
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem  
                                            onClick={() => {
                                                setSelectedFileId(item.id);
                                                    setDialogOpen(true);
                                                }} 
                                                className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500">
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
                                        {item.file}
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
    )
}

export default FileUtama
