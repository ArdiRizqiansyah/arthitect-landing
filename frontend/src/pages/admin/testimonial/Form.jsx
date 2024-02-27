import Admin from "@/layouts/Admin";
import Heading from "@/components/admin/Heading";
import { HiUserGroup } from "react-icons/hi2";
import {
  Button,
  Card,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useAuth } from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const TestimonialForm = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      const fetchTestimonial = async () => {
        try {
          let url = `${import.meta.env.VITE_API_URL}/users/testimonials/${id}`;

          const response = await axios.get(url, {
            headers: {
              Authorization: auth.token,
            },
          });

          const data = response.data.data;

          if (response.status === 200) {
            setFormData({
              name: data.name,
              description: data.description,
              image: data.image,
            });
          }
        } catch (error) {
          console.error("Error fetching testimonials", error);
        }
      };

      fetchTestimonial();
    }
  }, [auth, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
        ...formData,
        [name]: files[0]
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = `${import.meta.env.VITE_API_URL}/users/testimonials`;
      let method = "post";

      let testimonialData = new FormData();
      testimonialData.append("name", formData.name);
      testimonialData.append("description", formData.description);
      testimonialData.append("image", formData.image);

      if (id) {
        url = `${import.meta.env.VITE_API_URL}/users/testimonials/${id}`;
        method = "put";
        testimonialData.append("id", id)
      }

      const response = await axios({
        method: method,
        url: url,
        data: testimonialData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: auth.token,
        },
      });

      const data = response.data;

      console.log(data);

      if (response.status === 200 || response.status === 201) {
        if(!id) {
          setFormData({
            name: "",
            description: "",
            image: null,
          });
        }
        
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error creating testimonial", error);
    }
  }

  return (
    <Admin>
      <Heading
        title={`${id ? "Edit" : "Tambah"} Testimonial`}
        icon={<HiUserGroup className="text-xl" />}
        urlBack="/admin/testimonial"
      />

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nama Project" />
            </div>
            <TextInput id="name" name="name" type="text" onChange={handleChange} value={formData.name} sizing="md" />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="description" value="Deskripsi" />
            </div>
            <Textarea id="description" name="description" placeholder="" onChange={handleChange} value={formData.description} required rows={4} />
          </div>
          <div id="fileUpload" className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="image" value="Upload Image" />
            </div>
            <FileInput
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex mt-5">
            <Button type="submit" className="w-full">Simpan</Button>
          </div>
        </form>
      </Card>
    </Admin>
  );
};

export default TestimonialForm;
