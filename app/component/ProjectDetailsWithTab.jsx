"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ProjectDetailsTabs from "../component/ProjectDetailsTabs";

// You could replace this with actual fetched data
const sampleProjects = [
  {
    id: 1,
    name: "Sample Video",
    images: ["/sample-1.jpg"],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
  },
  {
    id: 2,
    name: "Drone Experience",
    images: ["/sample-2.jpg"],
    videos: [],
  },
];

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = sampleProjects.find(p => p.id === parseInt(projectId));

  const [selectedTab, setSelectedTab] = useState("images");

  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <ProjectDetailsTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="mt-4">
        {selectedTab === "images" &&
          project.images.map((img, i) => (
            <img key={i} src={img} alt="Preview" className="w-96 mb-4" />
          ))}

        {selectedTab === "videos" &&
          project.videos.map((video, i) => (
            <iframe
              key={i}
              width="560"
              height="315"
              src={video}
              title="Video"
              frameBorder="0"
              allowFullScreen
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
