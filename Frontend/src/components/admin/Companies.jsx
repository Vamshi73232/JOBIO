import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByName } from "@/redux/companySlice";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
export default function Companies() {
  useGetAllCompanies();
  const [input,setInput] =useState("");
  const navigate =useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchCompanyByName(input));
  },[input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5 ">
          <Input className="w-fit" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/companies/new")}>New company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
}
