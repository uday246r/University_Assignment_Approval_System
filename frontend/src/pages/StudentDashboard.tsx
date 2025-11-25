import { useEffect, useState } from "react";
import { CardBase } from "../components/Card";
import axios from "axios";

interface StatItem{
    label: string;
    value: number;
    description: string;
    accent: string;
}

export const StudentDashboard = () => {
    const [stats, setStats] = useState<StatItem[]>([]);
    const API_BASE = import.meta.env.VITE_API_BASE;

   useEffect(()=>{
    const fetchStats = async() =>{
        try{
            const token = localStorage.getItem("token");

            const res = await axios.get(`${API_BASE}/api/student/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data.data;

            const organisedData: StatItem[] = [
                {
                    label: "Total Assignments",
                    value: data.totalAssignments,
                    description: "All assignments assigned to you",
                    accent: "text-indigo-600",
                },
                {
            label: "Submitted",
            value: data.assignmentsStatusCount.submittedAssignments,
            description: "Assignments already submitted",
            accent: "text-emerald-600",
          },
          {
            label: "Drafts",
            value: data.assignmentsStatusCount.draftAssignments,
            description: "Work saved but not yet sent",
            accent: "text-amber-600",
          },
          {
            label: "Pending Review",
            value: data.assignmentsStatusCount.underReviewAssignments,
            description: "Awaiting approval from faculty",
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
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Student Dashboard
          </h1>
          <p className="text-slate-600">
            Keep track of your assignment progress in one glance.
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
    </div>
  );
};