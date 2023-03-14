import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

export default function Authentication() {

    const navigate = useNavigate();
    const user = useSelector(state => state?.value);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('user') || user) {
            navigate('/');
        }
    }, [])


    return (
        <Stack
            pt={32}
            // height={'100vh'}
            bgColor={'primaryBlack.100'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Container
                maxW={'8xl'}
            >
                <Stack
                    maxW={{ base: '95%', lg: '55%' }}
                    marginX={'auto'}
                    color={'#fff'}
                >
                    <Heading
                        color={'primaryRed.100'}
                        textAlign={'center'}
                        pb={2}
                        fontSize={48}
                    >
                        {
                            showLogin ?
                                `Login`
                                :
                                `Register`
                        }
                    </Heading>
                    <Text
                        color={'#fff'}
                        textAlign={'center'}
                        pb={6}
                        fontSize={13}
                    >
                        Lorem Ipsum dolor sit is a dummy text to fill up some space used in future to add useful content.
                    </Text>
                    {
                        showLogin ?
                            <Stack >
                                <Login />
                            </Stack>
                            :
                            <Stack>
                                <Register setShowLogin={setShowLogin} />
                            </Stack>
                    }
                    {
                        showLogin ?
                            <Text
                                color={'#fff'}
                                textAlign={'center'}
                                pb={6}
                                fontSize={13}
                            >
                                Dont't have an account?
                                <Button
                                    onClick={() => setShowLogin(false)}
                                    fontSize={13}
                                    px={1}
                                    color={'primaryRed.100'}
                                    bgColor={'transparent'}
                                    _hover={{
                                        bgColor: 'transparent'
                                    }}
                                    _active={{
                                        bgColor: 'transparent'
                                    }}
                                    _focusVisible={{
                                        bgColor: 'transparent'
                                    }}
                                >
                                    Create Account
                                </Button>
                            </Text>
                            :
                            <Text
                                color={'#fff'}
                                textAlign={'center'}
                                pb={6}
                                fontSize={13}
                            >
                                Already have an account?
                                <Button
                                    onClick={() => setShowLogin(true)}
                                    fontSize={13}
                                    px={1}
                                    color={'primaryRed.100'}
                                    bgColor={'transparent'}
                                    _hover={{
                                        bgColor: 'transparent'
                                    }}
                                    _active={{
                                        bgColor: 'transparent'
                                    }}
                                    _focusVisible={{
                                        bgColor: 'transparent'
                                    }}
                                >
                                    Login Account
                                </Button>
                            </Text>
                    }
                </Stack>
            </Container>
        </Stack>
    )
}
