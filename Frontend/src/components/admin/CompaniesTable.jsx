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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DeleteIcon, Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
export default function CompaniesTable() {
  const navigate = useNavigate();
  // Destructuring `companies` assuming store.company = { companies: [...] }
  const { companies, searchCompanyByName } = useSelector(
    (store) => store.company,
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  const deleteCompanyHandler = async (companyId) => {
    try {
      const filteredCompany = filterCompany.filter(
        (company) => company._id !== companyId,
      );
      setFilterCompany(filteredCompany);
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${companyId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByName) {
          return true; // If searchCompanyByName is empty, include all companies
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByName.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByName]);
  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length < 1 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered your company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt="" />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex gap-2 items-center cursor-pointer w-fit"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => deleteCompanyHandler(company._id)}
                        className="flex gap-2 items-center cursor-pointer w-fit"
                      >
                        <DeleteIcon className="w-4" />
                        <span>Delete</span>
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
