import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice.js";
import { Button } from "./ui/button.jsx";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "Full Stack Developer",
  "Software Engineer",
  "Software Developer",
];
export default function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) =>{
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button variant="outline" className="rounded-full" onClick ={() => searchJobHandler(item)}>
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
