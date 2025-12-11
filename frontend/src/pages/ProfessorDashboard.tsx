import { useEffect, useState } from "react";
import { CardBase } from "../components/Card";
import axios from "axios";
// import { UploadAssignment } from "./UploadAssignment";
// import { ApproveAssignment } from "./ApproveAssignment";
interface StatItem{
    label: string;
    value: number;
    description: string;
    accent: string;
}

interface StudentAssignment {
  assignmentId: string;
  studentName: string;
  studentEmail: string;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  submissionDate: string;
}
export const ProfessorDashboard = () => {
    const [studentAssignmentData, setStudentAssignmentData] = useState<StudentAssignment[]>([]);
    const [stats, setStats] = useState<StatItem[]>([]);
    const API_BASE = import.meta.env.VITE_API_BASE;

   useEffect(()=>{
    const fetchStats = async() =>{
        try{
            const token = localStorage.getItem("token");

            const res = await axios.get(`${API_BASE}/api/user/professor/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const data = res.data.data;
            setStudentAssignmentData(data.studentAssignments);
             console.log(data.studentAssignments);

            const organisedData: StatItem[] = [  
          {
            label: "Pending Review",
            value: data.assignmentsStatusCount.underReviewAssignments,
            description: "Pending assignment for your approval",
            accent: "text-rose-600",
          },
            ]

         setStats(organisedData);

        } catch(err){
            console.error("Error fetching dashboard", err);
        }
    };
    fetchStats();
    },[]);

    const approveAssignment = () =>{

    }

    const rejectAssignment = () =>{

    }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 ">
            Professor Dashboard
          </h1>
          <p className="text-slate-600">
            Keep track of students assignment submission in one glance.
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

      <div className="overflow-x-auto">
        <table className="border border-black mt-4 w-full table-auto">
          <thead>
            <tr>
             <th className="border border-black p-2">Name</th>
      <th className="border border-black p-2">Title</th>
      <th className="border border-black p-2">Category</th>
      <th className="border border-black p-2">Description</th>
      <th className="border border-black p-2">Email Id</th>
      <th className="border border-black p-2">File Url</th>
      <th className="border border-black p-2">Submission Date</th>
      <th className="border border-black p-2">Comments</th>
            </tr>
          </thead>
          <tbody>
            { 
              studentAssignmentData.map((item)=>(
                <tr key={item.assignmentId}>
                   <td className="border border-black p-2">{item.studentName}</td>
      <td className="border border-black p-2">{item.title}</td>
      <td className="border border-black p-2">{item.category}</td>
      <td className="border border-black p-2">{item.description}</td>
      <td className="border border-black p-2">{item.studentEmail}</td>
      <td className="border border-black p-2">{item.fileUrl}</td>
      <td className="border border-black p-2">{item.submissionDate}</td>
      <td className="border border-black p-2">
        <div className="flex gap-2">
    <button 
    onClick = {approveAssignment}
    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
      Approve
    </button>
    <button 
    onClick = {rejectAssignment}
    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
      Reject
    </button>
  </div>
        </td>
                </tr>
              ))
            } 
          </tbody>
        </table>

      </div>
    </div>
  );
};