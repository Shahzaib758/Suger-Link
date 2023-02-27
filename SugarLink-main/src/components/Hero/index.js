import { Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Bg1 from '../../assets/images/bg1.png'
import arrowDown from '../../assets/images/arrowDown.png'
import Facebook from '../../assets/images/facebook.png'
import Twitter from '../../assets/images/twitter.png'
import Insta from '../../assets/images/insta.png'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
    const navigate = useNavigate();
    return (
        <Stack
            height={'100vh'}
            display={'flex'}
            w={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            bgImage={Bg1}
            bgSize={'cover'}
            bgPos={'center'}
            bgRepeat={'no-repeat'}
            bgAttachment={'fixed'}
            position={'relative'}
        >
            <Container maxW={'6xl'}>
                <Stack
                    textAlign={'center'}
                >
                    <Box
                        display={'flex'}
                        gap={4}
                        justifyContent={'center'}
                    >
                        <Button
                            w={'150px'}
                            h={'50px'}
                            border={'2px solid'}
                            borderRadius={8}
                            backgroundColor={'primaryRed.100'}
                            onClick={() => navigate('/profiles')}
                            color={'#fff'}
                            _hover={{
                                bgColor: 'primaryRed.100'
                            }}
                        >Seeker</Button>
                        <Button
                            w={'150px'}
                            onClick={() => navigate('/profiles')}
                            h={'50px'}
                            border={'2px solid'}
                            borderColor={'primaryRed.100'}
                            borderRadius={8}
                            backgroundColor={'#fff'}
                            color={'primaryRed.100'}
                            _hover={{
                                bgColor: '#fff'
                            }}>Create Profile</Button>
                    </Box>
                    <Text pt={4} color={'#fff'}>Lorem Ipsum dolor sit is a dummy text to fill up some space. Many people <br /> use it to make a better UX for a website.</Text>
                </Stack>
            </Container>
            <Image
                src={arrowDown}
                alt="arrow"
                position={'absolute'}
                bottom={'20px'}
                w={'80px'}
            />
            <Box
                position={'absolute'}
                top={{ base: '80%', md: '50%' }}
                left={'60px'}
                transform={'translate(0%, -50%)'}

            >
                <Box marginBottom={'15px !important'}><a href="#"><Image w={'15px'} src={Facebook} /></a></Box>
                <Box marginBottom={'15px !important'}><a href="#"><Image w={'20px'} src={Twitter} /></a></Box>
                <Box marginBottom={'15px !important'}><a href="#"><Image w={'20px'} src={Insta} /></a></Box>
            </Box>
        </Stack>
    )
}
