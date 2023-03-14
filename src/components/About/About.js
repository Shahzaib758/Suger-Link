import { Box, Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import Couple from '../../assets/images/couple.png'
import WhiteLine from '../../assets/images/whiteLine.png'
import RedLine from '../../assets/images/redLine.png'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const navigate = useNavigate();
    return (
        <Stack
            py={24}
            bgColor={'#000'}
        >
            <Container maxW={'6xl'}>
                <Stack
                >
                    <Stack
                        direction={{base: 'column-reverse', md: 'row'}}
                        alignItems={'center'}
                    >
                        <Box>
                            <Image
                                src={Couple}
                                w={'80%'}
                            />
                        </Box>
                        <Box
                            color={'#fff'}
                        >
                            <Text>About Us</Text>
                            <Heading fontSize={42} pt={4} pb={12} position={'relative'} color={'primaryRed.100'}>Sugar Link
                                <Image src={WhiteLine} position={'absolute'} w={'250px'} bottom={'10px'} right={'70px'} />
                            </Heading>
                            <Text pb={4}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                            <Text pb={8}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                            <Button
                                w={'150px'}
                                onClick={()=>navigate('/profiles')}
                                h={'50px'}
                                border={'2px solid'}
                                borderRadius={8}
                                backgroundColor={'primaryRed.100'}
                                color={'#fff'}
                                _hover={{
                                    bgColor: 'primaryRed.100'
                                }}
                            >Seeker</Button>
                        </Box>
                    </Stack>
                    <Box pt={12}>
                        <Image src={RedLine} marginX={'auto'} />
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        pt={8}
                    >
                        <iframe width="80%" height="300px" src="https://www.youtube.com/embed/0yAlLomiSGU" title="Couple having fun at the beach" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Box>
                </Stack>
            </Container>
        </Stack>
    )
}
