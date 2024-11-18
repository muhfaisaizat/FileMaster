import React, { useState, useEffect, useContext } from 'react'
import { SearchNormal1, Calendar as CalendarIcon, TickCircle } from 'iconsax-react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, MoreVertical } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BsFolderFill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SelectedIdContext } from '../Project/SelectIdProject';
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';





const Folder = ({fetchDatadetail}) => {
    const navigate = useNavigate();
    const [Data, setdata] = useState([
        // { id: 1, nama: 'PT Indomart - Gresik', kategori: 'Izin Bangun', date: '14 Oktober 2024', perusahaan: 'PT Indomaret', Aktivitas: '15 Oktober 2024', Progres: 'F1, F2, F3, F4' },
        // { id: 2, nama: 'PT Alfamart - Surabaya', kategori: 'SLF', date: '20 Oktober 2024', perusahaan: 'PT Alfamart', Aktivitas: '21 Oktober 2024', Progres: 'F2, F3' },
        // { id: 3, nama: 'PT Sumber Makmur - Jakarta', kategori: 'Persiapan Bangun', date: '18 Oktober 2024', perusahaan: 'PT Sumber Makmur', Aktivitas: '19 Oktober 2024', Progres: 'F1, F3, F4' },
        // { id: 4, nama: 'PT Tokopedia - Depok', kategori: 'Izin Usaha', date: '10 Oktober 2024', perusahaan: 'PT Tokopedia', Aktivitas: '11 Oktober 2024', Progres: 'F1, F4' },
        // { id: 5, nama: 'PT Bukalapak - Bogor', kategori: 'Izin Bangun', date: '22 Oktober 2024', perusahaan: 'PT Bukalapak', Aktivitas: '23 Oktober 2024', Progres: 'F1, F2, F3, F4' },
        // { id: 6, nama: 'PT Shopee - Bandung', kategori: 'SLF', date: '25 Oktober 2024', perusahaan: 'PT Shopee', Aktivitas: '26 Oktober 2024', Progres: 'F1, F2, F3, F4' },
        // { id: 7, nama: 'PT GoTo - Semarang', kategori: 'Persiapan Bangun', date: '15 Oktober 2024', perusahaan: 'PT GoTo', Aktivitas: '16 Oktober 2024', Progres: 'F2, F3' },
        // { id: 8, nama: 'PT Blibli - Yogyakarta', kategori: 'Izin Usaha', date: '5 Oktober 2024', perusahaan: 'PT Blibli', Aktivitas: '6 Oktober 2024', Progres: 'F1, F3, F4' },
        // { id: 9, nama: 'PT Unilever - Surabaya', kategori: 'Izin Bangun', date: '30 Oktober 2024', perusahaan: 'PT Unilever', Aktivitas: '31 Oktober 2024', Progres: 'F1, F2, F3, F4' },
        // { id: 10, nama: 'PT Nestle - Malang', kategori: 'SLF', date: '1 November 2024', perusahaan: 'PT Nestle', Aktivitas: '2 November 2024', Progres: 'F1, F2' },
        // { id: 11, nama: 'PT Danone - Bandung', kategori: 'Persiapan Bangun', date: '12 Oktober 2024', perusahaan: 'PT Danone', Aktivitas: '13 Oktober 2024', Progres: 'F1, F4' },
        // { id: 12, nama: 'PT Astra - Jakarta', kategori: 'Izin Usaha', date: '28 Oktober 2024', perusahaan: 'PT Astra', Aktivitas: '29 Oktober 2024', Progres: 'F2, F3, F4' },
        // { id: 13, nama: 'PT BCA - Tangerang', kategori: 'Izin Bangun', date: '8 Oktober 2024', perusahaan: 'PT BCA', Aktivitas: '9 Oktober 2024', Progres: 'F3' },
        // { id: 14, nama: 'PT Mandiri - Bali', kategori: 'SLF', date: '3 November 2024', perusahaan: 'PT Mandiri', Aktivitas: '4 November 2024', Progres: 'F1, F2, F3' },
        // { id: 15, nama: 'PT BNI - Medan', kategori: 'Persiapan Bangun', date: '6 Oktober 2024', perusahaan: 'PT BNI', Aktivitas: '7 Oktober 2024', Progres: null },
    ]);

    const formatData = (apiData) => {
        return {
            id: apiData["ID"],  // Menambahkan "m" pada ID
            nama: apiData["Nama Project"], // Mengakses "Nama Project" yang memiliki spasi
            kategori: apiData["Kategori Project"], // Mengakses "Kategori Project"
            deskripsi: apiData.Deskripsi,  // Mengakses Deskripsi
            namaPengaju: apiData["Nama Pengaju"], // Mengakses "Nama Pengaju"
            jabatan: apiData.Jabatan, // Mengakses Jabatan
            perusahaan: apiData["Instansi/Organisasi"], // Mengakses "Instansi/Organisasi"
            noTelp: apiData["No Telp"], // Mengakses "No Telp"
            alamatLengkap: apiData["Alamat Lengkap"], // Mengakses "Alamat Lengkap"
            provinsi: apiData.Provinsi, // Mengakses Provinsi
            kabupatenKota: apiData["Kabupaten/Kota"], // Mengakses "Kabupaten/Kota"
            kecamatan: apiData.Kecamatan, // Mengakses Kecamatan
            kelurahanDesa: apiData["Kelurahan/Desa"], // Mengakses "Kelurahan/Desa"
            archive: apiData.Archive,  // Mengakses Archive
            date: new Date(apiData.Date).toLocaleDateString('id-ID', {  // Format tanggal "Date"
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }),
            Aktivitas: apiData.Aktivitas, // Mengakses Aktivitas
            Progres: apiData.Progres // Mengakses Progres
        };
    };

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map(formatData);
               
                setdata(formattedData);
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
    const checkProgresComplete = (progres) => {
        const requiredStages = ['F1', 'F2', 'F3', 'F4'];
        const progresArray = progres.split(', ').map(stage => stage.trim());
        return requiredStages.every(stage => progresArray.includes(stage));
    };
    const { selectedId, updateSelectedId } = useContext(SelectedIdContext);

    const handleClick = (id) => {
        updateSelectedId(id);
    };

    const handleArchive = async (id) =>{
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `${API_URL}/api/projects/${id}/archive?archive=Arsip`, 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
      
            navigate('/panel/proyek');
        } catch (error) {
            console.error("Gagal archive:", error);
        }
    }

    return (
        <ScrollArea className='h-full'>
            <div className='py-[16px] w-full'>
                <div className='px-[8px] grid gap-[8px] w-full'>
                    {Data.map((item) => (
                        <div key={item.id} onClick={() => handleClick(item.id)} className='w-full py-[16px] px-[8px] flex gap-[16px] items-center hover:bg-slate-50 hover:text-[#0036AA] cursor-pointer'>
                            <div onClick={() =>{ navigate('/panel/proyek/detail'); window.location.reload();  localStorage.setItem("id_project", item.id);   fetchDatadetail();}} className="relative inline-flex items-center justify-center">
                                <BsFolderFill
                                    color={item.Progres === null || !checkProgresComplete(item.Progres) ? '#F0C74B' : '#257DF9'}
                                    size={32}
                                />
                                {(item.Progres !== null && checkProgresComplete(item.Progres)) &&  (
                                    <TickCircle
                                        color="#FFFFFF"
                                        variant="Bold"
                                        size={12}
                                        className="absolute mt-[3px] flex items-center justify-center"
                                    />
                                )}
                            </div>
                            <div onClick={() =>{ navigate('/panel/proyek/detail'); window.location.reload();  localStorage.setItem("id_project", item.id); fetchDatadetail();}} className='grid w-full'>
                                <h1 className={`text-[14px] font-bold ${selectedId === item.id ? 'text-[#0036AA]' : ''}`}>{item.nama.length > 20 ? `${item.nama.slice(0, 20)}...` : item.nama}</h1>
                                <p className='text-[12px] text-[#717179] font-medium'>{item.kategori}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreVertical className="h-[20px] w-[20px] text-black" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[100px]">
                                    <DropdownMenuItem onClick={() =>{ navigate('/panel/proyek/detail'); window.location.reload();  localStorage.setItem("id_project", item.id); fetchDatadetail(); }} className="p-3 gap-3 text-[14px] font-medium">
                                        View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleArchive(item.id)} className="p-3 gap-3 text-[14px] font-medium ">
                                        Archive
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}

export default Folder
