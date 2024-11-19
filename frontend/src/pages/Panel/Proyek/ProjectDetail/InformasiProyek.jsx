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
import { Add, TickCircle, InfoCircle } from 'iconsax-react';
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
import { FiEdit2 } from "react-icons/fi";
import { ScrollArea } from '@/components/ui/scroll-area';
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';


const indonesiaData = {
  "Provinsi A": {
    "Kabupaten A1": ["Kecamatan A1-Desa1", "Kecamatan A1-Desa2"],
    "Kabupaten A2": ["Kecamatan A2-Desa1", "Kecamatan A2-Desa2"]
  },
  "Provinsi B": {
    "Kabupaten B1": ["Kecamatan B1-Desa1", "Kecamatan B1-Desa2"],
    "Kabupaten B2": ["Kecamatan B2-Desa1", "Kecamatan B2-Desa2"]
  }
};


const InformasiProyek = ({ Data, fetchData, fetchDataLOG }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ContentStep, setContentStep] = useState(0);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingLokasi, setIsEditingLokasi] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nama, setnama] = useState('')
  const [deskripsi, setdeskripsi] = useState('')
  const [pengaju, setpengaju] = useState('')
  const [jabatan, setjabatan] = useState('')
  const [pt, setpt] = useState('')
  const [nomor, setnomor] = useState('')
  const [alamat, setalamat] = useState('')
  // const [provinsi, setprovinsi] = useState("Provinsi A")
  // const [kab, setkab] = useState("Kabupaten A2")
  // const [kec, setkec] = useState("Kecamatan A2")
  // const [desa, setdesa] = useState("Desa1")


  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [regencies, setRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState('');
  const [subDistricts, setSubDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState('');
  const [subvillages, setsubvillages] = useState([]);
  const [selectedvillage, setSelectedvillage] = useState('');


  // Fungsi untuk reset nilai dari Data
  const resetForm = () => {
    if (Data) {
      setSelectedCategory(Data.kategori || "");
      setnama(Data.nama || "");
      setdeskripsi(Data.deskripsi || "");
      setpengaju(Data.namaPengaju || "");
      setjabatan(Data.jabatan || "");
      setpt(Data.perusahaan || "");
      setnomor(Data.noTelp || "");
      setalamat(Data.alamatLengkap || "");
      setSelectedProvince(Data.provinsi || "");
      setSelectedRegency(Data.kabupatenKota || "");
      setSelectedDistricts(Data.kecamatan || "");
      setSelectedvillage(Data.kelurahanDesa || "");
    }
  };

  // Perbarui form saat Data berubah
  useEffect(() => {
    resetForm();
  }, [Data]);


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

  // useEffect(() => {
  //   // Set initial regencies and subDistricts based on default province and regency
  //   setRegencies(Object.keys(indonesiaData[selectedProvince] || {}));
  //   setSubDistricts(indonesiaData[selectedProvince][kab] || []);
  // }, [selectedProvince, kab]);

  const edit = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id_project");
      const iduser = localStorage.getItem("id");

      // console.log(id, iduser, API_URL)

      const formDataedit = {
        nama_project: nama,
        kategori: selectedCategory,
        deskripsi: deskripsi,
        nama_pengaju_project: pengaju,
        jabatan: jabatan,
        instansi_organisasi: pt,
        no_telp: nomor,
        alamat_lengkap: alamat,
        provinsi: selectedProvince,
        kabupaten_kota: selectedRegency,
        kecamatan: selectedDistricts,
        kelurahan_desa: selectedvillage
      };      

      // Jika uploadedFile sudah ada, lakukan PUT untuk update
      await axios.put(`${API_URL}/api/projects/${id}`, formDataedit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      await axios.post(`${API_URL}/api/log-aktivitas`, {
        id_project: id,
        id_user: iduser,
        aktivitas: "mengedit folder",
        keterangan: "Informasi Proyek"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      fetchData();
      fetchDataLOG();
    } catch (error) {
      console.error("Error while editing project:", error.response || error.message);
    }
  }

  const handleEditDetailClick = () => {
    edit();
    setIsEditingDetail(!isEditingDetail);
  };

  const handleBatalDetail = () => {
    resetForm();
    setIsEditingDetail(!isEditingDetail);
  }
  const handleEditInfoClick = () => {
    edit();
    setIsEditingInfo(!isEditingInfo);
  };

  const handleBatalInfo = () => {
    resetForm();
    setIsEditingInfo(!isEditingInfo);
  }

  const handleEditLokasiClick = () => {
    edit();
    setIsEditingLokasi(!isEditingLokasi);
  };

  const handleBatalLokasi = () => {
    resetForm();
    setIsEditingLokasi(!isEditingLokasi);
  }

  // const handleProvinceChange = (province) => {
  //   setSelectedProvince(province);
  //   setprovinsi(province); // Set provinsi state
  //   setRegencies(Object.keys(indonesiaData[province] || {}));
  //   setSelectedRegency("");
  //   setSubDistricts([]);
  //   setkab(""); // Reset kabupaten
  //   setkec(""); // Reset kecamatan
  //   setdesa(""); // Reset desa
  // };

  // const handleRegencyChange = (regency) => {
  //   setSelectedRegency(regency);
  //   setkab(regency); // Set kabupaten state
  //   setSubDistricts(indonesiaData[selectedProvince][regency] || []);
  //   setkec(""); // Reset kecamatan
  //   setdesa(""); // Reset desa
  // };

  // const handleSubDistrictChange = (subDistrict) => {
  //   const [selectedKecamatan, selectedDesa] = subDistrict.split("-");
  //   setkec(selectedKecamatan); // Set kecamatan state
  //   setdesa(selectedDesa); // Set desa state
  // };

  const handleSelectChange = (value) => {
    setSelectedCategory(value);
  };


  const log = async ()=>{
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id_project");
      const iduser = localStorage.getItem("id");

      await axios.post(`${API_URL}/api/log-aktivitas`, {
        id_project: id,
        id_user: iduser,
        aktivitas: "melihat folder",
        keterangan: "Informasi Proyek"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      fetchDataLOG();

    } catch (error) {
      console.error("Error log:", error.response || error.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={log} variant="secondary" className=' flex items-center  p-[12px] rounded-[6px] gap-[8px]' > <InfoCircle size="14" />
          <p className='text-[14px] font-medium'>Informasi Proyek</p></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[820px] p-[24px]">
        <div className='flex justify-end'>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className='p-0 h-[20px]'>
              <X className='h-[16px] w-[16px]' />
            </Button>
          </DialogClose>
        </div>
        <DialogHeader className='py-[16px]'>
          <DialogTitle className='text-[18px] font-semibold'>Informasi Proyek</DialogTitle>
        </DialogHeader>
        <div className='grid gsp-[16px]'>
          <div className='w-full border' />
          <div className='grid py-[16px]'>
            <div className='flex justify-between items-center pb-[16px]'>
              <h3 className='text-[16px] font-semibold'> {isEditingDetail && ("Edit ")}Detail Proyek</h3>
              {!isEditingDetail && (
                <Button onClick={handleEditDetailClick} variant='secondary' className='text-[14px] h-[36px] rounded-[6px]'>
                  <FiEdit2 color='#000' size={14} />
                  Edit
                </Button>
              )}
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Nama Proyek {isEditingDetail && (<span className='text-rose-500'>*</span>)}</h4>
                  <p className='text-[12px] font-medium text-[#717179]'>Digunakan sebagai nama folder</p>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingDetail && (
                  <p className='text-[14px]'>{nama}</p>
                )}
                {isEditingDetail && (
                  <Input
                    placeholder="Nama Project"
                    className='h-[36px] text-[14px]'
                    value={nama}
                    onChange={(e) => setnama(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Kategori Project{isEditingDetail && (<span className='text-rose-500'>*</span>)}</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingDetail && (
                  <p className='text-[14px]'>{selectedCategory}</p>
                )}
                {isEditingDetail && (
                  <Select onValueChange={handleSelectChange} value={selectedCategory}>
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
                )}
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Deskripsi Project</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingDetail && (
                  <Textarea
                    className="w-full text-[14px] border-0 ring-0 focus-visible:ring-0 p-0"
                    value={deskripsi}
                    readOnly
                  />
                )}
                {isEditingDetail && (
                  <>
                    <Textarea
                      name="alamat"
                      className="w-full text-[14px]"
                      value={deskripsi}
                      onChange={(e) => {
                        const newDeskripsi = e.target.value;
                        if (newDeskripsi.length <= 200) {
                          setdeskripsi(newDeskripsi);
                        }
                      }}
                    />

                    <p className='text-[14px] text-slate-500 font-medium flex justify-end'>{deskripsi.length}/200 char</p>
                  </>
                )}
              </div>
            </div>
            {isEditingDetail && (
              <div className='flex justify-end gap-[8px]'>
                <Button onClick={handleBatalDetail} variant='secondary' className='text-[14px] h-[36px]'>
                  Batal
                </Button>
                <Button onClick={handleEditDetailClick} className='bg-[#0036AA] h-[36px] text-[14px] hover:bg-[#2b4a8e]'>
                  Simpan
                </Button>
              </div>
            )}
          </div>
          <div className='w-full border' />
          <div className='grid  py-[16px]'>
            <div className='flex justify-between items-center pb-[16px]'>
              <h3 className='text-[16px] font-semibold'> {isEditingInfo && ("Edit ")}Informasi Tambahan</h3>
              {!isEditingInfo && (
                <Button onClick={handleEditInfoClick} variant='secondary' className='text-[14px] h-[36px] rounded-[6px]'>
                  <FiEdit2 color='#000' size={14} />
                  Edit
                </Button>
              )}
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Nama Pengaju Project{isEditingInfo && (<span className='text-rose-500'>*</span>)}</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingInfo && (
                  <p className='text-[14px]'>{pengaju}</p>
                )}
                {isEditingInfo && (
                  <Input
                    placeholder="Nama Pengaju Project"
                    className='h-[36px] text-[14px]'
                    value={pengaju}
                    onChange={(e) => setpengaju(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Jabatan</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingInfo && (
                  <p className='text-[14px]'>{jabatan}</p>
                )}
                {isEditingInfo && (
                  <Input
                    placeholder="Jabatan"
                    className='h-[36px] text-[14px]'
                    value={jabatan}
                    onChange={(e) => setjabatan(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Instansi / Organisasi</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingInfo && (
                  <p className='text-[14px]'>{pt}</p>
                )}
                {isEditingInfo && (
                  <Input
                    placeholder="Masukkan nama organisasi"
                    className='h-[36px] text-[14px]'
                    value={pt}
                    onChange={(e) => setpt(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>No. Telp / WA{isEditingInfo && (<span className='text-rose-500'>*</span>)}</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingInfo && (
                  <p className='text-[14px]'>{nomor}</p>
                )}
                {isEditingInfo && (
                  <Input
                    placeholder="Masukkan no. telp (WA)"
                    className='h-[36px] text-[14px]'
                    value={nomor}
                    onChange={(e) => setnomor(e.target.value)}
                  />
                )}
              </div>
            </div>
            {isEditingInfo && (
              <div className='flex justify-end gap-[8px]'>
                <Button onClick={handleBatalInfo} variant='secondary' className='text-[14px] h-[36px]'>
                  Batal
                </Button>
                <Button onClick={handleEditInfoClick} className='bg-[#0036AA] h-[36px] text-[14px] hover:bg-[#2b4a8e]'>
                  Simpan
                </Button>
              </div>
            )}
          </div>
          <div className='w-full border' />
          <div className='grid py-[16px]'>
            <div className='flex justify-between items-center pb-[16px]'>
              <h3 className='text-[16px] font-semibold'> {isEditingLokasi && ("Edit ")}Lokasi Pelaksanaan Proyek</h3>
              {!isEditingLokasi && (
                <Button onClick={handleEditLokasiClick} variant='secondary' className='text-[14px] h-[36px] rounded-[6px]'>
                  <FiEdit2 color='#000' size={14} />
                  Edit
                </Button>
              )}
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Alamat Lengkap{isEditingLokasi && (<span className='text-rose-500'>*</span>)}</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                {!isEditingLokasi && (
                  <Input
                    className="w-full text-[14px] h-[36px] border-0 ring-0 focus-visible:ring-0 p-0"
                    value={alamat}
                    readOnly
                  />
                )}
                {isEditingLokasi && (
                  <>
                    <Textarea
                      placeholder="Tulis alamat lengkap"
                      name="alamat"
                      className="w-full text-[14px]"
                      value={alamat}
                      onChange={(e) => {
                        const newDeskripsi = e.target.value;
                        if (newDeskripsi.length <= 200) {
                          setalamat(newDeskripsi);
                        }
                      }}
                    />

                    <p className='text-[14px] text-slate-500 font-medium flex justify-end'>{alamat.length}/200 char</p>
                  </>
                )}
              </div>
            </div>
            {!isEditingLokasi && (
              <>
                <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                  <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                      <h4>Provinsi</h4>
                    </div>
                  </div>
                  <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                    {provinces
                      .filter((province) => province.id === selectedProvince)
                      .map((province) => (
                        <p className='text-[14px]' key={province.id} value={province.id}>
                          {province.name}
                        </p>
                      ))}
                  </div>
                </div>
                <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                  <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                      <h4>Kabupaten / Kota</h4>
                    </div>
                  </div>
                  <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                    {regencies
                      .filter((province) => province.id === selectedRegency)
                      .map((province) => (
                        <p className='text-[14px]' key={province.id} value={province.id}>
                          {province.name}
                        </p>
                      ))}
                  </div>
                </div>
                <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                  <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                      <h4>Kecamatan</h4>
                    </div>
                  </div>
                  <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                    {subDistricts
                      .filter((province) => province.id === selectedDistricts)
                      .map((province) => (
                        <p className='text-[14px]' key={province.id} value={province.id}>
                          {province.name}
                        </p>
                      ))}
                  </div>
                </div>
                <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                  <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                      <h4>Kelurahan / Desa</h4>
                    </div>
                  </div>
                  <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                    {subvillages
                      .filter((province) => province.id === selectedvillage)
                      .map((province) => (
                        <p className='text-[14px]' key={province.id} value={province.id}>
                          {province.name}
                        </p>
                      ))}
                  </div>
                </div>
              </>
            )}
            {isEditingLokasi && (
              <>
                <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                  <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
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
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
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
                    <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
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
                          {subvillages.map((subvillages) => (
                            <SelectItem key={subvillages.id} value={subvillages.id}>
                              {subvillages.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {isEditingLokasi && (
                  <div className='flex justify-end gap-[8px]'>
                    <Button onClick={handleBatalLokasi} variant='secondary' className='text-[14px] h-[36px]'>
                      Batal
                    </Button>
                    <Button onClick={handleEditLokasiClick} className='bg-[#0036AA] h-[36px] text-[14px] hover:bg-[#2b4a8e]'>
                      Simpan
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary' type="button" className='text-[14px] h-[36px] '>
              Kembali
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InformasiProyek
