import React, { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import AddUser from './AddUser'
import TableData from './TableData'

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
    return (
        <ScrollArea className="h-[92vh] w-full">
            <div className={` h-full w-full px-[24px] ${isMobile && ('px-0')}`}>
                <div className={`flex justify-between items-center gap-[20px] py-[16px] ${isMobile && ('px-[24px]')}`}>
                    <h1 className='text-[24px] font-medium'>Manajemen Pengguna</h1>
                    <AddUser textButton='Tambah'/>
                </div>
                <TableData/>
            </div>
        </ScrollArea>
    )
}

export default UserManagement
