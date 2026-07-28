import React from 'react'
import Navbar from '../shared/Navbar'
import JobApplicantsTable from './JobApplicantsTable'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import {setApplicants} from "@/redux/applicationSlice"
import { useSelector } from 'react-redux'
export default function JobApplicants() {
  const params = useParams()
  const dispatch = useDispatch()
  const {applicants} = useSelector((store)=>store.application)
  useEffect(()=>{
    const fetchAllApplicants = async()=>{
      try{
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
        if (res.data.success){
          dispatch(setApplicants(res.data.job))
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchAllApplicants();
  },[])
  return (
    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto">
            <h1 className="font-bold text-xl my-5">
                Applicants : {applicants.applications .length}
            </h1>
            <JobApplicantsTable/>
        </div>
    </div>
  )
}
