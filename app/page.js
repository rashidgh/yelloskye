"use client";
import React, { useState } from "react";
import SearchBar from "./component/SearchBar";
import ProjectCard from "./component/ProjectCard";
import ProjectsMap from "./component/Map";
import ChartsPage from "./component/Chart";
import Navbar from "./component/Navbar";

// Sample projects (you can fetch from API or JSON file)
const sampleProjects = [
  {
    id: 1,
    name: "Project 1 - Bengaluru",
    orders: 5,
    lastOrder: "20/05/2023",
    tags: ["Maps", "Images", "Videos"],
    latitude: 12.9314,
    longitude: 77.5927, // Vijayarangam Layout, Jayanagar, Bengaluru
  },
  {
    id: 2,
    name: "Project 2 - Pune",
    orders: 3,
    lastOrder: "12/04/2023",
    tags: ["Maps", "Panos", "Virtual Tours"],
    latitude: 18.5166,
    longitude: 73.8636, // Trimurti Honey Gold Building, Pune
  },
  {
    id: 3,
    name: "Project 3 - Kolkata",
    orders: 7,
    lastOrder: "28/02/2023",
    tags: ["Maps", "Images", "Videos"],
    latitude: 22.9444,
    longitude: 88.3702, // Barrackpore, Kolkata
  },
];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = sampleProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
     <Navbar />
      <div className="p-4 h-[70vh] w-[100vw]">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredProjects?.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <ProjectsMap
          projects={filteredProjects}
          onProjectClick={projectId => {
            console.log("Clicked project ID:", projectId);
          }}
        />
        <ChartsPage />
      </div>
    </div>
  );
};

export default Page;
