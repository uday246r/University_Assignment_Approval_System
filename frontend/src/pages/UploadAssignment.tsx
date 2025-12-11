import { useEffect, useState } from "react"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export const UploadAssignment = () =>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [professorDetails,setProffessorDetails] = useState([]);
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchFacultyDetails = async() =>{
    const token = localStorage.getItem("token");
const res = await axios.get(`${VITE_API_BASE}/api/user/admin`,{
    headers:{
                Authorization: token ? `Bearer ${token}` : ""
            },
        })
            // console.log("Professor Details: ", res.data);
            const onlyProfessor = res.data.users.filter((u:any)=>u.role==="PROFESSOR");
            setProffessorDetails(onlyProfessor);
    }
    fetchFacultyDetails();
},[]);

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files.length > 0){
            setFile(e.target.files[0]);
        }
    }
const handleUpload = async() => {
    if (!file || !title.trim() || !description.trim() || !category.trim()) {
        alert("Please fill all the fields!");
        return;
    }
      if (!selectedProfessorId) {
      alert("Please select a professor!");
      return;
    }

    const studentId = localStorage.getItem("userId");
    if(!studentId){
        alert("Missing student id. Please sign in again.");
        return;
    }

    const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("studentId", studentId);
        formData.append("professorId", selectedProfessorId);
        formData.append("file", file);


    try{
        const token = localStorage.getItem("token");
        const res = await axios.post(`${VITE_API_BASE}/api/user/student/upload/Assignment`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: token ? `Bearer ${token}` : ""
            }
        })
        console.log("Assignment Uploaded Successfully", res.data);
        setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
     setSelectedProfessorId("");

    }catch(err){
        console.log("Error occured ", err);
    } finally {
      setLoading(false);
    }
}
    return(
        <div>
                <InputBox label={"Title"} placeholder={"Provide title of the assignment"} onChange={(e)=>{
                    setTitle(e.target.value);
                }}/>
                <InputBox label={"Description"} placeholder={"Enter description"} onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                <InputBox label={"Category"} placeholder={"Enter valid category"} onChange={(e)=>{
                    setCategory(e.target.value);
                }}/>
                <label className="text-white block mb-1">Select Professor</label>
                <select
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        value={selectedProfessorId}
        onChange={(e) => setSelectedProfessorId(e.target.value)}
      >
        <option value="">-- Choose Professor --</option>

        {professorDetails.length > 0 ? (
          professorDetails.map((prof: any) => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>

                <InputBox type="file" label={"Upload Assignment"} placeholder={"Upload your Assignment"} onChange={handleFileChange}
                />

                <Button onClick={handleUpload} label={"Submit"}/>
        </div>
    )
}