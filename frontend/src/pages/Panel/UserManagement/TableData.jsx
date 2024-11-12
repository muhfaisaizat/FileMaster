import React, { useState } from 'react'
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
import { ArrowUpDown, ChevronDown, MoreVertical } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';


const TableData = () => {
    const DataRole = [
        { id: "1", name: 'Admin' },
        { id: "2", name: 'Manager' },
        { id: "3", name: 'Kasir' },
    ];
    const [data, setdata] = useState([
        { id: 1, nama: 'jackson.graham@example.com', role: 'Admin', status: 'Aktif', date: '23 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 2, nama: 'sophia.lee@example.com', role: 'Manager', status: 'Tidak Aktif', date: '12 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 3, nama: 'liam.smith@example.com', role: 'Kasir', status: 'Aktif', date: '15 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 4, nama: 'emma.johnson@example.com', role: 'Admin', status: 'Aktif', date: '20 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 5, nama: 'oliver.williams@example.com', role: 'Manager', status: 'Aktif', date: '5 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 6, nama: 'ava.brown@example.com', role: 'Kasir', status: 'Tidak Aktif', date: '3 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 7, nama: 'noah.jones@example.com', role: 'Admin', status: 'Tidak Aktif', date: '9 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 8, nama: 'mia.miller@example.com', role: 'Manager', status: 'Aktif', date: '17 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 9, nama: 'lucas.davis@example.com', role: 'Kasir', status: 'Aktif', date: '22 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 10, nama: 'amelia.garcia@example.com', role: 'Admin', status: 'Tidak Aktif', date: '13 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 11, nama: 'benjamin.martinez@example.com', role: 'Manager', status: 'Aktif', date: '6 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 12, nama: 'charlotte.rodriguez@example.com', role: 'Kasir', status: 'Aktif', date: '19 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 13, nama: 'elijah.lopez@example.com', role: 'Admin', status: 'Tidak Aktif', date: '21 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 14, nama: 'harper.harris@example.com', role: 'Manager', status: 'Aktif', date: '8 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 15, nama: 'william.clark@example.com', role: 'Kasir', status: 'Aktif', date: '14 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 16, nama: 'evelyn.robinson@example.com', role: 'Admin', status: 'Tidak Aktif', date: '16 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 17, nama: 'james.thomas@example.com', role: 'Manager', status: 'Aktif', date: '7 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 18, nama: 'ella.moore@example.com', role: 'Kasir', status: 'Aktif', date: '24 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 19, nama: 'henry.jackson@example.com', role: 'Admin', status: 'Tidak Aktif', date: '18 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 20, nama: 'scarlett.white@example.com', role: 'Manager', status: 'Aktif', date: '4 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 21, nama: 'leo.walker@example.com', role: 'Kasir', status: 'Aktif', date: '2 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 22, nama: 'grace.young@example.com', role: 'Admin', status: 'Aktif', date: '26 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 23, nama: 'matthew.allen@example.com', role: 'Manager', status: 'Tidak Aktif', date: '28 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 24, nama: 'chloe.king@example.com', role: 'Kasir', status: 'Aktif', date: '27 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 25, nama: 'jack.hill@example.com', role: 'Admin', status: 'Aktif', date: '25 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 26, nama: 'lucy.scott@example.com', role: 'Manager', status: 'Aktif', date: '29 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 27, nama: 'daniel.adams@example.com', role: 'Kasir', status: 'Tidak Aktif', date: '11 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 28, nama: 'sofia.mitchell@example.com', role: 'Admin', status: 'Aktif', date: '10 Oktober 2024', foto:'https://github.com/shadcn.png' },
        { id: 29, nama: 'ryan.carter@example.com', role: 'Manager', status: 'Tidak Aktif', date: '1 Oktober 2024', foto:'https://via.placeholder.com/40' },
        { id: 30, nama: 'hannah.taylor@example.com', role: 'Kasir', status: 'Aktif', date: '30 Oktober 2024', foto:'https://github.com/shadcn.png' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductEdit, setSelectedProductEdit] = useState(null);

    const handleRoleToggle = (roleName) => {
        setSelectedRoles((prev) =>
            prev.includes(roleName)
                ? prev.filter((role) => role !== roleName)
                : [...prev, roleName]
        );
    };


    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRoles.length === 0 || selectedRoles.includes(item.role))
    );

    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, data.length);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const handleCheckAll = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);

        const newCheckedItems = {};
        data.forEach(item => {
            newCheckedItems[item.id] = newCheckedState;
        });
        setCheckedItems(newCheckedItems);
    };

    const handleItemCheck = (id) => {
        setCheckedItems((prevState) => {
            const newState = { ...prevState, [id]: !prevState[id] };
            const allChecked = Object.values(newState).every(Boolean);
            setIsAllChecked(allChecked);
            return newState;
        });
    };

    const toggleStatus = (id) => {
        setdata((prevData) =>
            prevData.map((item) =>
                item.id === id
                    ? { ...item, status: item.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif' }
                    : item
            )
        );
    };

    const handleDelete = (id) => {
       
        const updatedData = data.filter(item => item.id !== id);
        setdata(updatedData); 
      };

      const handleViewProfile = (product) => {
        setSelectedProduct(product);  
        setIsOpen(true); 
    };
      const handleEditProfile = (product) => {
        setSelectedProductEdit(product);  
        setIsOpenEdit(true); 
    };


    return (
        <div>
            <div className=' flex gap-[12px] py-[12px]'>
                <div className="relative w-[340px] h-[32px]">
                    <SearchNormal1 className="absolute left-[16px] top-1/2 transform -translate-y-1/2 " size={16} />
                    <Input
                        placeholder="Cari nama pengguna"
                        className="w-full h-full pl-[40px] text-[14px] bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className=" h-[32px] text-[14px] border-slate-300">
                            <ChevronDown size={16} className="mr-2" />Semua role
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[120px]">
                        {DataRole.map((role) => (
                            <DropdownMenuItem key={role.id} className="h-[36px] p-[12px]" onClick={() => handleRoleToggle(role.name)} >
                                <Checkbox
                                    className="capitalize"
                                    checked={selectedRoles.includes(role.name)}
                                    onCheckedChange={() => handleRoleToggle(role.name)}
                                />
                                <span className="ml-[8px] text-[14px]">{role.name}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]" onClick={() => setSelectedRoles([])}>
                            Hapus Filter
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ScrollArea className='rounded-[16px]'>
                <div className=" mx-auto">
                    <div className="flex flex-col">
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y rounded-[16px] divide-gray-200 text-[14px] table-fixed dark:divide-gray-700">
                                        <thead className="bg-white rounded-[16px]">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            checked={isAllChecked}
                                                            onCheckedChange={handleCheckAll}
                                                        />
                                                        <label htmlFor="checkbox-all" className="sr-only">
                                                            checkbox
                                                        </label>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3 px-6  font-medium tracking-wider text-left text-[#71717A]  dark:text-gray-400">
                                                    Nama
                                                </th>
                                                <th scope="col" className="py-3 px-6  font-medium tracking-wider text-left text-[#71717A]  dark:text-gray-400">
                                                    Role
                                                </th>
                                                <th scope="col" className="py-3 px-6  font-medium tracking-wider text-center text-[#71717A]  dark:text-gray-400">
                                                    Status
                                                </th>
                                                <th scope="col" className="py-3 px-6  font-medium tracking-wider text-right text-[#71717A]  dark:text-gray-400">
                                                    Taggal dibuat
                                                </th>
                                                <th scope="col" className="p-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {paginatedData.map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="p-4 w-4">
                                                        <div className="flex items-center">
                                                            <Checkbox
                                                                checked={!!checkedItems[product.id]}
                                                                onCheckedChange={() => handleItemCheck(product.id)}
                                                            />
                                                            <label htmlFor={`checkbox-table-${product.id}`} className="sr-only">
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {product.nama}
                                                    </td>
                                                    <td className="py-4 px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {product.role}
                                                    </td>
                                                    <td className="py-4 px-6 flex justify-center  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <Badge className='text-[12px] font-semibold rounded-full' variant={product.status === 'Aktif' ? 'secondary' : 'destructive'} >{product.status}</Badge>
                                                    </td>
                                                    <td className="py-4 px-6 text-right  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {product.date}
                                                    </td>

                                                    <td className="py-4 px-6  font-medium text-right whitespace-nowrap">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreVertical className="h-[20px] w-[20px]" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-[150px]">
                                                                <DropdownMenuItem onClick={() => handleViewProfile(product)}  className="p-3 gap-3 text-[14px] font-medium ">
                                                                 View Profile
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleEditProfile(product)} className="p-3 gap-3 text-[14px] font-medium ">
                                                                 Edit Profile
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem  onClick={() => toggleStatus(product.id)} className="p-3 gap-3 text-[14px] font-medium ">
                                                                {product.status === 'Aktif' ? 'Deactive' : 'Inactive'}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem  onClick={() => handleDelete(product.id)} className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500">
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="flex items-center justify-end space-x-2 py-4">
                                        <div className="flex-1 text-[14px] text-slate-500">
                                            {startItem}-{endItem} of{" "}
                                            {data.length} row(s) selected.
                                        </div>
                                        <div className="space-x-2">
                                            <Button onClick={handlePrevPage} variant='ghost' disabled={currentPage === 1} className='bg-white text-[14px]'>Previous</Button>
                                            {pageNumbers.map((number) => (
                                                <Button
                                                    key={number}
                                                    onClick={() => handlePageChange(number)}
                                                    variant={currentPage === number ? "ghost" : "secondary"}
                                                    className={currentPage === number ? "text-[14px]" : "bg-white text-[14px]"}
                                                >
                                                    {number}
                                                </Button>
                                            ))}
                                            <Button onClick={handleNextPage} variant='ghost' className='bg-white text-[14px]' disabled={currentPage === totalPages}>Next</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            {selectedProduct && <ViewProfile isOpen={isOpen} setIsOpen={setIsOpen} selectedProduct={selectedProduct}/> }
            {selectedProductEdit && <EditProfile isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} selectedProductEdit={selectedProductEdit}/>}
        </div>
    )
}

export default TableData
