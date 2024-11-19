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

    const handleFileChangeF2 = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Informasi Pekerjaan.pdf", { type: file.type });
            setUploadedFileF2(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF2) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF2[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF2[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Informasi Pekerjaan"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F2');
                    formData.append('other_file', 'Informasi Pekerjaan.pdf');
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
                        keterangan: "Informasi Pekerjaan"
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
                console.log("F2", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF3pdf = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Form F3.pdf", { type: file.type });
            setUploadedFileF3pdf(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF3pdf) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF3pdf[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF3pdf[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F3 - PDF"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F3');
                    formData.append('other_file', 'Form F3.pdf');
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
                        keterangan: "Form F3 - PDF"
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
                console.log("F3pdf", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF3docx = async(event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const renamedFile = new File([file], "Form F3.docx", { type: file.type });
            setUploadedFileF3docx(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF3docx) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF3docx[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF3docx[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F3 - DOCX"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F3');
                    formData.append('other_file', 'Form F3.docx');
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
                        keterangan: "Form F3 - DOCX"
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
                console.log("F3docx", error);
            }
        } else {
            alert("Harap unggah file DOCX.");
        }
    };

    const handleFileChangeF4gambar = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Gambar.pdf", { type: file.type });
            setUploadedFileF4gambar(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4gambar) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4gambar[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4gambar[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Gambar"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Gambar.pdf');
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
                        keterangan: "Form F4 - Gambar"
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
                console.log("F4gambar", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4analisa = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Analisa Struktur.pdf", { type: file.type });
            setUploadedFileF4analisa(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4analisa) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4analisa[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4analisa[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Analisa Struktur"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Analisa Struktur.pdf');
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
                        keterangan: "Form F4 - Analisa Struktur"
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
                console.log("F4analisa", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4spek = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Spek Teknis.pdf", { type: file.type });
            setUploadedFileF4spek(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4spek) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4spek[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4spek[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Spek Teknis"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Spek Teknis.pdf');
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
                        keterangan: "Form F4 - Spek Teknis"
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
                console.log("F4spek", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4airhujan = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Perhitungan Air Hujan.pdf", { type: file.type });
            setUploadedFileF4airhujan(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4airhujan) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4airhujan[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4airhujan[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Perhitungan Air Hujan"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Perhitungan Air Hujan.pdf');
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
                        keterangan: "Form F4 - Perhitungan Air Hujan"
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
                console.log("F4Perhitungan Air Hujan", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4airbersih = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Perhitungan Air Bersih.pdf", { type: file.type });
            setUploadedFileF4airbersih(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4airbersih) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4airbersih[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4airbersih[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Perhitungan Air Bersih"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Perhitungan Air Bersih.pdf');
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
                        keterangan: "Form F4 - Perhitungan Air Bersih"
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
                console.log("F4Perhitungan Air Bersih.pdf", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4airkotor = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Perhitungan Air Kotor.pdf", { type: file.type });
            setUploadedFileF4airkotor(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4airkotor) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4airkotor[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4airkotor[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Perhitungan Air Kotor"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Perhitungan Air Kotor.pdf');
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
                        keterangan: "Form F4 - Perhitungan Air Kotor"
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
                console.log("F4Perhitungan Air Kotor.pdf", error);
            }
        } else {
            alert("Harap unggah file PDF.");
        }
    };

    const handleFileChangeF4SLF = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const renamedFile = new File([file], "Kajian dan Simak (SLF).pdf", { type: file.type });
            setUploadedFileF4SLF(renamedFile);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                if (uploadedFileF4SLF) {
                    const formDataedit = new FormData();
                    formDataedit.append('file', renamedFile);
                    formDataedit.append('oldFileName', uploadedFileF4SLF[0].file);
                    // Jika uploadedFile sudah ada, lakukan PUT untuk update
                    await axios.put(`${API_URL}/api/detail-project-utama/${uploadedFileF4SLF[0].id_project_utama}`, formDataedit, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    await axios.post(`${API_URL}/api/log-aktivitas`, {
                        id_project: id,
                        id_user: iduser,
                        aktivitas: "mengganti file",
                        keterangan: "Form F4 - Kajian dan Simak (SLF)"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                } else {
                    const formData = new FormData();
                    formData.append('id_project', id);
                    formData.append('pekerjaan', 'F4');
                    formData.append('other_file', 'Kajian dan Simak (SLF).pdf');
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
                        keterangan: "Form F4 - Kajian dan Simak (SLF)"
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
                console.log("F4Kajian dan Simak (SLF).pdf", error);
            }
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
    const handleDownloadTemplateF2 = async () => {
        if (uploadedFileF2) {
            const url = uploadedFileF2 && uploadedFileF2[0]?.file
                ? `${API_URL}/download/${uploadedFileF2[0].file}?rename=${uploadedFileF2[0].other_file}`
                : URL.createObjectURL(uploadedFileF2[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF2.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Informasi Pekerjaan"
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

    const handleDownloadTemplateF3pdf = async() => {
        if (uploadedFileF3pdf) {
            const url = uploadedFileF3pdf && uploadedFileF3pdf[0]?.file
            ? `${API_URL}/download/${uploadedFileF3pdf[0].file}?rename=${uploadedFileF3pdf[0].other_file}`
            : URL.createObjectURL(uploadedFileF3pdf[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF3pdf.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F3 - PDF"
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
        }
        else {
            console.log("Tidak ada file yang diunggah f3 pdf.");
        } 
        if (uploadedFileF3docx) {
            const url = uploadedFileF3docx && uploadedFileF3docx[0]?.file
            ? `${API_URL}/download/${uploadedFileF3docx[0].file}?rename=${uploadedFileF3docx[0].other_file}`
            : URL.createObjectURL(uploadedFileF3docx[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF3docx.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F3 - DOCX"
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
        }
        else {
            console.log("Tidak ada file yang diunggah f3 docx.");
        }
    };

    const handleDownloadTemplateF4gambar = async () => {
        if (uploadedFileF4gambar) {
            const url = uploadedFileF4gambar && uploadedFileF4gambar[0]?.file
            ? `${API_URL}/download/${uploadedFileF4gambar[0].file}?rename=${uploadedFileF4gambar[0].other_file}`
            : URL.createObjectURL(uploadedFileF4gambar[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4gambar.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Gambar"
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
    const handleDownloadTemplateF4analisa = async () => {
        if (uploadedFileF4analisa) {
            const url = uploadedFileF4analisa && uploadedFileF4analisa[0]?.file
            ? `${API_URL}/download/${uploadedFileF4analisa[0].file}?rename=${uploadedFileF4analisa[0].other_file}`
            : URL.createObjectURL(uploadedFileF4analisa[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4analisa.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Analisa Struktur"
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
    const handleDownloadTemplateF4spek = async () => {
        if (uploadedFileF4spek) {
            const url = uploadedFileF4spek && uploadedFileF4spek[0]?.file
            ? `${API_URL}/download/${uploadedFileF4spek[0].file}?rename=${uploadedFileF4spek[0].other_file}`
            : URL.createObjectURL(uploadedFileF4spek[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4spek.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Spek Teknis"
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
    const handleDownloadTemplateF4airhujan = async () => {
        if (uploadedFileF4airhujan) {
            const url = uploadedFileF4airhujan && uploadedFileF4airhujan[0]?.file
            ? `${API_URL}/download/${uploadedFileF4airhujan[0].file}?rename=${uploadedFileF4airhujan[0].other_file}`
            : URL.createObjectURL(uploadedFileF4airhujan[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4airhujan.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Perhitungan Air Hujan"
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
    const handleDownloadTemplateF4airbersih = async () => {
        if (uploadedFileF4airbersih) {
            const url = uploadedFileF4airbersih && uploadedFileF4airbersih[0]?.file
            ? `${API_URL}/download/${uploadedFileF4airbersih[0].file}?rename=${uploadedFileF4airbersih[0].other_file}`
            : URL.createObjectURL(uploadedFileF4airbersih[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4airbersih.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Perhitungan Air Bersih"
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
    const handleDownloadTemplateF4airkotor = async () => {
        if (uploadedFileF4airkotor) {
            const url = uploadedFileF4airkotor && uploadedFileF4airkotor[0]?.file
            ? `${API_URL}/download/${uploadedFileF4airkotor[0].file}?rename=${uploadedFileF4airkotor[0].other_file}`
            : URL.createObjectURL(uploadedFileF4airkotor[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4airkotor.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Perhitungan Air Kotor"
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
    const handleDownloadTemplateF4SLF = async () => {
        if (uploadedFileF4SLF) {
            const url = uploadedFileF4SLF && uploadedFileF4SLF[0]?.file
            ? `${API_URL}/download/${uploadedFileF4SLF[0].file}?rename=${uploadedFileF4SLF[0].other_file}`
            : URL.createObjectURL(uploadedFileF4SLF[0].file);
            const link = document.createElement("a");
            link.href = url;
            link.download = uploadedFileF4SLF.name;
            link.click();
            URL.revokeObjectURL(url);
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "mengunduh file",
                    keterangan: "Form F4 - Kajian dan Simak (SLF)"
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
    const handleFileClickF2 = async () => {
        if (uploadedFileF2) {
            const fileUrl = uploadedFileF2 && uploadedFileF2[0] ? `${API_URL}/uploads/${uploadedFileF2[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Informasi Pekerjaan"
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
            } else if (uploadedFileF2 && uploadedFileF2[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF2[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF3pdf = async() => {
        if (uploadedFileF3pdf) {
            const fileUrl = uploadedFileF3pdf && uploadedFileF3pdf[0] ? `${API_URL}/uploads/${uploadedFileF3pdf[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F3 - PDF"
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
            } else if (uploadedFileF3pdf && uploadedFileF3pdf[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF3pdf[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF3docx = async () => {
        if (uploadedFileF3docx) {
            const fileUrl = uploadedFileF3docx && uploadedFileF3docx[0] ? `${API_URL}/download/${uploadedFileF3docx[0].file}?rename=${uploadedFileF3docx[0].other_file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F3 - DOCX"
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
            } else if (uploadedFileF3docx && uploadedFileF3docx[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF3docx[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4gambar = async () => {
        if (uploadedFileF4gambar) {
            const fileUrl = uploadedFileF4gambar && uploadedFileF4gambar[0] ? `${API_URL}/uploads/${uploadedFileF4gambar[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Gambar"
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
            } else if (uploadedFileF4gambar && uploadedFileF4gambar[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4gambar[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4analisa = async () => {
        if (uploadedFileF4analisa) {
            const fileUrl = uploadedFileF4analisa && uploadedFileF4analisa[0] ? `${API_URL}/uploads/${uploadedFileF4analisa[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Analisa Struktur"
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
            } else if (uploadedFileF4analisa && uploadedFileF4analisa[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4analisa[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4spek = async () => {
        if (uploadedFileF4spek) {
            const fileUrl = uploadedFileF4spek && uploadedFileF4spek[0] ? `${API_URL}/uploads/${uploadedFileF4spek[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Spek Teknis"
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
            } else if (uploadedFileF4spek && uploadedFileF4spek[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4spek[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4airhujan = async () => {
        if (uploadedFileF4airhujan) {
            const fileUrl = uploadedFileF4airhujan && uploadedFileF4airhujan[0] ? `${API_URL}/uploads/${uploadedFileF4airhujan[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Perhitungan Air Hujan"
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
            } else if (uploadedFileF4airhujan && uploadedFileF4airhujan[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4airhujan[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4airbersih = async () => {
        if (uploadedFileF4airbersih) {
            const fileUrl = uploadedFileF4airbersih && uploadedFileF4airbersih[0] ? `${API_URL}/uploads/${uploadedFileF4airbersih[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Perhitungan Air Bersih"
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
            } else if (uploadedFileF4airbersih && uploadedFileF4airbersih[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4airbersih[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4airkotor = async () => {
        if (uploadedFileF4airkotor) {
            const fileUrl = uploadedFileF4airkotor && uploadedFileF4airkotor[0] ? `${API_URL}/uploads/${uploadedFileF4airkotor[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Perhitungan Air Kotor"
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
            } else if (uploadedFileF4airkotor && uploadedFileF4airkotor[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4airkotor[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };
    const handleFileClickF4SLF = async() => {
        if (uploadedFileF4SLF) {
            const fileUrl = uploadedFileF4SLF && uploadedFileF4SLF[0] ? `${API_URL}/uploads/${uploadedFileF4SLF[0]?.file}` : null;
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id_project");
                const iduser = localStorage.getItem("id");

                await axios.post(`${API_URL}/api/log-aktivitas`, {
                    id_project: id,
                    id_user: iduser,
                    aktivitas: "melihat file",
                    keterangan: "Form F4 - Kajian dan Simak (SLF)"
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
            } else if (uploadedFileF4SLF && uploadedFileF4SLF[0]?.file) {
                // Jika file URL tidak tersedia, gunakan URL.createObjectURL untuk membuka file lokal
                const fileURL = URL.createObjectURL(uploadedFileF4SLF[0].file);
                window.open(fileURL, '_blank');
            } else {
                alert('File tidak tersedia.');
            }
        }
    };

    const [serverFileSize, setServerFileSize] = useState(null);
    const [serverFileSizef2, setServerFileSizef2] = useState(null);
    const [serverFileSizef3pdf, setServerFileSizef3pdf] = useState(null);
    const [serverFileSizef3docx, setServerFileSizef3docx] = useState(null);
    const [serverFileSizef4gambar, setServerFileSizef4gambar] = useState(null);
    const [serverFileSizef4analisa, setServerFileSizef4analisa] = useState(null);
    const [serverFileSizef4spek, setServerFileSizef4spek] = useState(null);
    const [serverFileSizef4airhujan, setServerFileSizef4airhujan] = useState(null);
    const [serverFileSizef4airbersih, setServerFileSizef4airbersih] = useState(null);
    const [serverFileSizef4airkotor, setServerFileSizef4airkotor] = useState(null);
    const [serverFileSizef4slf, setServerFileSizef4slf] = useState(null);
    const fileUrl = uploadedFile && uploadedFile[0] ? `${API_URL}/uploads/${uploadedFile[0].file}` : null;
    const fileUrlf2 = uploadedFileF2 && uploadedFileF2[0] ? `${API_URL}/uploads/${uploadedFileF2[0].file}` : null;
    const fileUrlf3pdf = uploadedFileF3pdf && uploadedFileF3pdf[0] ? `${API_URL}/uploads/${uploadedFileF3pdf[0].file}` : null;
    const fileUrlf3docx = uploadedFileF3docx && uploadedFileF3docx[0] ? `${API_URL}/uploads/${uploadedFileF3docx[0].file}` : null;
    const fileUrlf4gambar = uploadedFileF4gambar && uploadedFileF4gambar[0] ? `${API_URL}/uploads/${uploadedFileF4gambar[0].file}` : null;
    const fileUrlf4analisa = uploadedFileF4analisa && uploadedFileF4analisa[0] ? `${API_URL}/uploads/${uploadedFileF4analisa[0].file}` : null;
    const fileUrlf4spek = uploadedFileF4spek && uploadedFileF4spek[0] ? `${API_URL}/uploads/${uploadedFileF4spek[0].file}` : null;
    const fileUrlf4airhujan = uploadedFileF4airhujan && uploadedFileF4airhujan[0] ? `${API_URL}/uploads/${uploadedFileF4airhujan[0].file}` : null;
    const fileUrlf4airbersih = uploadedFileF4airbersih && uploadedFileF4airbersih[0] ? `${API_URL}/uploads/${uploadedFileF4airbersih[0].file}` : null;
    const fileUrlf4airkotor = uploadedFileF4airkotor && uploadedFileF4airkotor[0] ? `${API_URL}/uploads/${uploadedFileF4airkotor[0].file}` : null;
    const fileUrlf4slf = uploadedFileF4SLF && uploadedFileF4SLF[0] ? `${API_URL}/uploads/${uploadedFileF4SLF[0].file}` : null;
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
    useEffect(() => {
        const fetchFileSizef2 = async () => {
            if (uploadedFileF2) {
                try {
                    const response = await axios.head(fileUrlf2);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef2((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef2('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef2('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef2();
    }, [uploadedFileF2, fileUrlf2]);
    useEffect(() => {
        const fetchFileSizef3pdf = async () => {
            if (uploadedFileF3pdf) {
                try {
                    const response = await axios.head(fileUrlf3pdf);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef3pdf((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef3pdf('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef3pdf('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef3pdf();
    }, [uploadedFileF3pdf, fileUrlf3pdf]);
    useEffect(() => {
        const fetchFileSizef3docx = async () => {
            if (uploadedFileF3docx) {
                try {
                    const response = await axios.head(fileUrlf3docx);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef3docx((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef3docx('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef3docx('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef3docx();
    }, [uploadedFileF3docx, fileUrlf3docx]);
    useEffect(() => {
        const fetchFileSizef4gambar = async () => {
            if (uploadedFileF4gambar) {
                try {
                    const response = await axios.head(fileUrlf4gambar);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4gambar((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4gambar('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4gambar('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4gambar();
    }, [uploadedFileF4gambar, fileUrlf4gambar]);
    useEffect(() => {
        const fetchFileSizef4analisa = async () => {
            if (uploadedFileF4analisa) {
                try {
                    const response = await axios.head(fileUrlf4analisa);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4analisa((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4analisa('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4analisa('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4analisa();
    }, [uploadedFileF4analisa, fileUrlf4analisa]);
    useEffect(() => {
        const fetchFileSizef4spek = async () => {
            if (uploadedFileF4spek) {
                try {
                    const response = await axios.head(fileUrlf4spek);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4spek((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4spek('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4spek('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4spek();
    }, [uploadedFileF4spek, fileUrlf4spek]);
    useEffect(() => {
        const fetchFileSizef4airhujan = async () => {
            if (uploadedFileF4airhujan) {
                try {
                    const response = await axios.head(fileUrlf4airhujan);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4airhujan((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4airhujan('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4airhujan('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4airhujan();
    }, [uploadedFileF4airhujan, fileUrlf4airhujan]);
    useEffect(() => {
        const fetchFileSizef4airbersih = async () => {
            if (uploadedFileF4airbersih) {
                try {
                    const response = await axios.head(fileUrlf4airbersih);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4airbersih((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4airbersih('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4airbersih('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4airbersih();
    }, [uploadedFileF4airbersih, fileUrlf4airbersih]);
    useEffect(() => {
        const fetchFileSizef4airkotor = async () => {
            if (uploadedFileF4airkotor) {
                try {
                    const response = await axios.head(fileUrlf4airkotor);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4airkotor((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4airkotor('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4airkotor('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4airkotor();
    }, [uploadedFileF4airkotor, fileUrlf4airkotor]);
    useEffect(() => {
        const fetchFileSizef4slf = async () => {
            if (uploadedFileF4SLF) {
                try {
                    const response = await axios.head(fileUrlf4slf);
                    const contentLength = response.headers['content-length'];
                    if (contentLength) {
                        setServerFileSizef4slf((contentLength / (1024 * 1024)).toFixed(2)); // Convert to MB
                    } else {
                        setServerFileSizef4slf('Ukuran tidak tersedia');
                    }
                } catch (error) {
                    // console.error('Gagal mendapatkan ukuran file:', error);
                    setServerFileSizef4slf('Error mendapatkan ukuran');
                }
            }
        };

        fetchFileSizef4slf();
    }, [uploadedFileF4SLF, fileUrlf4slf]);

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
                                        <h4 className='text-[12px] font-bold'>
                                            {uploadedFileF2?.name
                                                ? (uploadedFileF2.name.length > 16
                                                    ? `${uploadedFileF2.name.slice(0, 16)}...`
                                                    : uploadedFileF2.name)
                                                : (uploadedFileF2[0]?.other_file
                                                    ? (uploadedFileF2[0]?.other_file.length > 16
                                                        ? `${uploadedFileF2[0]?.other_file.slice(0, 16)}...`
                                                        : uploadedFileF2[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF2.size ? (uploadedFileF2.size / (1024 * 1024)).toFixed(2) : serverFileSizef2} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF2} />
                                    <HapusFile setUploadedFile={setUploadedFileF2}  UploadedFile={uploadedFileF2}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF3pdf?.name
                                                ? (uploadedFileF3pdf.name.length > 16
                                                    ? `${uploadedFileF3pdf.name.slice(0, 16)}...`
                                                    : uploadedFileF3pdf.name)
                                                : (uploadedFileF3pdf[0]?.other_file
                                                    ? (uploadedFileF3pdf[0]?.other_file.length > 16
                                                        ? `${uploadedFileF3pdf[0]?.other_file.slice(0, 16)}...`
                                                        : uploadedFileF3pdf[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF3pdf.size ? (uploadedFileF3pdf.size / (1024 * 1024)).toFixed(2) : serverFileSizef3pdf} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF3pdf} />
                                    <HapusFile setUploadedFile={setUploadedFileF3pdf} UploadedFile={uploadedFileF3pdf}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama}/>
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF3docx?.name
                                                ? (uploadedFileF3docx.name.length > 16
                                                    ? `${uploadedFileF3docx.name.slice(0, 16)}...`
                                                    : uploadedFileF3docx.name)
                                                : (uploadedFileF3docx[0]?.other_file
                                                    ? (uploadedFileF3docx[0]?.other_file.length > 16
                                                        ? `${uploadedFileF3docx[0]?.other_file.slice(0, 16)}...`
                                                        : uploadedFileF3docx[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF3docx.size ? (uploadedFileF3docx.size / (1024 * 1024)).toFixed(2) : serverFileSizef3docx} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF3docx} />
                                    <HapusFile setUploadedFile={setUploadedFileF3docx} UploadedFile={uploadedFileF3docx}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4gambar?.name
                                                ? (uploadedFileF4gambar.name.length > 20
                                                    ? `${uploadedFileF4gambar.name.slice(0, 20)}...`
                                                    : uploadedFileF4gambar.name)
                                                : (uploadedFileF4gambar[0]?.other_file
                                                    ? (uploadedFileF4gambar[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4gambar[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4gambar[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4gambar.size ? (uploadedFileF4gambar.size / (1024 * 1024)).toFixed(2) : serverFileSizef4gambar} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4gambar} />
                                    <HapusFile setUploadedFile={setUploadedFileF4gambar} UploadedFile={uploadedFileF4gambar}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4analisa?.name
                                                ? (uploadedFileF4analisa.name.length > 20
                                                    ? `${uploadedFileF4analisa.name.slice(0, 20)}...`
                                                    : uploadedFileF4analisa.name)
                                                : (uploadedFileF4analisa[0]?.other_file
                                                    ? (uploadedFileF4analisa[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4analisa[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4analisa[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4analisa.size ? (uploadedFileF4analisa.size / (1024 * 1024)).toFixed(2) : serverFileSizef4analisa} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4analisa} />
                                    <HapusFile setUploadedFile={setUploadedFileF4analisa} UploadedFile={uploadedFileF4analisa}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4spek?.name
                                                ? (uploadedFileF4spek.name.length > 20
                                                    ? `${uploadedFileF4spek.name.slice(0, 20)}...`
                                                    : uploadedFileF4spek.name)
                                                : (uploadedFileF4spek[0]?.other_file
                                                    ? (uploadedFileF4spek[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4spek[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4spek[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4spek.size ? (uploadedFileF4spek.size / (1024 * 1024)).toFixed(2) : serverFileSizef4spek} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4spek} />
                                    <HapusFile setUploadedFile={setUploadedFileF4spek} UploadedFile={uploadedFileF4spek}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4airhujan?.name
                                                ? (uploadedFileF4airhujan.name.length > 20
                                                    ? `${uploadedFileF4airhujan.name.slice(0, 20)}...`
                                                    : uploadedFileF4airhujan.name)
                                                : (uploadedFileF4airhujan[0]?.other_file
                                                    ? (uploadedFileF4airhujan[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4airhujan[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4airhujan[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4airhujan.size ? (uploadedFileF4airhujan.size / (1024 * 1024)).toFixed(2) : serverFileSizef4airhujan} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4airhujan} />
                                    <HapusFile setUploadedFile={setUploadedFileF4airhujan} UploadedFile={uploadedFileF4airhujan}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4airbersih?.name
                                                ? (uploadedFileF4airbersih.name.length > 20
                                                    ? `${uploadedFileF4airbersih.name.slice(0, 20)}...`
                                                    : uploadedFileF4airbersih.name)
                                                : (uploadedFileF4airbersih[0]?.other_file
                                                    ? (uploadedFileF4airbersih[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4airbersih[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4airbersih[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4airbersih.size ? (uploadedFileF4airbersih.size / (1024 * 1024)).toFixed(2) : serverFileSizef4airbersih} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4airbersih} />
                                    <HapusFile setUploadedFile={setUploadedFileF4airbersih} UploadedFile={uploadedFileF4airbersih}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4airkotor?.name
                                                ? (uploadedFileF4airkotor.name.length > 20
                                                    ? `${uploadedFileF4airkotor.name.slice(0, 20)}...`
                                                    : uploadedFileF4airkotor.name)
                                                : (uploadedFileF4airkotor[0]?.other_file
                                                    ? (uploadedFileF4airkotor[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4airkotor[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4airkotor[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4airkotor.size ? (uploadedFileF4airkotor.size / (1024 * 1024)).toFixed(2) : serverFileSizef4airkotor} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4airkotor} />
                                    <HapusFile setUploadedFile={setUploadedFileF4airkotor} UploadedFile={uploadedFileF4airkotor}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
                                        <h4 className='text-[12px] font-bold'>
                                        {uploadedFileF4SLF?.name
                                                ? (uploadedFileF4SLF.name.length > 20
                                                    ? `${uploadedFileF4SLF.name.slice(0, 20)}...`
                                                    : uploadedFileF4SLF.name)
                                                : (uploadedFileF4SLF[0]?.other_file
                                                    ? (uploadedFileF4SLF[0]?.other_file.length > 20
                                                        ? `${uploadedFileF4SLF[0]?.other_file.slice(0, 20)}...`
                                                        : uploadedFileF4SLF[0]?.other_file)
                                                    : "Nama file tidak tersedia")
                                            }
                                        </h4>
                                        <p className='text-[12px] text-[#717179]'>{uploadedFileF4SLF.size ? (uploadedFileF4SLF.size / (1024 * 1024)).toFixed(2) : serverFileSizef4slf} MB</p>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <EditFile handleUploadClick={handleUploadClickF4SLF} />
                                    <HapusFile setUploadedFile={setUploadedFileF4SLF} UploadedFile={uploadedFileF4SLF}  DataFileUtama={DataFileUtama} setDataFileUtama={setDataFileUtama} fetchDataLOG={fetchDataLOG} fetchDataUtama={fetchDataUtama} />
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
