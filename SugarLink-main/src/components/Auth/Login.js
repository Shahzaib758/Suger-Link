import { Box, Button, FormControl, FormLabel, Input, Stack, Icon, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, updateName } from '../../reducers/useReducers.js';
import { POST } from '../../utilities/ApiProvider';
import { localUrl } from '../../utilities/config';

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loginData, setloginData] = useState({
        email: '',
        password: '',
    });

    const login = async () => {
        setIsLoading(true);

        let loginResponse = await POST(`${localUrl}/login`, loginData);
        localStorage.setItem('user', loginResponse?.data)
        console.log(loginResponse);
        toast({
            description: loginResponse?.message,
            status: loginResponse?.status ? 'success' : 'error',
            position: 'bottom-left',
            isClosable: true
        });
        if (loginResponse?.status) {
            let data = loginResponse?.data;
            dispatch(loadUser(data))
            localStorage.setItem('user', JSON.stringify(loginResponse?.data))
            setloginData({
                email: '',
                password: ''
            });
            navigate('/');
        }
        setIsLoading(false);
    }

    return (
        <Stack
            borderRadius={8}
            border={'2px solid'}
            borderColor={'primaryRed.100'}
            padding={4}
        >
            <Stack>
                <FormControl>
                    <Box
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter email:
                        </FormLabel>
                        <Input
                            py={6}
                            type='text'
                            value={loginData?.email}
                            onChange={(e) => setloginData({
                                ...loginData,
                                email: e.target.value
                            })}
                        />
                    </Box>
                    <Box
                        bg={6}
                        position={'relative'}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter password:
                        </FormLabel>
                        <Input
                            py={6}
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={loginData?.password}
                            onChange={(e) => setloginData({
                                ...loginData,
                                password: e.target.value
                            })}
                        />
                        <Button
                            position={'absolute'}
                            top={'34px'}
                            right={0}
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
                            zIndex={2}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Icon as={isPasswordVisible ? AiOutlineEye : AiOutlineEyeInvisible} color={'#fff'} fontSize={24} />
                        </Button>
                    </Box>
                    <Box
                        pt={8}
                        pb={4}
                    >
                        <Button
                            isLoading={isLoading}
                            w={'100%'}
                            border={'2px solid #fff'}
                            onClick={() => login()}
                            borderRadius={8}
                            py={6}
                            backgroundColor={'primaryRed.100'}
                            color={'#fff'}
                            _hover={{
                                bgColor: 'primaryRed.100'
                            }}>
                            Proceed
                        </Button>
                    </Box>
                </FormControl>
            </Stack>
        </Stack>
    )
}
