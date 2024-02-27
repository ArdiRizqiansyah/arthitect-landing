import { useEffect, useState } from "react";
import Auth from "../../layouts/Auth";
import { Alert, Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { login, auth } = useAuth(); // context autentikasi

  // redirect ke dashboard jika memiliki token
  useEffect(() => {
    if(auth && auth.token){
      navigate('/admin');
    }
  }, [auth]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorValidation, setErrorValidation] = useState({
    errors: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, formData)
      const data = response.data.data;

      login(data) // simpan data ke provider auth

      navigate('/admin'); //redirect ke dashboard admin
    }catch (error){
      const response = error.response.data;
      
      console.error('Login error: ', error.message);
      setErrorValidation({
        errors: response.errors,
      });
    }
  }

  return (
    <Auth>
      <Card className="max-w-md w-full space-y-6">
        { errorValidation.errors && (
            <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> {errorValidation.errors}
            </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput id="email" name="email" type="email" onChange={handleChange} required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput id="password" name="password" type="password" onChange={handleChange} required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </Auth>
  );
};

export default Login;
