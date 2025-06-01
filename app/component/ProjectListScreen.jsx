// /app/projects/page.js
'use client'
import { useState } from "react";
import SearchBar from "./SearchBar";
import ProjectCard from "./ProjectCard";
import { sampleProjects } from "@/database/database";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = sampleProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
