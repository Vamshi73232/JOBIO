import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.jsx";
import { Label } from "./ui/label.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune"],
  },
  {
    filterType: "Industry",
    array: [
      "FrontEnd Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "Product Manager",
      "Software Engineer",
      "Software Developer",
      "Graphic Designer"
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42-1lakh", "2-4lakh", "4-6lakh", "6-10lakh", "10lakh+"],
  },
];
export default function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value)=>{
    setSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filters Jobs</h1>
      <hr className="mt-3"></hr>
      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2 ">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
