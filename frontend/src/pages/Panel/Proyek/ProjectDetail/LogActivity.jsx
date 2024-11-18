import React, {useState, useEffect} from  'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import File from '../../../../assets/file.png'
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area"



const LogActivity = ({activities}) => {
    // const [activities, setaktivitas] = useState([
    //     // {
    //     //     id: 1,
    //     //     date: '21 Okt 2024, 23.00',
    //     //     user: 'Username',
    //     //     action: 'mengupload file',
    //     //     file: '[PT Indomaret Tambahan - Informasi Pekerjaan PT Indomaret]',
    //     //     avatar: 'https://via.placeholder.com/40', // Ganti dengan URL foto profil pengguna
    //     // },
    //     // {
    //     //     id: 2,
    //     //     date: '21 Okt 2024, 23.00',
    //     //     user: 'Username',
    //     //     action: 'melihat file',
    //     //     file: '[PT Indomaret F1 – Informasi Pekerjaan]',
    //     //     avatar: 'https://via.placeholder.com/40',
    //     // },
    //     // {
    //     //     id: 3,
    //     //     date: '21 Okt 2024, 23.00',
    //     //     user: 'Username',
    //     //     action: 'mengedit file',
    //     //     file: '[PT Indomaret – Data Pekerjaan Teknis F3]',
    //     //     avatar: 'https://via.placeholder.com/40',
    //     // },
    //     // {
    //     //     id: 4,
    //     //     date: '21 Okt 2024, 23.00',
    //     //     user: 'Username',
    //     //     action: 'menghapus file',
    //     //     file: '[PT Indomaret F1 – Informasi Pekerjaan]',
    //     //     avatar: 'https://via.placeholder.com/40',
    //     // },
    //     // {
    //     //     id: 5,
    //     //     date: '21 Okt 2024, 23.00',
    //     //     user: 'Username',
    //     //     action: 'mengupload file',
    //     //     file: '[PT Indomaret F1 – Informasi Pekerjaan]',
    //     //     avatar: 'https://via.placeholder.com/40',
    //     // },
    //     // {
    //     //     id: 6,
    //     //     date: '21 Okt 2024, 23.00',
    //     //     user: 'Username',
    //     //     action: 'membuat folder',
    //     //     file: '[PT Indomaret F1]',
    //     //     avatar: 'https://via.placeholder.com/40',
    //     // },
    // ]);
    
    

    return (
        <ScrollArea className='h-[250px]'>
            {activities.length === 0 ? (
                <div className='flex flex-col justify-center items-center py-[24px] text-center'>
                    <img src={File} alt="file" className='w-[40px] h-[40px]' />
                    <h3 className='text-[16px] font-semibold'>Log aktivitas tidak tersedia</h3>
                    <p className='text-[14px] text-[#717179]'>Upload file yang diperlukan menampilkan file</p>
                </div>
            ) : (
                <div className="flex flex-col mt-[12px] py-[24px] px-[10px]">
                    {activities.map((activity, index) => (
                        <ol key={activity.id} className="relative flex">
                            <li className={`pl-[15px] ${index !== activities.length - 1 ? 'mb-5' : ''}`}>
                                {index !== activities.length - 1 && (
                                    <div className="absolute left-0 top-5 h-full border-l border-gray-300 dark:border-gray-700" ></div>
                                )}
                                <div className="absolute w-3 h-3 bg-[#31B17B] rounded-full mt-[15px] -left-[4px] "></div>
                                <div className="flex gap-[12px]">
                                    <Avatar className='w-[36px] h-[36px]'>
                                        <AvatarImage src={activity.avatar ? `${API_URL}/images/${activity.avatar}` : "https://github.com/shadcn.png"} alt={`@${activity.user}`} />
                                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <time className="block text-[12px] font-medium text-gray-500">{activity.date}</time>
                                        <p className="text-gray-900 text-[14px] font-semibold dark:text-white">
                                            <span className="text-[#0036AA]">{activity.user}</span>{' '}
                                            {activity.action}{' '}
                                            <span className="text-[#0036AA]">
                                                {activity.file}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    ))}
                </div>
            )}
        </ScrollArea>
    )
}

export default LogActivity
