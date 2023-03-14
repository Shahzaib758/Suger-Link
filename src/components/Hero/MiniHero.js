import { Box, Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Bg1 from '../../assets/images/bg1.png'
import arrowDown from '../../assets/images/arrowDown.png'
import Facebook from '../../assets/images/facebook.png'
import Twitter from '../../assets/images/twitter.png'
import Insta from '../../assets/images/insta.png'
import { useNavigate } from 'react-router-dom'

export default function MiniHero({ heading, noButtons }) {
    const navigate = useNavigate();
    return (
        <Stack
            height={'60vh'}
            display={'flex'}
            w={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            // bgImage={Bg1}
            // bgSize={'cover'}
            // bgPos={'center'}
            // bgRepeat={'no-repeat'}
            // bgAttachment={'fixed'}
            // position={'relative'}
            bgColor={'primaryRed.100'}
        >
            <Container maxW={'6xl'}>
                <Stack
                    textAlign={'center'}
                >
                    <Heading pb={0} color={'#fff'} fontWeight={'bold'} fontSize={62}>{heading}</Heading>
                    <Box
                        display={'flex'}
                        gap={4}
                        justifyContent={'center'}
                    >
                        {
                            noButtons === true &&
                            <> <Button
                                w={'150px'}
                                h={'50px'}
                                border={'2px solid'}
                                borderRadius={8}
                                backgroundColor={'primaryRed.100'}
                                color={'#fff'}
                                _hover={{
                                    bgColor: 'primaryRed.100'
                                }}
                                onClick={() => navigate('/profiles')}
                            >Seeker</Button>
                                <Button
                                    w={'150px'}
                                    h={'50px'}
                                    border={'2px solid'}
                                    borderColor={'primaryRed.100'}
                                    borderRadius={8}
                                    backgroundColor={'#fff'}
                                    color={'primaryRed.100'}
                                    onClick={() => navigate('/profiles')}
                                    _hover={{
                                        bgColor: '#fff'
                                    }}>Create Profile</Button></>
                        }

                    </Box>
                </Stack>
            </Container>
        </Stack>
    )
}
