import Admin from "@/layouts/Admin";
import Heading from "@/components/admin/Heading";
import { HiUserGroup } from "react-icons/hi2";
import { Button, Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/admin/modals/DeleteModal";

const Index = () => {
  const { auth } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTestimonialId, setDeleteTestimonialId] = useState(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/users/testimonials`;

        const response = await axios.get(url, {
          headers: {
            Authorization: auth.token,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };

    fetchTestimonial();
  }, [auth]);

  const handleShowDeleteModal = (id) => {
    setDeleteTestimonialId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModal = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL
        }/users/testimonials/${deleteTestimonialId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: auth.token,
        },
      });

      if (response.status === 200) {
        setOpenDeleteModal(false);
        setTestimonials(
          testimonials.filter(
            (testimonial) => testimonial.id !== deleteTestimonialId
          )
        );
        toast.success("Data berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting testimonials", error);
      setOpenDeleteModal(false);
      toast.error("Data gagal dihapus");
    }
  };

  return (
    <Admin>
      <Heading title="Testimonial" icon={<HiUserGroup className="text-xl" />}>
        <Link to="/admin/testimonial/create" className="ml-auto">
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
              {testimonials.length > 0 ? (
                testimonials.map((testimonial, index) => (
                  <Table.Row
                    key={testimonial.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </Table.Cell>
                    <Table.Cell>{testimonial.description}</Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/admin/testimonial/${testimonial.id}/edit`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-2"
                      >
                        Edit
                      </Link>
                      <span className="font font-medium text-red-600 hover:underline cursor-pointer" onClick={() => handleShowDeleteModal(testimonial.id)}>
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
