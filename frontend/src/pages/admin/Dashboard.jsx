import { Card } from "flowbite-react";
import Admin from "../../layouts/Admin";
import { HiChartBar } from "react-icons/hi2";
import Heading from "@/components/admin/Heading";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const { auth } = useAuth();
    const [totalProject, setTotalProject] = useState(0);
    const [totalService, setTotalService] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!auth || !auth.token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/dashboard`, {
                    headers: {
                        Authorization: `${auth.token}`
                    }
                })

                const data = response.data.data;
                
                setTotalProject(data.totalProject);
                setTotalService(data.totalService);
            } catch (error) {
                console.error('Error fetching dashboard data:', error.errors);
            }
        }

        fetchDashboardData();
    }, []);

    return (
        <Admin>
            <Heading title="Dashboard" icon={<HiChartBar className="text-xl" />} />
            
            <div className="grid grid-cols-2 gap-5">
                <Card>
                    <div>
                        <h5 className="mb-0 font-semibold text-xl">Service</h5>
                        <h2 className="text-3xl font-bold text-primary-app mb-0">{totalService}</h2>
                        <p className="text-gray-400 mb-0">Jumlah Service</p>
                    </div>
                </Card>
                <Card>
                    <div>
                        <h5 className="mb-0 font-semibold text-xl">Project</h5>
                        <h2 className="text-3xl font-bold text-primary-app mb-0">{totalProject}</h2>
                        <p className="text-gray-400 mb-0">Jumlah Project</p>
                    </div>
                </Card>
            </div>
        </Admin>
    );
}

export default Dashboard;