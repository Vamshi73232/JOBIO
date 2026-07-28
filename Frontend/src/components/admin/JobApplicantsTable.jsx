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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import {toast} from "sonner"
export default function JobApplicantsTable() {
  const shortListingStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async(id, status)=>{
    try{
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
        if (res.data.success){
            toast.success(res.data.message)
        }
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>Applied Aspirants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((jobApplicant) => (
              <tr key={jobApplicant._id}>
                <TableCell>{jobApplicant?.applicant?.fullName}</TableCell>
                <TableCell>{jobApplicant?.applicant?.email}</TableCell>
                <TableCell>{jobApplicant?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {jobApplicant?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600"
                      target="_blank"
                      href={jobApplicant?.applicant?.profile?.resume}
                    >
                      {jobApplicant?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{jobApplicant?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, idx) => {
                        return (
                          <div
                          onClick={()=>statusHandler(jobApplicant._id, status)}
                            key={idx}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
