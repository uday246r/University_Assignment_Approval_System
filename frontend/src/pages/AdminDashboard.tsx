import { useEffect, useState } from "react";
import { CardBase } from "../components/Card"
import axios from "axios";
import { CreateUser } from "./CreateUser";

interface StatItem{
    label: string;
    value: number;
    description: string;
    accent: string;
}

export const AdminDashboard = () =>{
    const [stats, setStats] = useState<StatItem[]>([]);
    const API_BASE = import.meta.env.VITE_API_BASE;

    useEffect(() =>{
        try{
        const fetchData = async() =>{
           const token = localStorage.getItem("token");

            const res = await axios.get(`${API_BASE }/api/admin/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data.data;  
            
            const organisedData: StatItem[] = [
                {
                    label: "Total Departments",
                    value: data.totalDepartments,
                    description: "All Departments",
                    accent: "text-indigo-600",
                },
                {
            label: "Total Users",
            value: data.totalUsers,
            description: "TotalUsers",
            accent: "text-emerald-600",
          },
            ]

         setStats(organisedData);
         
        }
        fetchData();
    }
    catch(err){
            console.error("Error fetching admin dashboard", err);
    }
    },[])

    return(
        <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Keep track of progress in one glance.
          </p>
        </div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <CardBase
              key={stat.label}
              variant="card"
              className="border border-slate-200 bg-white shadow-sm"
            >
              <CardBase variant="header" className="pb-0">
                <CardBase
                  variant="title"
                  className="text-xs font-medium uppercase tracking-wide text-slate-500"
                >
                  {stat.label}
                </CardBase>
              </CardBase>

              <CardBase variant="content" className="pt-3">
                <p className={`text-3xl font-semibold ${stat.accent}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.description}</p>
              </CardBase>
            </CardBase>            
          ))}
        </div>
    
        </div>

        <div>
                <CreateUser/>
              </div>

        </div>
    )
} 