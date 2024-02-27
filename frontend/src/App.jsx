import { Route, Routes } from "react-router-dom";
import Home from "./pages/guest/Home";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminServiceIndex from "./pages/admin/service/Index";
import AdminServiceForm from "./pages/admin/service/Form";
import AdminProjectIndex from "./pages/admin/project/Index";
import AdminProjectForm from "./pages/admin/project/Form";
import AdminTestimonialIndex from "./pages/admin/testimonial/Index";
import AdminTestimonialForm from "./pages/admin/testimonial/Form";
import { ProtectedLayout } from "./components/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* auth */}
      <Route path="/login" element={<Login />} />

      {/* admin */}
      <Route path="/admin" element={<ProtectedLayout />}>
        <Route index element={<AdminDashboard/>} />

        {/* service */}
        <Route path="service">
          <Route index element={<AdminServiceIndex />} />
          <Route path="create" element={<AdminServiceForm />} />
          <Route path=":id/edit" element={<AdminServiceForm />} />
        </Route>

        {/* project */}
        <Route path="project">
          <Route index element={<AdminProjectIndex />} />
          <Route path="create" element={<AdminProjectForm />} />
          <Route path=":id/edit" element={<AdminProjectForm />} />
        </Route>

        {/* testimonial */}
        <Route path="testimonial">
          <Route index element={<AdminTestimonialIndex />} />
          <Route path="create" element={<AdminTestimonialForm />} />
          <Route path=":id/edit" element={<AdminTestimonialForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;