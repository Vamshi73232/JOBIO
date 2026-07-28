import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllJobs, setSingleJob } from '@/redux/jobSlice';
export default function useGetSingleJob({jobId}) {
    const dispatch = useDispatch();
   
}