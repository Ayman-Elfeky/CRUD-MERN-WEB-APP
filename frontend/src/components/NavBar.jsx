import { Box, Button, Container, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import { BsPlusSquare, BsPlusSquareDotted } from "react-icons/bs"
import { Link } from "react-router"

const NavBar = () => {
    return (
        <Box>
            <Container maxW="container.xl" p={4} bg="blue.500" color="white">
                <Flex justify="space-between" align="center">
                    <Text fontSize="xl" fontWeight="bold">MyApp</Text>
                    <HStack spacing={4}>
                        <Link to="/create"><BsPlusSquareDotted /></Link>
                        <Button colorScheme="teal" variant="solid">Create Page</Button>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    )
}

export default NavBar