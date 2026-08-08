import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        console.log("Applied Jobs API Response:", res.data);

        if (res.data?.success) {
          // Check both plural (applications) and singular (application) key returned by backend
          const appliedJobsData =
            res.data.applications || res.data.application || [];
          dispatch(setAllAppliedJobs(appliedJobsData));
        }
      } catch (err) {
        console.log("Error fetching applied jobs:", err);
      }
    };

    fetchAllAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;