import ProductCart from '@/components/ProductCart';
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
                        {products.map((product) => {
                            return (
                                <ProductCart key={product._id} product={product}/>
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
