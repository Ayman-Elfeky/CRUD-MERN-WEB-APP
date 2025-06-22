import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { Route, Routes } from "react-router"
import Footer from "./components/Footer"

function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
