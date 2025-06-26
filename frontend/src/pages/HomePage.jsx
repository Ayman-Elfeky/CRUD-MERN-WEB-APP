import { useProductStore } from '@/store/product';
import { Container, VStack, Text, SimpleGrid, Image, Box, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router';

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    if (!products) {
        console.log("Not Found")
    } else {
        console.log("found")
        console.log(products);
    }

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize="30px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    Current Products 🚀
                </Text>
                {products && products.length > 0 ?
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3
                        }}
                        spacing={10}
                        w={'full'}
                    >
                        {products.map((product, index) => {
                            return (
                                <Box key={index}
                                    bg="white"
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
                                    <Text fontSize="xl" fontWeight="bold" color="green.500">
                                        ${product.price}
                                    </Text>
                                </Box>
                            )
                        })}
                    </SimpleGrid>
                    :
                    <Text fontSize={'lg'} fontWeight={'bold'} color={'gray.500'} textAlign={'center'} >
                        No Products Found 😢 {" "}
                        <Link to={'/create'}>
                            <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>}
            </VStack>
        </Container>
    );
};

export default HomePage;
