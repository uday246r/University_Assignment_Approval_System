import axios from "axios";
import { useEffect, useState } from "react";

export const ApproveAssignment = () =>{
    const [pendingReviewData, setPendingReviewData] = useState([]);
    const API_BASE = import.meta.env.VITE_API_BASE;

    useEffect(()=>{
        const fetchData = async() =>{
            try{
            const token = localStorage.getItem("token");

            const res = await axios.get(`${API_BASE}/api/user/professor/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            console.log("approve assign.......",data);
        }
        catch(err){
            console.log("error occured");
        }
        fetchData();
    }
    },[])
    return(
        <div>
Radhe
        </div>
    )
}