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
import { toast } from "sonner";
export default function JobApplicantsTable() {
  const shortListingStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (id, status) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  // Safe fallback to prevent undefined errors
  const applicationsList = applicants?.applications || [];

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
          {applicationsList.length > 0 ? (
            applicationsList.map((jobApplicant) => (
              <TableRow key={jobApplicant?._id}>
                <TableCell>
                  {jobApplicant?.applicant?.fullname || jobApplicant?.applicant?.fullName || "N/A"}
                </TableCell>
                <TableCell>{jobApplicant?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{jobApplicant?.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell>
                  {jobApplicant?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={jobApplicant?.applicant?.profile?.resume}
                    >
                      {jobApplicant?.applicant?.profile?.resumeOriginalName || "Download Resume"}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {jobApplicant?.createdAt ? jobApplicant.createdAt.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, idx) => (
                        <div
                          onClick={() => statusHandler(jobApplicant?._id, status)}
                          key={idx}
                          className="flex w-fit items-center my-2 cursor-pointer hover:text-blue-600"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No applicants found for this job.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
