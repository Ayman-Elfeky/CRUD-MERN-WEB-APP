import {
    Box,
    Heading,
    Image,
    Text,
    HStack,
    VStack,
    Input,
    Button,
} from '@chakra-ui/react'
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@chakra-ui/react"
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from '@/store/product'
import { toaster } from '@/components/ui/toaster'
import React, { useState } from 'react'

const ProductCart = ({ product }) => {
    const { deleteProduct, updateProduct } = useProductStore();
    const [editForm, setEditForm] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    });

    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product._id, editForm);
        if (success) {
            toaster.create({
                title: "Success",
                description: message,
                status: "success"
            });
        } else {
            toaster.create({
                title: "Error",
                description: message,
                status: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const { success, message } = await deleteProduct(id);
            if (success) {
                toaster.create({
                    title: "Success",
                    description: message,
                    status: "success"
                });
            } else {
                toaster.create({
                    title: "Error",
                    description: message,
                    status: "error"
                });
            }
        }
    };

    return (
        <Box
            p={4}
            rounded="lg"
            shadow="md"
            borderWidth="1px">
            <Image src={product.image}
                alt={`${product.name} Image`}
                w="full"
                h="200px"
                objectFit="cover"
                rounded="md"
                mb={3} />
            <Heading size="md" mb={2}>{product.name}</Heading>
            <Text fontSize="xl" fontWeight="bold" color="green.500" mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <DialogRoot>
                    <DialogTrigger asChild>
                        <Button
                            bg="blue"
                            size="sm"
                            aria-label="Edit Product"
                        >
                            <FaEdit />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        <DialogCloseTrigger />
                        <DialogBody>
                            <VStack spacing={4}>
                                <Input
                                    placeholder="Product Name"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Price"
                                    type="number"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                />
                                <Input
                                    placeholder="Image URL"
                                    value={editForm.image}
                                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                />
                            </VStack>
                        </DialogBody>
                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Button variant="outline">
                                    Cancel
                                </Button>
                            </DialogActionTrigger>
                            <DialogActionTrigger asChild>
                                <Button colorScheme="blue" onClick={handleUpdateProduct}>
                                    Update Product
                                </Button>
                            </DialogActionTrigger>
                        </DialogFooter>
                    </DialogContent>
                </DialogRoot>
                <Button
                    bg="red"
                    size="sm"
                    aria-label="Delete Product"
                    onClick={() => handleDelete(product._id)}
                >
                    <FaDeleteLeft />
                </Button>
            </HStack>
        </Box>
    )
}

export default ProductCart