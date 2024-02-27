import Admin from "@/layouts/Admin";
import Heading from "@/components/admin/Heading";
import { HiClipboardDocumentList } from "react-icons/hi2";
import {
  Button,
  Card,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useAuth } from "../../../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProjectForm = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          let url = `${import.meta.env.VITE_API_URL}/users/projects/${id}`;

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
          console.error("Error fetching projects", error);
        }
      };

      fetchProject();
    }
  }, [auth, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
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

    let url = `${import.meta.env.VITE_API_URL}/users/projects`;
    let method = "POST";

    const serviceData = new FormData();

    serviceData.append("name", formData.name);
    serviceData.append("description", formData.description);
    serviceData.append("image", formData.image);

    if (id) {
      url = `${import.meta.env.VITE_API_URL}/users/projects/${id}`;
      method = "PUT";

      // add id to form data
      serviceData.append("id", id);
    }

    try {
      const response = await axios({
        method : method,
        url : url,
        data : serviceData,
        headers: {
          Authorization: auth.token,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      if (response.status === 201 || response.status === 200) {
        if(!id){
          // reset form
          setFormData({
            name: "",
            description: "",
            image: null,
          });
        }

        toast.success(data.message);
      }
    } catch (error) {
        console.error("Error adding project", error);
    }
  }

  return (
    <Admin>
      <Heading
        title={`${id ? "Edit" : "Tambah"} Project`}
        icon={<HiClipboardDocumentList className="text-xl" />}
        urlBack="/admin/project"
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
            {id && (
              <span className="text-sm">* Kosongkan jika tidak ada perubahan</span>
            )}
          </div>
          <div className="flex mt-5">
            <Button type="submit" className="w-full">Simpan</Button>
          </div>
        </form>
      </Card>
    </Admin>
  );
};

export default ProjectForm;
