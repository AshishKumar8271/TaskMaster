import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Todos from "./pages/todos"
import { Toaster } from "sonner"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "./pages/not-found"
const App = () => {
  return (
    <div>
      <Toaster position="top-right" richColors={true}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<ProtectedRoute>
          <Todos />
        </ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App