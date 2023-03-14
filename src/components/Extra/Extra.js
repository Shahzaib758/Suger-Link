import { Box, Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Boy from '../../assets/images/boy.png'
import Girl from '../../assets/images/girl.png'

export default function Extra() {
    const navigate = useNavigate();
    return (
        <Stack
            py={8}
            position={'relative'}
            bgColor={'primaryRed.100'}
        >
            <Container maxW={'8xl'}>
                <Stack
                >
                    <Stack
                        direction={'row'}
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            textAlign={'center'}
                            w={'100%'}
                        >
                            <Box
                                color={'#fff'}
                            >
                                <Heading fontSize={42} pb={4}>Sugar Link</Heading>
                                <Text pb={8}>It is a long established fact that a reader will be distracted <br /> by the readable content of a page when looking at its layout.</Text>
                                <Button
                                    w={'150px'}
                                    onClick={() => navigate('/profiles')}
                                    h={'50px'}
                                    border={'2px solid'}
                                    borderRadius={8}
                                    backgroundColor={'primaryRed.100'}
                                    color={'#fff'}
                                    _hover={{
                                        bgColor: 'primaryRed.100'
                                    }}
                                >Create Profile</Button>
                            </Box>
                        </Box>
                        <Box></Box>

                    </Stack>
                    <Box>

                    </Box>
                </Stack>

                <Image display={{ base: 'none', lg: 'initial' }} src={Boy} w={'280px'} position={'absolute'} top={"-105px"} left={0} />
                <Image display={{ base: 'none', lg: 'initial' }} src={Girl} w={'280px'} position={'absolute'} top={'-135px'} right={0} />
            </Container>
        </Stack>
    )
}
