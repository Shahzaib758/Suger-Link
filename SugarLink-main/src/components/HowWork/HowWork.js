import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Heart from '../../assets/images/heart.png'

export default function HowWork() {
    return (
        <Stack
            py={12}
            bgColor={'#000'}
        >
            <Container maxW={'6xl'}>
                <Stack
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                    >
                        <Box
                            textAlign={'center'}
                        >
                            <Text fontWeight={600} color={'#fff'}>How it Works</Text>
                            <Heading color={"primaryRed.100"} fontSize={42}>Sugar Link</Heading>
                        </Box>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={24}
                        alignItems={'center'}
                        py={8}
                        color={'#fff'}
                        maxW={'70%'}
                    >
                        <Image
                            display={{ base: 'none', lg: 'initial' }}
                            src={Heart}
                            alt="sugar link"
                            w={'25%'}
                        />
                        <Box>
                            <Heading pb={4}>1- Login</Heading>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Box>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={4}
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                        color={'#fff'}
                    >
                        <Image
                            display={{ base: 'none', lg: 'initial' }}
                            alt="sugar link"
                            src={Heart}
                            w={'20%'}
                        />
                        <Box w={{ base: '100%', md: '35%' }}>

                            <Heading pb={4}>2-Create Profile</Heading>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>

                        </Box>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={4}
                        alignItems={'center'}
                        py={8}
                        color={'#fff'}
                    >
                        <Image
                            display={{ base: 'none', lg: 'initial' }}
                            alt="sugar link"
                            w={'20%'}
                            src={Heart}
                        />
                        <Box
                            w={{ base: '100%', md: '35%' }}
                        >

                            <Heading pb={4}>3- Review Profile you interested</Heading>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>

                        </Box>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={4}
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                        color={'#fff'}
                    >
                        <Image
                            display={{ base: 'none', lg: 'initial' }}
                            alt="sugar link"
                            src={Heart}
                            w={'20%'}
                        />
                        <Box w={{ base: '100%', md: '35%' }}>
                            <Heading pb={4}>4- Connect with message, phone</Heading>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}
