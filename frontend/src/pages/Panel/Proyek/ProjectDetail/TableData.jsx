import React, { useState, useEffect } from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, InfoCircle, TickCircle } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import FileUtama from './FileUtama';
import FilePendukung from './FilePendukung';

import InformasiProyek from './InformasiProyek';
import LogActivity from './LogActivity';

const TableData = ({uploadedFile, uploadedFileF2, uploadedFileF3, uploadedFileF4, lengF, Data}) => {
    const [activeTab, setActiveTab] = useState("Direktori");
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
        <div>
            <div className='py-[16px] grid gap-[10px] px-[24px]'>
                <Link to="/panel/proyek" className='text-[14px] font-medium flex gap-[8px] items-center'>
                    <ArrowLeft size="16" />
                    <p>Kembali</p>
                </Link>
                <div className='flex justify-between items-center py-[16px]'>
                    <div>
                        <h1 className='text-[24px] font-medium'>{Data.nama || 'Nama tidak tersedia'}</h1>
                        <p className='text-[14px] font-medium text-[#717179]'>{Data.kategori || 'kategori tidak tersedia'}</p>
                    </div>
                    <div className=' grid items-center '>
                      <InformasiProyek/>
                    </div>
                </div>
                <div className='border p-[16px] rounded-[8px] grid gap-[16px]'>
                    <div className='flex justify-between'>
                        <div className=' flex items-center gap-[8px]'>
                            <p className='text-[12px] font-medium'>Progress pekerjaan</p>
                            <InfoCircle size="14" />
                        </div>
                        <p className='text-[12px] font-medium'>{lengF} dari 4</p>
                    </div>
                    <div className="container mx-auto">
                        <div className="flex flex-wrap -m-4">
                            <div className="w-1/4 md:w-1/2 lg:w-1/4  p-4">
                                <div className="pb-1 text-[12px]  font-semibold grid gap-2">
                                    <div  className={`h-[5px] w-full rounded-full ${uploadedFile? "bg-[#0036AA]" : "bg-[#CBD5E1]"}`} />
                                    <div className={`flex gap-2 items-center ${uploadedFile? "text-[#0036AA]" : "text-[#717179]"}`}>
                                        F1 {isMobile ? '' : '-  Form Pendaftaran'}
                                        {uploadedFile && (
                                        <TickCircle variant="Bold" size="16" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/4 md:w-1/2 lg:w-1/4 p-4">
                                <div className="pb-1 text-[12px]  font-semibold grid gap-2">
                                <div  className={`h-[5px] w-full rounded-full ${uploadedFileF2? "bg-[#0036AA]" : "bg-[#CBD5E1]"}`} />
                                <div className={`flex gap-2 items-center ${uploadedFileF2? "text-[#0036AA]" : "text-[#717179]"}`}>
                                        F2 {isMobile ? '':'- Informasi Pekerjaan'}
                                        {uploadedFileF2 && (
                                        <TickCircle variant="Bold" size="16" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/4 md:w-1/2 lg:w-1/4 p-4">
                                <div className="pb-1 text-[12px]  font-semibold grid gap-2">
                                <div  className={`h-[5px] w-full rounded-full ${uploadedFileF3? "bg-[#0036AA]" : "bg-[#CBD5E1]"}`} />
                                <div className={`flex gap-2 items-center ${uploadedFileF3? "text-[#0036AA]" : "text-[#717179]"}`}>
                                        F3 {isMobile ? '':'- Data Pengujian'}
                                        {uploadedFileF3 && (
                                        <TickCircle variant="Bold" size="16" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/4 md:w-1/2 lg:w-1/4 p-4">
                                <div className="pb-1 text-[12px]  font-semibold grid gap-2">
                                <div  className={`h-[5px] w-full rounded-full ${uploadedFileF4? "bg-[#0036AA]" : "bg-[#CBD5E1]"}`} />
                                <div className={`flex gap-2 items-center ${uploadedFileF4? "text-[#0036AA]" : "text-[#717179]"}`}>
                                        F4 {isMobile ? '':'- Data Pekerjaan Teknis'}
                                        {uploadedFileF4 && (
                                        <TickCircle variant="Bold" size="16" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-4 px-[24px] pb-[24px]'>
                <div className="my-4">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center border-b border-gray-300" role="tablist">
                        <li role="presentation">
                            <button
                                className={`inline-block p-4 border-b-2 text-[14px] font-semibold text-[#717179] rounded-t-lg ${activeTab === "Direktori" ? "border-black text-black" : "hover:text-gray-700"
                                    }`}
                                onClick={() => setActiveTab("Direktori")}
                                role="tab"
                                aria-controls="Direktori"
                                aria-selected={activeTab === "Direktori"}
                            >
                                Direktori File
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                className={`inline-block p-4 border-b-2 text-[14px] font-semibold text-[#717179] rounded-t-lg ${activeTab === " Log" ? "border-black text-black" : "hover:text-gray-700"
                                    }`}
                                onClick={() => setActiveTab(" Log")}
                                role="tab"
                                aria-controls=" Log"
                                aria-selected={activeTab === " Log"}
                            >
                                Log Aktivitas
                            </button>
                        </li>
                        <li className="flex-grow">
                            <div className="border-b-2 h-full w-full"></div>
                        </li>
                    </ul>

                    <div>
                        {activeTab === "Direktori" && (
                           <FileUtama/>
                        )}
                        {activeTab === " Log" && (
                            <LogActivity/>
                   
                        )}
                    </div>
                </div>
            </div>
            <div className='p-[24px] border-t-2'>
                <FilePendukung/>
            </div>
        </div>
    )
}

export default TableData
