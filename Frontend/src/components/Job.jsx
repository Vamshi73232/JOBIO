import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
export default function Job({job}) {
  const navigate = useNavigate()
  const jobId = "123ewknjsd4efwvsd"
  const daysAgoFunction = (mongoDbTime)=>{
    const CreatedAt = new Date(mongoDbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - CreatedAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }
  return (
    <div className="p-5 rounded-xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between bg-white w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : daysAgoFunction(job?.createdAt) + " days ago"}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button  variant="secondary" className="rounded-full p-0 w-10 h-10">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold my-2 text-lg ">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} openings</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">{job?.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-[#7209B7]">Save for Later</Button>
      </div>
    </div>
  );
}


// import React from "react";
// import { Button } from "./ui/button";
// import { Bookmark } from "lucide-react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";

// export default function Job({ job }) {
//   const navigate = useNavigate();

//   const daysAgoFunction = (mongoDbTime) => {
//     if (!mongoDbTime) return "Today";
//     const CreatedAt = new Date(mongoDbTime);
//     const currentDate = new Date();
//     const timeDifference = currentDate - CreatedAt;
//     const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     return days === 0 ? "Today" : `${days} days ago`;
//   };

//   return (
//     <div className="p-5 rounded-xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between bg-white w-full">
      
//       {/* Top Content Section */}
//       <div>
//         {/* Header: Date & Bookmark */}
//         <div className="flex items-center justify-between">
//           <p className="text-sm text-gray-500">
//             {daysAgoFunction(job?.createdAt)}
//           </p>
//           <Button variant="outline" className="rounded-full" size="icon">
//             <Bookmark className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Company Info */}
//         <div className="flex items-center gap-2 my-3">
//           <Button variant="secondary" className="rounded-full p-0 w-10 h-10 shrink-0">
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={job?.company?.logo} />
//             </Avatar>
//           </Button>
//           <div>
//             <h1 className="font-medium text-base leading-tight">{job?.company?.name}</h1>
//             <p className="text-xs text-gray-500">India</p>
//           </div>
//         </div>

//         {/* Title Section (Fixed 2-line height alignment) */}
//         <div className="h-14 flex items-center my-1">
//           <h1 className="font-bold text-lg leading-snug line-clamp-2">
//             {job?.title}
//           </h1>
//         </div>

//         {/* Description Section (Fixed height alignment) */}
//         <div className="h-10 flex items-start">
//           <p className="text-sm text-gray-600 line-clamp-2 leading-tight">
//             {job?.description}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Section: Badges & Buttons */}
//       <div className="mt-4 pt-2 border-t border-gray-50">
//         {/* Badges Box: Fixed minimum height to keep buttons locked in place regardless of badge wrap */}
//         <div className="flex items-center gap-1.5 flex-wrap min-h-[3.5rem]">
//           <Badge className="text-blue-700 font-bold bg-blue-50 hover:bg-blue-100" variant="ghost">
//             {job?.position} openings
//           </Badge>
//           <Badge className="text-[#F83002] font-bold bg-orange-50 hover:bg-orange-100" variant="ghost">
//             {job?.jobType}
//           </Badge>
//           <Badge className="text-[#7209B7] font-bold bg-purple-50 hover:bg-purple-100" variant="ghost">
//             {job?.salary && !isNaN(job?.salary) ? `${job.salary} LPA` : "N/A"}
//           </Badge>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3 mt-3">
//           <Button 
//             variant="outline" 
//             className="flex-1"
//             onClick={() => navigate(`/description/${job?._id}`)}
//           >
//             Details
//           </Button>
//           <Button className="bg-[#7209B7] hover:bg-[#5b0793] flex-1">
//             Save for Later
//           </Button>
//         </div>
//       </div>

//     </div>
//   );
// }