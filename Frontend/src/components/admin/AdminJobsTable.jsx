import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
export default function AdminJobsTable() {
  const navigate = useNavigate();
  // Destructuring `companies` assuming store.company = { companies: [...] }
  const { allAdminJobs, searchJobByName } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const dispatch = useDispatch();
  const DeleteHandler = async (jobId) => {
    try {
      const filteredJobs = filterJobs.filter((job) => job._id !== jobId);
      setFilterJobs(filteredJobs);
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByName) {
        return true; // If searchJobByName is empty, include all jobs
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByName.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByName.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByName]);
  return (
    <div>
      <Table>
        <TableCaption>A list of your posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length < 1 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't posted any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => DeleteHandler(job._id)}
                        className="flex gap-2 items-center cursor-pointer w-fit"
                      >
                        <Delete className="w-4" />
                        <span>Delete</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex gap-2 items-center cursor-pointer w-fit mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
