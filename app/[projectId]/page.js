"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ProjectDetailTab from "../component/Tab"


// You could replace this with actual fetched data
const sampleProjects = [
  {
    id: 1,
    name: "Demo project",
    orders: 2,
    lastOrder: "15/01/2023",
    tags: ["Maps", "Images", "Panos", "Virtual Tours", "Videos"],
    thumbnail: "https://scx1.b-cdn.net/csz/news/800a/2012/howcanyousee.png", // Use public folder or external link
  },
  {
    id: 2,
    name: "Drone Experience",
    orders: 4,
    lastOrder: "10/03/2023",
    tags: ["Maps", "Images", "Videos"],
    thumbnail:
      "https://raw.githubusercontent.com/wiki/jimut123/jimutmap/satellite_data/higher_scale_map.jpeg",
  },
  {
    id: 3,
    name: "Sample - CMV",
    orders: 1,
    lastOrder: "01/01/2023",
    tags: ["Maps", "Images"],
    thumbnail:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-29534070-4277333061124185498.jpg",
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
      <ProjectDetailTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="mt-4">
        {selectedTab === "images" &&
          project?.images?.map((img, i) => (
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
