import { useColorModeValue } from "@/components/ui/color-mode";
import { Input, VStack, Container, Heading, Box} from "@chakra-ui/react";
import { useState } from "react";

function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })
    return (
        <Container>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage;