import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import { Input, VStack, Container, Heading, Box, Button, useToastStyles } from "@chakra-ui/react";
// import { tableAnatomy } from "@chakra-ui/react/anatomy";
import { useState } from "react";

function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })

    // const toast = useToastStyles();

    const { createProduct } = useProductStore()

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct)
        if(!success) {
            console.log("False Toaster")
            toaster.create({
                title: "Error",
                description: message,
                status: "error"
            })
        } else {
            console.log("True Toaster")
            toaster.create({
                title: "success",
                description: message,
                status: "successfull"
            })
        }
        console.log("Success: ", success, "\nMessage: ", message)
    }

    return (
        <Container maxW={"container.sm"}>
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
                        <Input
                            placeholder="Image Url"
                            name="Image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <Button colorScheme={"blue"} onClick={handleAddProduct} w={'full'}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage;