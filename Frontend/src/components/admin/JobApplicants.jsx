import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobApplicantsTable from './JobApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import { setApplicants } from "@/redux/applicationSlice"

export default function JobApplicants() {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector((store) => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        )
        if (res.data?.success) {
          dispatch(setApplicants(res.data.job))
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (params.id) {
      fetchAllApplicants();
    }
  }, [params.id, dispatch])

  // Safely extract the applicants count without crashing
  const applicantsCount = applicants?.applications?.length || 0;

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-bold text-xl my-5">
          Applicants : ({applicantsCount})
        </h1>
        <JobApplicantsTable />
      </div>
    </div>
  )
}
