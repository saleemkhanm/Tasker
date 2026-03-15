
import MainLayout from "./Layout/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Learning from "./Pages/Learning";
import './App.css';
import Work from "./Pages/Work";
import Personal from "./Pages/Personal";
import UserProfile from "./Components/UserProfile";
 import Favourite from './Pages/Favourite'
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Home page - default / */}
          <Route index element={<Home />} />

          <Route path="learning" element={<Learning />} />
          <Route path="work" element={<Work />} />
          <Route path="personal" element={<Personal />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="favourite" element={<Favourite/>} />

          {/* Redirect /home → / (optional) */}
          <Route path="home" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
