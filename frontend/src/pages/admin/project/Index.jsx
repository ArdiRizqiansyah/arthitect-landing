import Admin from "@/layouts/Admin";
import Heading from "@/components/admin/Heading";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { Avatar, Button, Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/admin/modals/DeleteModal";

const Index = () => {
  const { auth } = useAuth();
  const [projects, setProjects] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/users/projects`;

        const response = await axios.get(url, {
          headers: {
            Authorization: auth.token,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProject();
  }, [auth]);

  const handleShowDeleteModal = (id) => {
    setDeleteProjectId(id);
    setOpenDeleteModal(true);
  }

  const handleDeleteModal = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/users/projects/${deleteProjectId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: auth.token,
        },
      });

      if (response.status === 200) {
        setOpenDeleteModal(false);
        setProjects(projects.filter((project) => project.id !== deleteProjectId));
        toast.success("Data berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting project", error);
      setOpenDeleteModal(false);
      toast.error("Data gagal dihapus");
    }
  }

  return (
    <Admin>
      <Heading
        title="Project"
        icon={<HiClipboardDocumentList className="text-xl" />}
      >
        <Link to="/admin/project/create" className="ml-auto">
            <Button as="span" size="sm">
                Tambah
            </Button>
        </Link>
      </Heading>

      <Card>
        <div className="overflow-x-auto">
            <Table hoverable striped>
            <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Nama</Table.HeadCell>
                <Table.HeadCell>Deskripsi</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <Table.Row key={project.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <Avatar img={project.image ? project.image : '/public/assets/images/project.svg' } size="lg" />
                        {project.name}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{project.description}</Table.Cell>
                    <Table.Cell>
                        <Link to={`/admin/project/${project.id}/edit`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-2">
                          Edit
                        </Link>
                        <span className="font font-medium text-red-600 hover:underline cursor-pointer" onClick={() => handleShowDeleteModal(project.id)}>
                          Hapus
                        </span>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center">
                    Tidak ada data
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            </Table>
        </div>
      </Card>

      <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} onDelete={handleDeleteModal} />
    </Admin>
  );
};

export default Index;
