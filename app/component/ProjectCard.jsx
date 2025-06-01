"use client";

import React from "react";
import MiniMap from "./MiniMap"; // Make sure MiniMap.jsx is in the same folder or adjust path accordingly



const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg">
      {/* Mini map with red marker */}
      <MiniMap
        coordinates={[project.longitude, project.latitude]}
        project={project}
      />

      {/* Project details */}
      <h2 className="text-lg font-semibold mt-2">{project.name}</h2>
      <p>Orders: {project.orders}</p>
      <p>Last Order: {project.lastOrder}</p>

      {/* Tags */}
      <div className="flex flex-wrap mt-2 gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-sm px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
