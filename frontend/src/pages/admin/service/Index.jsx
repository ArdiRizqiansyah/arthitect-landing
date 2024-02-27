import Admin from "@/layouts/Admin";
import Heading from "@/components/admin/Heading";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { Button, Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import DeleteModal from "../../../components/admin/modals/DeleteModal";
import toast from "react-hot-toast";

const Index = () => {
  const { auth } = useAuth();
  const [services, setServices] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/users/services`;

        const response = await axios.get(url, {
          headers: {
            Authorization: auth.token,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchService();
  }, [auth]);

  const handleShowDeleteModal = (id) => {
    setDeleteServiceId(id);
    setOpenDeleteModal(true);
  }

  const handleDeleteModal = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/users/services/${deleteServiceId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: auth.token,
        },
      });

      if (response.status === 200) {
        setOpenDeleteModal(false);
        toast.success("Data berhasil dihapus");
        setServices(services.filter((service) => service.id !== deleteServiceId));
      }
    } catch (error) {
      console.error("Error deleting service", error);
      setOpenDeleteModal(false);
      toast.error("Data gagal dihapus");
    }
  }

  return (
    <Admin>
      <Heading
        title="Service"
        icon={<HiWrenchScrewdriver className="text-xl" />}
      >
        <Link to="/admin/service/create" className="ml-auto">
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
                <Table.HeadCell>Ikon</Table.HeadCell>
                <Table.HeadCell>Deskripsi</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <Table.Row key={service.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {service.name}
                      </Table.Cell>
                      <Table.Cell>
                        <i className={`${service.icon} text-lg`}></i>
                      </Table.Cell>
                      <Table.Cell>{service.description}</Table.Cell>
                      <Table.Cell>
                          <Link
                            to={`/admin/service/${service.id}/edit`}
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-2"
                          >
                          Edit
                          </Link>
                          <span className="font font-medium text-red-600 hover:underline cursor-pointer" onClick={() => handleShowDeleteModal(service.id)}>
                            Hapus
                          </span>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                      <Table.Cell colSpan="5" className="text-center">
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
