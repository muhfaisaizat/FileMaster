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


const InformasiProyek = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ContentStep, setContentStep] = useState(0);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingLokasi, setIsEditingLokasi] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Persiapan Bangun");
  const [nama, setnama] = useState("Persiapan Bangun PT Indomaret")
  const [deskripsi, setdeskripsi] = useState("Penjelasan deskripsi proyek singkat")
  const [pengaju, setpengaju] = useState("Nurmaningtiyas")
  const [jabatan, setjabatan] = useState("Manager")
  const [pt, setpt] = useState("PT Indomaret")
  const [nomor, setnomor] = useState("089230493210")
  const [alamat, setalamat] = useState("Jl langka, dusun baru Keramik merah")
  const [provinsi, setprovinsi] = useState("Provinsi A")
  const [kab, setkab] = useState("Kabupaten A2")
  const [kec, setkec] = useState("Kecamatan A2")
  const [desa, setdesa] = useState("Desa1")
  const [selectedProvince, setSelectedProvince] = useState(provinsi);
  const [selectedRegency, setSelectedRegency] = useState(kab);
  const [regencies, setRegencies] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  useEffect(() => {
    // Set initial regencies and subDistricts based on default province and regency
    setRegencies(Object.keys(indonesiaData[selectedProvince] || {}));
    setSubDistricts(indonesiaData[selectedProvince][kab] || []);
  }, [selectedProvince, kab]);

  const handleEditDetailClick = () => {
    setIsEditingDetail(!isEditingDetail);
  };
  const handleEditInfoClick = () => {
    setIsEditingInfo(!isEditingInfo);
  };
  const handleEditLokasiClick = () => {
    setIsEditingLokasi(!isEditingLokasi);
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setprovinsi(province); // Set provinsi state
    setRegencies(Object.keys(indonesiaData[province] || {}));
    setSelectedRegency("");
    setSubDistricts([]);
    setkab(""); // Reset kabupaten
    setkec(""); // Reset kecamatan
    setdesa(""); // Reset desa
  };

  const handleRegencyChange = (regency) => {
    setSelectedRegency(regency);
    setkab(regency); // Set kabupaten state
    setSubDistricts(indonesiaData[selectedProvince][regency] || []);
    setkec(""); // Reset kecamatan
    setdesa(""); // Reset desa
  };

  const handleSubDistrictChange = (subDistrict) => {
    const [selectedKecamatan, selectedDesa] = subDistrict.split("-");
    setkec(selectedKecamatan); // Set kecamatan state
    setdesa(selectedDesa); // Set desa state
  };

  const handleSelectChange = (value) => {
    setSelectedCategory(value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className=' flex items-center  p-[12px] rounded-[6px] gap-[8px]' > <InfoCircle size="14" />
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
                <Button onClick={handleEditDetailClick} variant='secondary' className='text-[14px] h-[36px]'>
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
                <Button onClick={handleEditInfoClick} variant='secondary' className='text-[14px] h-[36px]'>
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
                <p className='text-[14px]'>{provinsi}</p>
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Kabupaten / Kota</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                <p className='text-[14px]'>{kab}</p>
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Kecamatan</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                <p className='text-[14px]'>{kec}</p>
              </div>
            </div>
            <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
              <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px] text-[#717179]'>
                  <h4>Kelurahan / Desa</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                <p className='text-[14px]'>{desa}</p>
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
                <Select onValueChange={handleProvinceChange} value={provinsi}>
                  <SelectTrigger className="w-full h-[36px] text-[14px]">
                    <SelectValue placeholder="Pilih Provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Provinsi</SelectLabel>
                      {Object.keys(indonesiaData).map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
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
                <Select onValueChange={handleRegencyChange} disabled={!selectedProvince} value={kab} >
                  <SelectTrigger className="w-full h-[36px] text-[14px]">
                    <SelectValue placeholder="Pilih Salah Satu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kabupaten / Kota</SelectLabel>
                      {regencies.map((regency) => (
                        <SelectItem key={regency} value={regency}>
                          {regency}
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
                  <h4>Kecamatan / Desa</h4>
                </div>
              </div>
              <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                <Select onValueChange={handleSubDistrictChange} disabled={!selectedRegency} value={`${kec}-${desa}`}>
                  <SelectTrigger className="w-full h-[36px] text-[14px]">
                    <SelectValue placeholder="Pilih Salah Satu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kecamatan / Desa</SelectLabel>
                      {subDistricts.map((subDistrict) => (
                        <SelectItem key={subDistrict} value={subDistrict}>
                          {subDistrict}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {isEditingLokasi && (
              <div className='flex justify-end gap-[8px]'>
                <Button onClick={handleEditLokasiClick} variant='secondary' className='text-[14px] h-[36px]'>
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
