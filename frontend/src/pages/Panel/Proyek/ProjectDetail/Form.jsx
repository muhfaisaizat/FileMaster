import React, { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { Export, DocumentForward, Trash, DocumentText, DocumentUpload } from 'iconsax-react';
import Pdf from '../../../../assets/pdf.png'
import Docx from '../../../../assets/docx.png'
import HapusFile from './HapusFile';
import EditFile from './EditFile';
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';

const Form = ({ uploadedFile, setUploadedFile, uploadedFileF2, setUploadedFileF2, uploadedFileF3pdf, setUploadedFileF3pdf, uploadedFileF3docx, setUploadedFileF3docx, uploadedFileF4gambar, setUploadedFileF4gambar, uploadedFileF4analisa, setUploadedFileF4analisa, uploadedFileF4spek, setUploadedFileF4spek, uploadedFileF4airhujan, setUploadedFileF4airhujan, uploadedFileF4airbersih, setUploadedFileF4airbersih, uploadedFileF4airkotor, setUploadedFileF4airkotor, uploadedFileF4SLF, setUploadedFileF4SLF, fetchDataLOG, fetchDataUtama, DataFileUtama, setDataFileUtama }) => {


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Form Pendaftaran.pdf", { type: file.type });
            setUploadedFile(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFile) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFile[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFile[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form Pendaftaran"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F1');
                    formData.append('other_file', 'Form Pendaftaran.pdf');
                    formData.append('file', renamedFile);
                    // Jika belum ada file, lakukan POST untuk upload
                    await axios.post(`${API_URL}/api/detail-project-utama`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengupload file",
                        keterangan: "Form Pendaftaran"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                }

                // Jika diperlukan, panggil fungsi untuk memperbarui data
                fetchDataUtama();
                fetchDataLOG();
            } catch (error) {
                console.log("F1", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF2 = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Informasi Pekerjaan.pdf", { type: file.type });
            setUploadedFileF2(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF3pdf = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Form F3.pdf", { type: file.type });
            setUploadedFileF3pdf(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF3docx = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const renamedFile = new File([file], "Form F3.docx", { type: file.type });
            setUploadedFileF3docx(renamedFile);
        } else {
            alert("Harap unggah file DOCX.");
        }
    };

    const handleFileChangeF4gambar = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Gambar.pdf", { type: file.type });
            setUploadedFileF4gambar(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4analisa = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Analisa Struktur.pdf", { type: file.type });
            setUploadedFileF4analisa(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4spek = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Spek teknis.pdf", { type: file.type });
            setUploadedFileF4spek(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4airhujan = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Perhitungan Air Hujan.pdf", { type: file.type });
            setUploadedFileF4airhujan(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4airbersih = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Perhitungan Air Bersih.pdf", { type: file.type });
            setUploadedFileF4airbersih(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4airkotor = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Perhitungan Air Kotor.pdf", { type: file.type });
            setUploadedFileF4airkotor(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4SLF = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Kajian dan Simak (SLF).pdf", { type: file.type });
            setUploadedFileF4SLF(renamedFile);
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleUploadClick = () => {
        document.getElementById("f1").click();
    };

    const handleUploadClickF2 = () => {
        document.getElementById("f2").click();
    };

    const handleUploadClickF3pdf = () => {
        document.getElementById("f3").click();
    };

    const handleUploadClickF3docx = () => {
        document.getElementById("docx").click();
    };

    const handleUploadClickF4gambar = () => {
        document.getElementById("gambar").click();
    };
    const handleUploadClickF4analisa = () => {
        document.getElementById("analisa").click();
    };
    const handleUploadClickF4spek = () => {
        document.getElementById("spek").click();
    };
    const handleUploadClickF4airhujan = () => {
        document.getElementById("hujan").click();
    };
    const handleUploadClickF4airbersih = () => {
        document.getElementById("bersih").click();
    };
    const handleUploadClickF4airkotor = () => {
        document.getElementById("kotor").click();
    };
    const handleUploadClickF4SLF = () => {
        document.getElementById("slf").click();
    };

    const handleDownloadTemplate = async () => {
        if (uploadedFile) {
            const fileUrl = uploadedFile && uploadedFile[0]?.file
                ? `${API_URL}/download/${uploadedFile[0].file}?rename=${uploadedFile[0].other_file}`
                : URL.createObjectURL(uploadedFile[0].file);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = uploadedFile.name;
            link.click();
            URL.revokeObjectURL(fileUrl);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form Pendaftaran"
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchDataLOG();
            } catch (error) {
                console.log("logaktivitas", error)
            }
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF2 = () => {
        if (uploadedFileF2) {
            const url = URL.createObjectURL(uploadedFileF2);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF2.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };

    const handleDownloadTemplateF3pdf = () => {
        if (uploadedFileF3pdf) {
            const url = URL.createObjectURL(uploadedFileF3pdf);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF3pdf.name;
            link.click();
            URL.revokeObjectURL(url);
        } if (uploadedFileF3docx) {
            const url = URL.createObjectURL(uploadedFileF3docx);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF3docx.name;
            link.click();
            URL.revokeObjectURL(url);
        }
        else {
            alert("Tidak ada file yang diunggah.");
        }
    };

    const handleDownloadTemplateF4gambar = () => {
        if (uploadedFileF4gambar) {
            const url = URL.createObjectURL(uploadedFileF4gambar);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4gambar.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF4analisa = () => {
        if (uploadedFileF4analisa) {
            const url = URL.createObjectURL(uploadedFileF4analisa);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4analisa.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF4spek = () => {
        if (uploadedFileF4spek) {
            const url = URL.createObjectURL(uploadedFileF4spek);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4spek.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF4airhujan = () => {
        if (uploadedFileF4airhujan) {
            const url = URL.createObjectURL(uploadedFileF4airhujan);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4airhujan.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF4airbersih = () => {
        if (uploadedFileF4airbersih) {
            const url = URL.createObjectURL(uploadedFileF4airbersih);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4airbersih.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF4airkotor = () => {
        if (uploadedFileF4airkotor) {
            const url = URL.createObjectURL(uploadedFileF4airkotor);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4airkotor.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };
    const handleDownloadTemplateF4SLF = () => {
        if (uploadedFileF4SLF) {
            const url = URL.createObjectURL(uploadedFileF4SLF);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4SLF.name;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            alert("Tidak ada file yang diunggah.");
        }
    };


    const handleFileClick = async () => {
        if (uploadedFile) {
            const fileUrl = uploadedFile && uploadedFile[0] ? `${API_URL}/uploads/${uploadedFile[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form Pendaftaran"
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchDataLOG();
            } catch (error) {
                console.log("logaktivitas", error)
            }

            if (fileUrl) {
                // Jika file URL dari server tersedia, buka di tab baru
                window.open(fileUrl, '_blank');
            } else if (uploadedFile && uploadedFile[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFile[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF2 = () => {
        if (uploadedFileF2) {
            const fileURL = URL.createObjectURL(uploadedFileF2);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF3pdf = () => {
        if (uploadedFileF3pdf) {
            const fileURL = URL.createObjectURL(uploadedFileF3pdf);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF3docx = () => {
        if (uploadedFileF3docx) {
            const fileURL = URL.createObjectURL(uploadedFileF3docx);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4gambar = () => {
        if (uploadedFileF4gambar) {
            const fileURL = URL.createObjectURL(uploadedFileF4gambar);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4analisa = () => {
        if (uploadedFileF4analisa) {
            const fileURL = URL.createObjectURL(uploadedFileF4analisa);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4spek = () => {
        if (uploadedFileF4spek) {
            const fileURL = URL.createObjectURL(uploadedFileF4spek);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4airhujan = () => {
        if (uploadedFileF4airhujan) {
            const fileURL = URL.createObjectURL(uploadedFileF4airhujan);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4airbersih = () => {
        if (uploadedFileF4airbersih) {
            const fileURL = URL.createObjectURL(uploadedFileF4airbersih);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4airkotor = () => {
        if (uploadedFileF4airkotor) {
            const fileURL = URL.createObjectURL(uploadedFileF4airkotor);
            window.open(fileURL, '_blank');
        }
    };
    const handleFileClickF4SLF = () => {
        if (uploadedFileF4SLF) {
            const fileURL = URL.createObjectURL(uploadedFileF4SLF);
            window.open(fileURL, '_blank');
        }
    };

    const [serverFileSize, setServerFileSize] = useState(null);
    const fileUrl = uploadedFile && uploadedFile[0] ? `${API_URL}/uploads/${uploadedFile[0].file}` : null;
    useEffect(() => {
        const fetchFileSize = async () => {
            if (uploadedFile) {
                try {
                    const response = await axios.head(fileUrl);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSize((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSize('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSize('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSize();
    }, [uploadedFile, fileUrl]);

    return (
        <div>
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className='text-[14px] font-semibold p-[16px]'>F1 - Form Pendaftaran</AccordionTrigger>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFile && (
                            <Button onClick={handleUploadClick} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F1</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="f1"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        {uploadedFile && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClick} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'> {uploadedFile.name ? uploadedFile.name : uploadedFile[0].other_file}</h4>
                                        <p className='text-[12px] text-[#717179]'> {uploadedFile.size ? (uploadedFile.size / (1024 * 1024)).toFixed(2) : serverFileSize}  MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClick} />
                                    <HapusFile UploadedFile={uploadedFile} setUploadedFile={setUploadedFile} DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplate} variant="ghost" className='underline text-[12px] font-medium justify-start text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F1
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className='text-[14px] font-semibold p-[16px]'>F2 - Informasi Pekerjaan</AccordionTrigger>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF2 && (
                            <Button onClick={handleUploadClickF2} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F2</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="f2"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF2}
                        />
                        {uploadedFileF2 && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF2} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF2.name.length > 16 ? `${uploadedFileF2.name.slice(0, 16)}...` : uploadedFileF2.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF2.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF2} />
                                    <HapusFile setUploadedFile={setUploadedFileF2} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF2} variant="ghost" className='underline text-[12px] font-medium justify-start text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F2
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className='text-[14px] font-semibold p-[16px]'>F3 - Data Pengujian Alat Bangunan</AccordionTrigger>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF3pdf && (
                            <Button onClick={handleUploadClickF3pdf} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F3 - PDF</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        {uploadedFileF3pdf && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF3pdf} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF3pdf.name.length > 16 ? `${uploadedFileF3pdf.name.slice(0, 16)}...` : uploadedFileF3pdf.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF3pdf.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF3pdf} />
                                    <HapusFile setUploadedFile={setUploadedFileF3pdf} />
                                </div>
                            </div>
                        )}
                        {!uploadedFileF3docx && (
                            <Button onClick={handleUploadClickF3docx} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F3 - DOCX</h4>
                                    <p className='text-[12px] text-[#717179]'>File docx</p>
                                </div>
                            </Button>
                        )}
                        {uploadedFileF3docx && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF3docx} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Docx} alt="docx" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF3docx.name.length > 16 ? `${uploadedFileF3docx.name.slice(0, 16)}...` : uploadedFileF3docx.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF3docx.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF3docx} />
                                    <HapusFile setUploadedFile={setUploadedFileF3docx} />
                                </div>
                            </div>
                        )}
                        <input
                            id="f3"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF3pdf}
                        />
                        <input
                            id="docx"
                            type="file"
                            accept=".docx"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF3docx}
                        />
                        <Button onClick={handleDownloadTemplateF3pdf} variant="ghost" className='underline text-[12px] font-medium justify-start text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F3
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className='text-[14px] font-semibold p-[16px]'>F4 - Data Pekerjaan Teknis</AccordionTrigger>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4gambar && (
                            <Button onClick={handleUploadClickF4gambar} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Gambar</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="gambar"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4gambar}
                        />
                        {uploadedFileF4gambar && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4gambar} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4gambar.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4gambar.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4gambar} />
                                    <HapusFile setUploadedFile={setUploadedFileF4gambar} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4gambar} variant="ghost" className='underline text-[12px] font-medium justify-start text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Gambar)
                        </Button>
                    </AccordionContent>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4analisa && (
                            <Button onClick={handleUploadClickF4analisa} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Analisa Struktur</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="analisa"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4analisa}
                        />
                        {uploadedFileF4analisa && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4analisa} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4analisa.name.length > 20 ? `${uploadedFileF4analisa.name.slice(0, 20)}...` : uploadedFileF4analisa.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4analisa.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4analisa} />
                                    <HapusFile setUploadedFile={setUploadedFileF4analisa} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4analisa} variant="ghost" className='underline text-[12px] font-medium justify-start text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Analisa Struktur)
                        </Button>
                    </AccordionContent>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4spek && (
                            <Button onClick={handleUploadClickF4spek} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Spek teknis</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="spek"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4spek}
                        />
                        {uploadedFileF4spek && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4spek} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4spek.name.length > 20 ? `${uploadedFileF4spek.name.slice(0, 20)}...` : uploadedFileF4spek.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4spek.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4spek} />
                                    <HapusFile setUploadedFile={setUploadedFileF4spek} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4spek} variant="ghost" className='underline text-[12px] font-medium justify-start text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Spek teknis)
                        </Button>
                    </AccordionContent>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4airhujan && (
                            <Button onClick={handleUploadClickF4airhujan} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Perhitungan Air Hujan</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="hujan"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4airhujan}
                        />
                        {uploadedFileF4airhujan && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4airhujan} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4airhujan.name.length > 20 ? `${uploadedFileF4airhujan.name.slice(0, 20)}...` : uploadedFileF4airhujan.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4airhujan.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4airhujan} />
                                    <HapusFile setUploadedFile={setUploadedFileF4airhujan} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4airhujan} variant="ghost" className='underline text-[12px] w-full font-medium justify-start p-0  text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Air hujan)
                        </Button>
                    </AccordionContent>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4airbersih && (
                            <Button onClick={handleUploadClickF4airbersih} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Perhitungan Air Bersih</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="bersih"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4airbersih}
                        />
                        {uploadedFileF4airbersih && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4airbersih} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4airbersih.name.length > 20 ? `${uploadedFileF4airbersih.name.slice(0, 20)}...` : uploadedFileF4airbersih.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4airbersih.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4airbersih} />
                                    <HapusFile setUploadedFile={setUploadedFileF4airbersih} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4airbersih} variant="ghost" className='underline text-[12px] w-full font-medium justify-start p-0  text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Air Bersih)
                        </Button>
                    </AccordionContent>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4airkotor && (
                            <Button onClick={handleUploadClickF4airkotor} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Perhitungan Air Kotor</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="kotor"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4airkotor}
                        />
                        {uploadedFileF4airkotor && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4airkotor} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4airkotor.name.length > 20 ? `${uploadedFileF4airkotor.name.slice(0, 20)}...` : uploadedFileF4airkotor.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4airkotor.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4airkotor} />
                                    <HapusFile setUploadedFile={setUploadedFileF4airkotor} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4airkotor} variant="ghost" className='underline text-[12px] w-full font-medium justify-start p-0  text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Air Kotor)
                        </Button>
                    </AccordionContent>
                    <AccordionContent className='px-[16px] pb-[16px] grid gap-[8px]'>
                        {!uploadedFileF4SLF && (
                            <Button onClick={handleUploadClickF4SLF} variant="secondary" className='border-2 border-dashed px-[16px] w-full h-[64px] justify-start gap-[12px]'>
                                <div className='bg-[#E9E9E9] w-[36px] h-[36px] flex items-center justify-center rounded-full'>
                                    <Export size="18" variant="Bulk" />
                                </div>
                                <div className='text-left grid gap-[4px]'>
                                    <h4 className='text-[12px] font-bold'>Unggah F4 - Kajian dan Simak (SLF)</h4>
                                    <p className='text-[12px] text-[#717179]'>File pdf</p>
                                </div>
                            </Button>
                        )}
                        <input
                            id="slf"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChangeF4SLF}
                        />
                        {uploadedFileF4SLF && (
                            <div className='flex justify-between p-[16px]'>
                                <div onClick={handleFileClickF4SLF} className='flex gap-[12px] cursor-pointer'>
                                    <img src={Pdf} alt="pdf" className='w-[36px] h-[36px]' />
                                    <div className='text-left grid gap-[4px]'>
                                        <h4 className='text-[12px] font-bold'>{uploadedFileF4SLF.name.length > 20 ? `${uploadedFileF4SLF.name.slice(0, 20)}...` : uploadedFileF4SLF.name}</h4>
                                        <p className='text-[12px] text-[#717179]'>{(uploadedFileF4SLF.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4SLF} />
                                    <HapusFile setUploadedFile={setUploadedFileF4SLF} />
                                </div>
                            </div>
                        )}
                        <Button onClick={handleDownloadTemplateF4SLF} variant="ghost" className='underline text-[12px] w-full font-medium justify-start p-0  text-[#0036AA] hover:bg-transparent hover:text-[#325298]'>
                            <DocumentText size={16} color='#0036AA' />
                            Unduh file template  - Form F4 (Kajian)
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Form
