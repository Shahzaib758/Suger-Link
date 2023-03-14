import { Box, Button, FormControl, FormLabel, Input, Stack, Icon, Select, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { POST } from '../../utilities/ApiProvider.js'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { localUrl } from '../../utilities/config.js';
import Autocomplete from "react-google-autocomplete";

export default function Register({ setShowLogin }) {

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConPasswordVisible, setIsConPasswordVisible] = useState(false);
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confPass: '',
        phone: '',
        gender: '',
        location: '',
        profession: '',
        dateOfBirth: '',
    });

    const register = async () => {
        setIsLoading(true);
        let data = registerData;
        delete registerData?.confPass;
        console.log(data);
        let registerResponse = await POST(`${localUrl}/register`, data);
        console.log(registerResponse);
        toast({
            description: registerResponse?.message,
            status: registerResponse?.status ? 'success' : 'error',
            position: 'bottom-left',
            isClosable: true
        })
        if (registerResponse) {
            setRegisterData({
                username: '',
                email: '',
                password: '',
                confPass: '',
                phone: '',
                gender: '',
                location: '',
                profession: '',
                dateOfBirth: '',
            });
            setShowLogin(true);
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
                <FormControl
                    display={'flex'}
                    alignContent={'flex-end'}
                    justifyContent={'space-between'}
                    flexWrap={'wrap'}
                >
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter username:
                        </FormLabel>
                        <Input
                            py={6}
                            type='text'
                            value={registerData.username}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    username: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter email:
                        </FormLabel>
                        <Input
                            py={6}
                            type='email'
                            value={registerData.email}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    email: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box
                        w={'48%'}
                        position={'relative'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter password:
                        </FormLabel>
                        <Input
                            py={6}
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={registerData.password}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    password: e.target.value
                                })
                            }}
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
                        w={'48%'}
                        pb={6}
                        position={'relative'}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Confirm password:
                        </FormLabel>
                        <Input
                            py={6}
                            type={isConPasswordVisible ? 'text' : 'password'}
                            value={registerData.confPass}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    confPass: e.target.value
                                })
                            }}
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
                            onClick={() => setIsConPasswordVisible(!isConPasswordVisible)}
                        >
                            <Icon as={isConPasswordVisible ? AiOutlineEye : AiOutlineEyeInvisible} color={'#fff'} fontSize={24} />
                        </Button>
                    </Box>
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter phone:
                        </FormLabel>
                        <Input
                            py={6}
                            type='phone'
                            value={registerData.phone}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    phone: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Select Gender:
                        </FormLabel>
                        <Select
                            className='select'
                            height={'50px'}
                            value={registerData.gender}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    gender: e.target.value
                                })
                            }}
                        >
                            <option style={{ display: 'none' }}>Gender</option>
                            <option value={'Male'}>Male</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Others'}>Others</option>
                        </Select>
                    </Box>
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter profession:
                        </FormLabel>
                        <Input
                            py={6}
                            type='text'
                            value={registerData.profession}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    profession: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter city, state:
                        </FormLabel>
                        <Input
                            py={6}
                            type='text'
                            value={registerData.location}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    location: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box
                        w={'48%'}
                        pb={6}
                    >
                        <FormLabel
                            fontSize={14}
                        >
                            Enter birthday:
                        </FormLabel>
                        <Input
                            py={6}
                            type='date'
                            value={registerData.dateOfBirth}
                            onChange={(e) => {
                                setRegisterData({
                                    ...registerData,
                                    dateOfBirth: e.target.value
                                })
                            }}
                        />
                    </Box>
                    <Box
                        w={'48%'}
                    >
                        <Button
                            marginBottom={"-80px"}
                            isLoading={isLoading}
                            w={'100%'}
                            border={'2px solid #fff'}
                            onClick={() => register()}
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
