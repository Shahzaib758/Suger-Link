import { Box, Container, Heading, Stack, Text, Icon } from '@chakra-ui/react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <Stack
            bgColor={'#000'}
        >

            <Container maxW={'6xl'}>
                <Stack>
                    <Stack
                        py={12}
                        direction={'row'}
                        justifyContent={'space-between'}
                        spacing={0}
                        color={'#fff'}
                        flexWrap={'wrap'}
                    >
                        <Box
                            mb={'50px !important'}
                            w={{base: '100%', md: '33%'}}
                        >
                            <Heading fontSize={28} pb={6}>Sugar Link</Heading>
                            <Text fontSize={14} pb={4}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                            <a href='#/'><Icon as={FaFacebookF} mr={'15px'} /></a>
                            <a href='#/'><Icon as={FaTwitter}  mr={'15px'} /></a>
                            <a href='#/'><Icon as={FaInstagram}  mr={'15px'} /></a>
                        </Box>
                        <Box
                            mb={'50px !important'}
                            w={{base: '100%', md: '33%'}}
                            px={{base: 0, md: 20}}
                        >
                            <Box mb={'15px !important'}><Link to="/">Home</Link></Box>
                            <Box mb={'15px !important'}><Link to="/about">About Us</Link></Box>
                            <Box mb={'15px !important'}><Link to="/profles">Profiles</Link></Box>
                            <Box mb={'15px !important'}><Link to="/how-it-works">How it works</Link></Box>
                        </Box>
                        <Box
                            mb={'50px !important'}
                            w={{base: '100%', md: '33%'}}
                        >
                            <Box mb={'15px !important'}>Address: abc lorem ipsum, ny, 32452</Box>
                            <Box>phone: +1 123123123</Box>
                        </Box>
                    </Stack>

                </Stack>
            </Container>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                color={'#fff'}
                py={3}
                bgColor={'primaryRed.100'}
            >
                <Container maxW={'6xl'}>
                    <Stack
                        direction={{base: 'column', md: 'row'}}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Box>Copyright &copy; Sugar Link. All Rights Reserved.</Box>
                        <Box>Managed By <a href='https://vortechdigitals.com/' target={'_blank'}>Vortech Digitals</a></Box>
                    </Stack>
                </Container>
            </Stack>
        </Stack>
    )
}
