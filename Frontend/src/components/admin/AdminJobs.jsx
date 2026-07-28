import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {setSearchJobByName} from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
export default function AdminJobs() {
    useGetAllAdminJobs();
  const [input,setInput] =useState("");
  const navigate =useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchJobByName(input));
  },[input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5 ">
          <Input className="w-fit" placeholder="Filter by name, role" onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/jobs/new")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}
