import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import axios from "axios";

const Project = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                let url = `${import.meta.env.VITE_API_URL}/users/projects`;

                const response = await axios.get(url);

                const data = response.data;

                if (response.status === 200) {
                    setProjects(data.data);
                }
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="px-6 md:px-16 lg:px-24 mb-10">
        <h3 className="text-3xl font-black mb-8">Our Project</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectItem
                        key={project.id}
                        title={project.name}
                        description={project.description}
                        img={project.image ? project.image : "/public/assets/images/project.svg"}
                    />
                ))
            ) : (
                <>
                    <ProjectItem title="Project" description="Our Services Line one Servive line two" img="/public/assets/images/project.svg" />
                    <ProjectItem title="Project" description="Our Services Line one Servive line two" img="/public/assets/images/project.svg" />
                    <ProjectItem title="Project" description="Our Services Line one Servive line two" img="/public/assets/images/project.svg" />
                    <ProjectItem title="Project" description="Our Services Line one Servive line two" img="/public/assets/images/project.svg" />
                </>
            )}
        </div>
      </div>
    );
}

export default Project;