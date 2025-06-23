import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { Route, Routes } from "react-router"
import Footer from "./components/Footer"
import { useColorModeValue } from "./components/ui/color-mode"
import { Box } from "@chakra-ui/react"


function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.800")}>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
    <Footer />
    </Box>
  )
}

export default App
