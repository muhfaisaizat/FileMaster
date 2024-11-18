import React, { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import AddUser from './AddUser'
import TableData from './TableData'
import { API_URL } from "../../../helpers/networt";
import axios from 'axios';

const UserManagement = () => {
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




    const [data, setdata] = useState([
        // { id: 1, nama: 'jackson.graham@example.com', role: 'Admin', status: 'Aktif', date: '23 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 2, nama: 'sophia.lee@example.com', role: 'Manager', status: 'Tidak Aktif', date: '12 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 3, nama: 'liam.smith@example.com', role: 'Kasir', status: 'Aktif', date: '15 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 4, nama: 'emma.johnson@example.com', role: 'Admin', status: 'Aktif', date: '20 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 5, nama: 'oliver.williams@example.com', role: 'Manager', status: 'Aktif', date: '5 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 6, nama: 'ava.brown@example.com', role: 'Kasir', status: 'Tidak Aktif', date: '3 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 7, nama: 'noah.jones@example.com', role: 'Admin', status: 'Tidak Aktif', date: '9 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 8, nama: 'mia.miller@example.com', role: 'Manager', status: 'Aktif', date: '17 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 9, nama: 'lucas.davis@example.com', role: 'Kasir', status: 'Aktif', date: '22 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 10, nama: 'amelia.garcia@example.com', role: 'Admin', status: 'Tidak Aktif', date: '13 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 11, nama: 'benjamin.martinez@example.com', role: 'Manager', status: 'Aktif', date: '6 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 12, nama: 'charlotte.rodriguez@example.com', role: 'Kasir', status: 'Aktif', date: '19 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 13, nama: 'elijah.lopez@example.com', role: 'Admin', status: 'Tidak Aktif', date: '21 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 14, nama: 'harper.harris@example.com', role: 'Manager', status: 'Aktif', date: '8 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 15, nama: 'william.clark@example.com', role: 'Kasir', status: 'Aktif', date: '14 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 16, nama: 'evelyn.robinson@example.com', role: 'Admin', status: 'Tidak Aktif', date: '16 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 17, nama: 'james.thomas@example.com', role: 'Manager', status: 'Aktif', date: '7 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 18, nama: 'ella.moore@example.com', role: 'Kasir', status: 'Aktif', date: '24 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 19, nama: 'henry.jackson@example.com', role: 'Admin', status: 'Tidak Aktif', date: '18 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 20, nama: 'scarlett.white@example.com', role: 'Manager', status: 'Aktif', date: '4 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 21, nama: 'leo.walker@example.com', role: 'Kasir', status: 'Aktif', date: '2 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 22, nama: 'grace.young@example.com', role: 'Admin', status: 'Aktif', date: '26 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 23, nama: 'matthew.allen@example.com', role: 'Manager', status: 'Tidak Aktif', date: '28 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 24, nama: 'chloe.king@example.com', role: 'Kasir', status: 'Aktif', date: '27 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 25, nama: 'jack.hill@example.com', role: 'Admin', status: 'Aktif', date: '25 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 26, nama: 'lucy.scott@example.com', role: 'Manager', status: 'Aktif', date: '29 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 27, nama: 'daniel.adams@example.com', role: 'Kasir', status: 'Tidak Aktif', date: '11 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 28, nama: 'sofia.mitchell@example.com', role: 'Admin', status: 'Aktif', date: '10 Oktober 2024', foto: 'https://github.com/shadcn.png' },
        // { id: 29, nama: 'ryan.carter@example.com', role: 'Manager', status: 'Tidak Aktif', date: '1 Oktober 2024', foto: 'https://via.placeholder.com/40' },
        // { id: 30, nama: 'hannah.taylor@example.com', role: 'Kasir', status: 'Aktif', date: '30 Oktober 2024', foto: 'https://github.com/shadcn.png' },
    ]);

    const formatUserData = (apiData) => {
        return {
            id: `${apiData.id}`,  // Menambahkan "m" pada ID
            nama: apiData.name,     // Nama pengguna
            role: apiData.role,     // Peran pengguna
            status: apiData.status, // Mengubah status "Active" menjadi "Aktif"
            email: apiData.email,   // Email pengguna
            // password: apiData.password,
            date: new Date(apiData.createdAt).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }), // Format tanggal menjadi format Indonesia
            foto: apiData.image
        };
    };

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map(formatUserData);
               
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
    return (
        <ScrollArea className="h-[92vh] w-full">
            <div className={` h-full w-full px-[24px] ${isMobile && ('px-0')}`}>
                <div className={`flex justify-between items-center gap-[20px] py-[16px] ${isMobile && ('px-[24px]')}`}>
                    <h1 className='text-[24px] font-medium'>Manajemen Pengguna</h1>
                    <AddUser fetchData={fetchData} textButton='Tambah'/>
                </div>
                <TableData data={data} setdata={setdata} fetchData={fetchData}/>
            </div>
        </ScrollArea>
    )
}

export default UserManagement
