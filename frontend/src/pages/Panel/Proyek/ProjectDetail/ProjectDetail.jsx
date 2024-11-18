import React, { useState, useContext, useEffect } from 'react'
import TableData from './TableData'
import { ScrollArea } from "@/components/ui/scroll-area"
import Form from './Form'
import Folder from './Folder'
import { VisibilityContext } from '../../MainPanel/Layout';
import { API_URL } from "../../../../helpers/networt";
import axios from 'axios';


const ProjectDetail = () => {
  const { isFolderVisible } = useContext(VisibilityContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileF2, setUploadedFileF2] = useState(null);
  const [uploadedFileF3pdf, setUploadedFileF3pdf] = useState(null);
  const [uploadedFileF3docx, setUploadedFileF3docx] = useState(null);
  const [uploadedFileF4gambar, setUploadedFileF4gambar] = useState(null);
  const [uploadedFileF4analisa, setUploadedFileF4analisa] = useState(null);
  const [uploadedFileF4spek, setUploadedFileF4spek] = useState(null);
  const [uploadedFileF4airhujan, setUploadedFileF4airhujan] = useState(null);
  const [uploadedFileF4airbersih, setUploadedFileF4airbersih] = useState(null);
  const [uploadedFileF4airkotor, setUploadedFileF4airkotor] = useState(null);
  const [uploadedFileF4SLF, setUploadedFileF4SLF] = useState(null);
  const isFileUploadedF3 = uploadedFileF3pdf || uploadedFileF3docx;
  const isFileUploadedF4 = uploadedFileF4gambar || uploadedFileF4analisa || uploadedFileF4spek || uploadedFileF4airhujan || uploadedFileF4airbersih || uploadedFileF4airkotor || uploadedFileF4SLF;
  const lengF = [uploadedFile, uploadedFileF2, isFileUploadedF3, isFileUploadedF4].filter(file => file !== null && file !== undefined).length;
  const [Data, setdata] = useState({});
  const formatData = (apiData) => {
    return {
      id: apiData["ID"],  // Menambahkan "m" pada ID
      nama: apiData["Nama Project"], // Mengakses "Nama Project" yang memiliki spasi
      kategori: apiData["Kategori Project"], // Mengakses "Kategori Project"
      deskripsi: apiData.Deskripsi,  // Mengakses Deskripsi
      namaPengaju: apiData["Nama Pengaju"], // Mengakses "Nama Pengaju"
      jabatan: apiData.Jabatan, // Mengakses Jabatan
      perusahaan: apiData["Instansi/Organisasi"], // Mengakses "Instansi/Organisasi"
      noTelp: apiData["No Telp"], // Mengakses "No Telp"
      alamatLengkap: apiData["Alamat Lengkap"], // Mengakses "Alamat Lengkap"
      provinsi: apiData.Provinsi, // Mengakses Provinsi
      kabupatenKota: apiData["Kabupaten/Kota"], // Mengakses "Kabupaten/Kota"
      kecamatan: apiData.Kecamatan, // Mengakses Kecamatan
      kelurahanDesa: apiData["Kelurahan/Desa"], // Mengakses "Kelurahan/Desa"
      archive: apiData.Archive,  // Mengakses Archive
      date: new Date(apiData.Date).toLocaleDateString('id-ID', {  // Format tanggal "Date"
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      Aktivitas: apiData.Aktivitas, // Mengakses Aktivitas
      Progres: apiData.Progres // Mengakses Progres
    };
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_project");
    try {
      const response = await axios.get(`${API_URL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log untuk memastikan data yang diterima
      // console.log(response.data)

      // Pastikan response.data adalah array
      if (response.data) {
        // Format data langsung sebagai objek
        const formattedData = formatData(response.data);
        setdata(formattedData); // Simpan sebagai objek
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
  const [activities, setaktivitas] = useState([]);
  const formatDataLOG = (apiData) => {
    return {
      id: apiData.id,  
      id_project: apiData.id_project, 
      date: apiData.formatted_createdAt,
      user: apiData.name,
      action: apiData.aktivitas,
      file: `[${apiData.project_with_keterangan}]`,
      avatar: apiData.image,
    };
  };

  const fetchDataLOG = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_project");
    try {
      const response = await axios.get(`${API_URL}/api/log-aktivitas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log untuk memastikan data yang diterima
    //   console.log(response.data)

      // Pastikan response.data adalah array
      if (response.data) {
        // Format data langsung sebagai objek
        const formattedData = response.data.map(formatDataLOG);
        // console.log(formattedData)
        setaktivitas(formattedData); // Simpan sebagai objek
      } else {
        console.error("Data yang diterima bukan array");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  // Ambil data dari API
  useEffect(() => {

    fetchDataLOG();
  }, []);


   const [DataFileUtama, setDataFileUtama] = useState([])


  const formatDataUtama = (apiData) => {
    return {
      id: apiData.id_project_utama, 
      id_project: apiData.id_project,
      file: apiData.other_file, 
      isi: apiData.file, 
      pekerjaan: apiData.pekerjaan,
      format: apiData.format
    };
  };

const fetchDataUtama = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_project");
    try {
        const response = await axios.get(`${API_URL}/api/detail-project-utama/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

       // Log untuk memastikan data yang diterima

        // Pastikan response.data adalah array
        if (Array.isArray(response.data)) {
          const filteredData = response.data.filter(item => item.pekerjaan === "F1");
          // console.log(filteredData)
            const formattedData = response.data.map(formatDataUtama);
            setDataFileUtama(formattedData);
            if (filteredData.length > 0) {
              setUploadedFile(filteredData);
          } else{
            setUploadedFile(null);
          }
        } else {
            console.error("Data yang diterima bukan array");
        }
    } catch (error) {
        console.error("Error fetching data", error);
    }
};
// Ambil data dari API
useEffect(() => {

    fetchDataUtama();
}, []);



  


  return (

    <ScrollArea className="h-[92vh] w-full bg-white">
      <div className=" py-3 px-6 mx-auto">
        <div className="flex flex-wrap -m-4">
          {isFolderVisible && (
            <div className="lg:w-[20%] md:w-1/2 w-full h-full">
              <Folder fetchDatadetail={fetchData} />
            </div>
          )}
          <div className={`${isFolderVisible ? 'lg:w-[56%] border-l' : 'lg:w-[72%]'
            } md:w-1/2 w-full `}>
            <TableData
              uploadedFile={uploadedFile}
              uploadedFileF2={uploadedFileF2}
              uploadedFileF3={isFileUploadedF3}
              uploadedFileF4={isFileUploadedF4}
              lengF={lengF}
              Data={Data}
              activities={activities}
              fetchDataLOG={fetchDataLOG}
              DataFileUtama={DataFileUtama}
              setDataFileUtama={setDataFileUtama}
              fetchDataUtama={fetchDataUtama}
              setUploadedFile={setUploadedFile}
            />
          </div>
          <div className={`${isFolderVisible ? 'lg:w-[24%]' : 'lg:w-[28%]'
            } md:w-1/2 w-full border`} >
            <Form
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              uploadedFileF2={uploadedFileF2}
              setUploadedFileF2={setUploadedFileF2}
              uploadedFileF3docx={uploadedFileF3docx}
              setUploadedFileF3docx={setUploadedFileF3docx}
              uploadedFileF3pdf={uploadedFileF3pdf}
              setUploadedFileF3pdf={setUploadedFileF3pdf}
              uploadedFileF4gambar={uploadedFileF4gambar}
              setUploadedFileF4gambar={setUploadedFileF4gambar}
              uploadedFileF4analisa={uploadedFileF4analisa}
              setUploadedFileF4analisa={setUploadedFileF4analisa}
              uploadedFileF4spek={uploadedFileF4spek}
              setUploadedFileF4spek={setUploadedFileF4spek}
              uploadedFileF4airhujan={uploadedFileF4airhujan}
              setUploadedFileF4airhujan={setUploadedFileF4airhujan}
              uploadedFileF4airbersih={uploadedFileF4airbersih}
              setUploadedFileF4airbersih={setUploadedFileF4airbersih}
              uploadedFileF4airkotor={uploadedFileF4airkotor}
              setUploadedFileF4airkotor={setUploadedFileF4airkotor}
              uploadedFileF4SLF={uploadedFileF4SLF}
              setUploadedFileF4SLF={setUploadedFileF4SLF}
              fetchDataLOG={fetchDataLOG}
              fetchDataUtama={fetchDataUtama}
              DataFileUtama={DataFileUtama}
              setDataFileUtama={setDataFileUtama}
            />
          </div>
        </div>
      </div>
    </ScrollArea>

  )
}

export default ProjectDetail
