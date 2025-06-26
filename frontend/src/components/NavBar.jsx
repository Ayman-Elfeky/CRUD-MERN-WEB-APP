import { Box, Button, Container, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import { BsPlusSquareFill, BsPlusSquareDotted } from "react-icons/bs"
import { LuMoon, LuSun } from "react-icons/lu"
// import {PlusSquareIcon} from "@chakra-ui/icons"
import { Link } from "react-router"
import { useColorMode, useColorModeValue} from "./ui/color-mode"

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Container maxW={"1140px"} p={4}>
            <Flex
                h={"6"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{
                        base: "22",
                        sm: "28"
                    }}
                    fontWeight={"bold"}
                    textTransform={'uppercase'}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    // bgClip='text'
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to="/create">
                        <Button>
                            <BsPlusSquareFill boxSize={5} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? (
                            <LuMoon boxSize={5} />
                        ) : (
                            <LuSun boxSize={5} />
                        )}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default NavBar