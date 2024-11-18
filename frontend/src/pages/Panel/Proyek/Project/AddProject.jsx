import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Add, TickCircle } from 'iconsax-react';
import { Textarea } from '@/components/ui/textarea';
import { X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from '@/components/ui/scroll-area';
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"



const AddProject = ({ className, fetchData }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isFolderVisible, setIsFolderVisible] = useState(false);
    const { toast } = useToast()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [regencies, setRegencies] = useState([]);
    const [selectedRegency, setSelectedRegency] = useState('');
    const [subDistricts, setSubDistricts] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState('');
    const [subvillages, setsubvillages] = useState([]);
    const [selectedvillage, setSelectedvillage] = useState('');

    // Fetch provinces when the component mounts
    useEffect(() => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            .then(response => response.json())
            .then(provinces => setProvinces(provinces));
    }, []);

    // Fetch regencies when a province is selected
    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
                .then(response => response.json())
                .then(regencies => setRegencies(regencies));
        }
    }, [selectedProvince]);

    // Fetch sub-districts when a regency is selected
    useEffect(() => {
        if (selectedRegency) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
                .then(response => response.json())
                .then(districts => setSubDistricts(districts));

        }
    }, [selectedRegency]);

    // Fetch sub-districts when a regency is selected
    useEffect(() => {
        if (selectedDistricts) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistricts}.json`)
                .then(response => response.json())
                .then(data => setsubvillages(data));
        }
    }, [selectedDistricts]);

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        setRegencies([]); // Reset regencies when a new province is selected
        setSelectedRegency('');
        setSubDistricts([]); // Reset sub-districts
        setSelectedDistricts('');
        setsubvillages([]);
        setSelectedvillage('');
        //   alert(selectedProvince)
    };

    const handleRegencyChange = (value) => {
        setSelectedRegency(value);
        setSubDistricts([]); // Reset sub-districts when a new regency is selected
        setSelectedDistricts('');
        setSelectedvillage('');
    };

    const handleDistrictsChange = (value) => {
        setSelectedDistricts(value);
        setsubvillages([]); // Reset sub-districts when a new regency is selected
        setSelectedvillage('');
    };

    const handleVilagesChange = (value) => {
        setSelectedvillage(value);

    };


    const [currentStep, setCurrentStep] = useState(0);
    const [ContentStep, setContentStep] = useState(0);
    const [progress, setProgress] = useState(50);


    const [formData, setFormData] = useState({
        nama_projec: '',
        kategori: '',
        deskripsi: '',
        nama_pengaju_project: '',
        jabatan: '',
        instansi_organisasi: '',
        no_telp: '',
        alamat_lengkap: '',
        provinsi: selectedProvince,
        kabupaten_kota: selectedRegency,
        kecamatan: selectedDistricts,
        kelurahan_desa: selectedvillage,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSelectChange = (value) => {
        setFormData({ ...formData, kategori: value });
    };

    const handleSubmit = async () => {
        const { nama_projec, kategori, deskripsi, nama_pengaju_project, jabatan, instansi_organisasi, no_telp, alamat_lengkap, provinsi, kabupaten_kota, kecamatan, kelurahan_desa, } = formData;
        const token = localStorage.getItem("token");

          // Validasi
          if (!nama_projec) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama project pengguna harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!kategori) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kategori harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!deskripsi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Deskripsi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!nama_pengaju_project) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama pengaju project harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!jabatan) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Jabatan harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!instansi_organisasi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Instansi/Organisasi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!no_telp) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nomor telepon harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!alamat_lengkap) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Alamat lengkap harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!selectedProvince) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Provinsi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!selectedRegency) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kabupaten/Kota harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!selectedDistricts) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kecamatan harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        if (!selectedvillage) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kelurahan/Desa harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        
        const form = new FormData();
        form.append('nama_project', formData.nama_projec);
        form.append('kategori', formData.kategori);
        form.append('deskripsi', formData.deskripsi);
        form.append('nama_pengaju_project', formData.nama_pengaju_project);
        form.append('jabatan', formData.jabatan);
        form.append('instansi_organisasi', formData.instansi_organisasi);
        form.append('no_telp', formData.no_telp);
        form.append('alamat_lengkap', formData.alamat_lengkap);
        form.append('provinsi', selectedProvince);
        form.append('kabupaten_kota', selectedRegency);
        form.append('kecamatan', selectedDistricts);
        form.append('kelurahan_desa', selectedvillage);

        const id = localStorage.getItem("id");


        try {
            const response = await axios.post(`${API_URL}/api/projects`, form, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const id_project = response.data.id_project;
            console.log(id_project)
            const logaktivitas = await axios.post(`${API_URL}/api/log-aktivitas`, {
                id_project: id_project,
                id_user: id,
                aktivitas: "membuat folder",
                keterangan: null
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setContentStep(1);
            fetchData();
        } catch (error) {
            console.error('Error adding user:', error);
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request data:', error.request);
            } else {
                // Other errors (e.g., configuration issues)
                console.error('Error message:', error.message);
            }
            toast({
                variant: "destructive",
                title: 'Error Adding User',
                description: 'An internal server error occurred. Please try again later.',
                status: 'error',
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => { setCurrentStep(0); setContentStep(0); }} className={`bg-[#0036AA] gap-2 h-[36px] font-medium hover:bg-[#315197] ${className}`}><Add size={20} /> <p className='text-[14px] font-medium'>Tambahkan Proyek</p></Button>
            </DialogTrigger>
            {ContentStep === 0 && (
                <DialogContent className={`sm:max-w-[820px] ${isMobile && ('h-full')}`}>
                    {!isMobile && (
                        <>
                            <div className='flex justify-end'>
                                <DialogClose asChild>
                                    <Button type="button" variant="ghost" className='p-0 h-[20px]'>
                                        <X className='h-[16px] w-[16px]' />
                                    </Button>
                                </DialogClose>
                            </div>
                            <DialogHeader className='py-[16px]'>
                                <DialogTitle className='text-[18px] font-semibold'>Tambah Proyek Baru</DialogTitle>
                            </DialogHeader>
                        </>
                    )}

                    <div className={`grid gsp-[16px] ${isMobile && ('pb-[14px]')}`}>
                        {!isMobile && (
                            <>
                                <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                    <div className='className="lg:w-1/2 md:w-1/2 px-4 w-full '>
                                        <div className='w-full border-t-4 border-[#0036AA] text-[#0036AA] text-[14px] font-semibold'>Detail Informasi Proyek</div>
                                    </div>
                                    <div className='className="lg:w-1/2 md:w-1/2 px-4 w-full '>
                                        <div className={`w-full border-t-4 text-[#0036AA] text-[14px] font-semibold ${currentStep === 1 ? 'border-[#0036AA]' : 'border-slate-300'}`}>Lokasi Pelaksanaan Proyek</div>
                                    </div>
                                </div>

                                <div className='w-full border' />
                            </>
                        )}
                        {isMobile && (
                            <>
                                <div className='py-[16px]'>
                                    <p className='text-[12px] font-medium text-[#717179]'>Step {currentStep === 1 ? '2' : '1'}</p>
                                    <div className='flex justify-between'>
                                        <h1 className='text-[14px] font-semibold'>Detail Informasi Proyek</h1>
                                        <p className='text-[12px] font-medium text-[#717179]'>{currentStep === 1 ? '2' : '1'}/2</p>
                                    </div>
                                    <div className="w-full h-[2px] mt-[10px] bg-gray-300 rounded">
                                        <div
                                            className="h-full bg-blue-500 rounded"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>


                                </div>

                            </>
                        )}
                        {currentStep === 0 && (
                            <>
                                <div className='grid gap-[16px] py-[16px]'>
                                    <h3 className='text-[16px] font-semibold'>Detail Proyek</h3>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Nama Proyek<span className='text-rose-500'>*</span></h4>
                                                <p className='text-[12px] font-medium text-[#717179]'>Digunakan sebagai nama folder</p>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Input
                                                id="nama_projec"
                                                placeholder="Nama Project"
                                                className='h-[36px] text-[14px]'
                                                value={formData.nama_projec}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Kategori Project<span className='text-rose-500'>*</span></h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Select  onValueChange={handleSelectChange}>
                                                <SelectTrigger className="w-full h-[36px] text-[14px]">
                                                    <SelectValue placeholder="Pilih kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Kategori</SelectLabel>
                                                        <SelectItem value="Izin Usaha">Izin Usaha</SelectItem>
                                                        <SelectItem value="Persiapan Bangun">Persiapan Bangun</SelectItem>
                                                        <SelectItem value="Izin Bangun">Izin Bangun</SelectItem>
                                                        <SelectItem value="SLF">SLF</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Deskripsi Project</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Textarea
                                                id="deskripsi"
                                                name="alamat"
                                                className="w-full text-[14px]"
                                                value={formData.deskripsi}
                                                onChange={handleInputChange}
                                            />
                                            <p className='text-[14px] text-slate-500 font-medium flex justify-end'>0/200 char</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full border' />
                                <div className='grid gap-[16px] py-[16px]'>
                                    <h3 className='text-[16px] font-semibold'>Informasi Tambahan</h3>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Nama Pengaju Project<span className='text-rose-500'>*</span></h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Input
                                                id="nama_pengaju_project"
                                                placeholder="Nama Pengaju Project"
                                                className='h-[36px] text-[14px]'
                                                value={formData.nama_pengaju_project}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Jabatan</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Input
                                                id="jabatan"
                                                placeholder="Jabatan"
                                                className='h-[36px] text-[14px]'
                                                value={formData.jabatan}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Instansi / Organisasi</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Input
                                                id="instansi_organisasi"
                                                placeholder="Masukkan nama organisasi"
                                                className='h-[36px] text-[14px]'
                                                value={formData.instansi_organisasi}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>No. Telp / WA<span className='text-rose-500'>*</span></h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Input
                                                id="no_telp"
                                                placeholder="Masukkan no. telp (WA)"
                                                className='h-[36px] text-[14px]'
                                                value={formData.no_telp}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 1 && (
                            <>
                                <div className='grid gap-[16px] py-[16px]'>
                                    <h3 className='text-[16px] font-semibold'>Lokasi Pelaksanaan Proyek</h3>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Alamat Lengkap<span className='text-rose-500'>*</span></h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Textarea
                                                id="alamat_lengkap"
                                                placeholder="Tulis alamat lengkap"
                                                name="alamat"
                                                className="w-full text-[14px]"
                                                value={formData.alamat_lengkap}
                                                onChange={handleInputChange}
                                            />
                                            <p className='text-[14px] text-slate-500 font-medium flex justify-end'>0/200 char</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Provinsi</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Select onValueChange={handleProvinceChange} value={selectedProvince}>
                                                <SelectTrigger className="w-full h-[36px] text-[14px]">
                                                    <SelectValue placeholder="Pilih Provinsi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Provinsi</SelectLabel>
                                                        {provinces.map((province) => (
                                                            <SelectItem key={province.id} value={province.id}>
                                                                {province.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Kabupaten / Kota</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Select onValueChange={handleRegencyChange} disabled={!selectedProvince} value={selectedRegency}>
                                                <SelectTrigger className="w-full h-[36px] text-[14px]">
                                                    <SelectValue placeholder="Pilih Salah Satu" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Kabupaten / Kota</SelectLabel>
                                                        {regencies.map((regency) => (
                                                            <SelectItem key={regency.id} value={regency.id}>
                                                                {regency.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Kecamatan</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Select onValueChange={handleDistrictsChange} disabled={!selectedRegency} value={selectedDistricts}>
                                                <SelectTrigger className="w-full h-[36px] text-[14px]">
                                                    <SelectValue placeholder="Pilih Salah Satu" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Kecamatan</SelectLabel>
                                                        {subDistricts.map((subDistrict) => (
                                                            <SelectItem key={subDistrict.id} value={subDistrict.id}>
                                                                {subDistrict.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                                <h4>Kelurahan/Desa</h4>
                                            </div>
                                        </div>
                                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                                            <Select onValueChange={handleVilagesChange} disabled={!selectedDistricts} value={selectedvillage}>
                                                <SelectTrigger className="w-full h-[36px] text-[14px]">
                                                    <SelectValue placeholder="Pilih Salah Satu" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Kelurahan/Desa</SelectLabel>
                                                        {subvillages.map((subDistrict) => (
                                                            <SelectItem key={subDistrict.id} value={subDistrict.id}>
                                                                {subDistrict.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {isMobile && (
                            <>
                                {currentStep === 0 && (
                                    <div className='fixed flex justify-between bottom-0 py-[10px] w-[89%] bg-white'>
                                        <DialogClose asChild>
                                            <Button onClick={() => setProgress(50)} variant='secondary' className='text-[16px] font-bold h-[48px] w-[168.5px]' >Batal</Button>
                                        </DialogClose>
                                        <Button onClick={() => { setCurrentStep(1); setProgress(100) }} className='text-[16px] font-bold h-[48px] w-[168.5px]' style={{ background: 'linear-gradient(90deg, #0241C1, #175DEC)' }} >Lanjutkan</Button>
                                    </div>
                                )}
                                {currentStep === 1 && (
                                    <div className='fixed flex justify-between bottom-0 py-[10px] w-[89%] bg-white'>
                                        <DialogClose asChild>
                                            <Button onClick={() => setProgress(50)} variant='secondary' className='text-[16px] font-bold h-[48px] w-[168.5px]' >Batal</Button>
                                        </DialogClose>
                                        <Button onClick={() => { setContentStep(1); setProgress(50); }} className='text-[16px] font-bold h-[48px] w-[168.5px]' style={{ background: 'linear-gradient(90deg, #0241C1, #175DEC)' }} >Lanjutkan</Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {!isMobile && (
                        <>
                            {currentStep === 0 && (
                                <DialogFooter>
                                    <Button onClick={() => setCurrentStep(1)} className='bg-[#0036AA] h-[40px] text-[14px] hover:bg-[#2b4a8e]'>Simpan</Button>
                                </DialogFooter>
                            )}
                            {currentStep === 1 && (
                                <DialogFooter>
                                    <Button onClick={() => setContentStep(1)} variant="secondary" type="submit" className=' h-[40px] text-[14px] '>Lewati</Button>
                                    <Button onClick={() => handleSubmit()} type="submit" className='bg-[#0036AA] h-[40px] text-[14px] hover:bg-[#2b4a8e]'>Simpan</Button>
                                </DialogFooter>
                            )}
                        </>
                    )}



                </DialogContent>
            )}
            {ContentStep === 1 && (
                <DialogContent>
                    <div className='py-[16px]  grid gap-[16px] place-items-center'>
                        <TickCircle size="40" variant="Bold" color='#0036AA' />
                        <h1 className='text-[16px] font-semibold'>Sukses membuat proyek baru</h1>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" className='text-[14px] h-[36px] bg-[#0036AA] hover:bg-[#3840b6]'>
                                    Selesai
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default AddProject
