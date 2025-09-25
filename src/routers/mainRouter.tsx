import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ClassificationPage from "../pages/ClassificationPage";
import ClassificationResult from "../pages/ClassificationResult";
import SubmitPage from "../pages/ClassificationPage";


export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Placeholder para futura proteção de rotas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/classification" element={<ClassificationPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/result/:taskId" element={<ClassificationResult />} />
        </Routes>
    );
}