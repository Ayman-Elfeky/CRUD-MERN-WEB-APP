import { useState, useEffect } from 'react';
import {
    Container,
    VStack,
    Text,
    SimpleGrid,
    Box,
    Image,
    Heading,
    HStack,
    IconButton,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Badge,
    useToast
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();

    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('/api/products');
            const data = await response.json();
            
            if (data.success) {
                setProducts(data.message);
            } else {
                setError('Failed to fetch products');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            
            if (data.success) {
                setProducts(products.filter(product => product._id !== productId));
                toast({
                    title: 'Success',
                    description: 'Product deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete product',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Error connecting to server',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Container maxW={'container.xl'} py={12}>
                <VStack spacing={8}>
                    <Heading as="h1" size="xl" textAlign="center">
                        Our Products
                    </Heading>
                    <Spinner size="xl" />
                </VStack>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxW={'container.xl'} py={12}>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack spacing={8}>
                <Heading as="h1" size="xl" textAlign="center">
                    Our Products
                </Heading>

                {products.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Text fontSize="xl" color={textColor}>
                            No products found. 
                        </Text>
                        <Text fontSize="md" color={textColor} mt={2}>
                            Start by adding some products!
                        </Text>
                    </Box>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {products.map((product) => (
                            <Box
                                key={product._id}
                                bg={cardBg}
                                p={6}
                                rounded="lg"
                                shadow="lg"
                                borderWidth="1px"
                                transition="all 0.3s"
                                _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                            >
                                <VStack spacing={4} align="stretch">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        h={48}
                                        w="full"
                                        objectFit="cover"
                                        rounded="md"
                                        fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
                                    />
                                    
                                    <VStack align="start" spacing={2}>
                                        <Heading size="md" noOfLines={1}>
                                            {product.name}
                                        </Heading>
                                        
                                        <Badge colorScheme="green" fontSize="lg" p={2}>
                                            ${product.price}
                                        </Badge>
                                    </VStack>
                                    
                                    <HStack justify="space-between" pt={2}>
                                        <IconButton
                                            icon={<EditIcon />}
                                            colorScheme="blue"
                                            size="sm"
                                            aria-label="Edit product"
                                            onClick={() => {
                                                // TODO: Implement edit functionality
                                                toast({
                                                    title: 'Coming Soon',
                                                    description: 'Edit functionality will be implemented soon',
                                                    status: 'info',
                                                    duration: 2000,
                                                    isClosable: true,
                                                });
                                            }}
                                        />
                                        
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            size="sm"
                                            aria-label="Delete product"
                                            onClick={() => handleDelete(product._id)}
                                        />
                                    </HStack>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;