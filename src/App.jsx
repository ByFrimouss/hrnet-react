import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import EmployeeList from "./pages/EmployeeList/EmployeeList";

/**
 * @component App
 * @description Composant racine. Configure le routeur et la structure de l'app.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
