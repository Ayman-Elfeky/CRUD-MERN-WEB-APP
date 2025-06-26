import { Box, Heading, Image, Text, HStack, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '@/store/product'
import { toaster } from '@/components/ui/toaster'
import React from 'react'

const ProductCart = ({ product }) => {
    const { deleteProduct } = useProductStore();

    const handleEdit = (id) => {
        // TODO: Implement edit functionality
        console.log("Edit product with id:", id);
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
            <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
                size="sm"
                aria-label="Edit Product"
                onClick={() => handleEdit(product._id)}
            />
            <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
                aria-label="Delete Product"
                onClick={() => handleDelete(product._id)}
            />
        </HStack>
    </Box>
    )
}

export default ProductCart