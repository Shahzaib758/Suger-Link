import { Box, Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import RedLine from '../../assets/images/redLine.png'
import Couple from '../../assets/images/couple.png'
import { useNavigate } from 'react-router-dom'

export default function Story() {
    const navigate = useNavigate()
    return (
        <Stack
            pt={24}
            pb={36}
            bgColor={'#000'}
        >
            <Container maxW={'6xl'}>
                <Stack
                >
                    <Box
                        display={'flex'}
                        justifyContent={"center"}
                    >
                        <Image src={RedLine} width={'250px'} marginX={'auto'} />
                    </Box>
                    <Stack
                        direction={{base: 'column', md: 'row'}}
                        alignItems={'center'}
                    >
                        <Box
                            color={'#fff'}
                        >
                            <Text>Our Story</Text>
                            <Heading fontSize={42} pt={4} pb={12} position={'relative'} color={'primaryRed.100'}>Sugar Link Story</Heading>
                            <Text pb={6}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                            <Text pb={12}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                            <Button
                                w={'150px'}
                                h={'50px'}
                                border={'2px solid'}
                                borderRadius={8}
                                backgroundColor={'primaryRed.100'}
                                color={'#fff'}
                                _hover={{
                                    bgColor: 'primaryRed.100'
                                }}
                                onClick={()=>navigate('/profiles')}
                            >Create Profile</Button>
                        </Box>
                        <Box>
                            <Image w={'80%'} marginLeft={'auto'} src={Couple} />
                        </Box>

                    </Stack>
                    <Box>

                    </Box>
                </Stack>
            </Container>
        </Stack>
    )
}
