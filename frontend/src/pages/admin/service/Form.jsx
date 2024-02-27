import Admin from "@/layouts/Admin";
import Heading from "@/components/admin/Heading";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ServiceForm = () => {
    const { auth } = useAuth();

    // cek url apakah memiliki id
    const { id } = useParams();

    // jika ada maka ambil data service berdasarkan id dengan method GET
    useEffect(() => {
        if (id) {
            const fetchService = async () => {
                try {
                    let url = `${import.meta.env.VITE_API_URL}/users/services/${id}`;

                    const response = await axios.get(url, {
                        headers: {
                            Authorization: auth.token,
                        },
                    });

                    const data = response.data.data;

                    if (response.status === 200) {
                        setFormData({
                            name: data.name,
                            icon: data.icon,
                            description: data.description,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching services", error);
                }
            };

            fetchService();
        }
    }, [auth, id]);

    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = `${import.meta.env.VITE_API_URL}/users/services`;
        let method = "POST";

        if (id) {
            url = `${import.meta.env.VITE_API_URL}/users/services/${id}`;
            method = "PUT";

            // add id to form data
            formData.id = id;
        }

        try {
            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    Authorization: auth.token
                }
            });

            const data = response.data;

            if (response.status === 201 || response.status === 200) {
                if(!id){
                    // reset form
                    setFormData({
                        name: "",
                        icon: "",
                        description: "",
                    });
                }

                toast.success(data.message);
            }
        } catch (error) {
            console.error('Error submiting the form', error);
        }
    }

    return (
        <Admin>
            <Heading
                title={`${id ? "Edit" : "Tambah"} Service`}
                icon={<HiWrenchScrewdriver className="text-xl" />}
                urlBack="/admin/service"
            />

            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Nama Service" />
                        </div>
                        <TextInput id="name" name="name" type="text" value={formData.name} onChange={handleChange} sizing="md" required />
                    </div>
                    <div className="mb-3">
                        <div className="block">
                            <Label htmlFor="icon" value="Ikon Service" />
                        </div>
                        <span className="text-sm mb-2">
                            Silahkan buka <a href="https://fontawesome.com/icons" className="text-primary-app underline font-semibold" target="_blank" rel="noreferrer">disini</a> untuk melihat list ikon yang tersedia.
                        </span>
                        <TextInput id="icon" name="icon" type="text" value={formData.icon} onChange={handleChange} sizing="md" required />
                    </div>
                    <div className="mb-3">
                        <div className="block mb-2">
                            <Label htmlFor="description" value="Deskripsi" />
                        </div>
                        <Textarea id="description" name="description" placeholder="" value={formData.description} onChange={handleChange} required rows={4} />
                    </div>
                    <div className="flex mt-5">
                        <Button type="submit" className="w-full">
                            Simpan
                        </Button>
                    </div>
                </form>
            </Card>
        </Admin>
    );
}

export default ServiceForm;