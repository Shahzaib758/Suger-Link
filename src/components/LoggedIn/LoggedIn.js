import { Avatar, Menu, MenuButton, MenuItem, MenuList, Stack, Text, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { devUrl } from '../../utilities/config';
import { logout } from '../../reducers/useReducers';

export default function LoggedIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.value);

    // useEffect(() => {
    //     (async () => {
    //         let loggedInUserData = await GET(`/api/users/getUserDetail`, null, { headers: { Authorization: `Bearer ${user?.access_token}` } })
    //         console.log(loggedInUserData);
    //     })()
    // }, [user])


    return (
        <Stack direction={'row'} alignItems={'center'} gap={{ base: 1, lg: 2, 'xl': 5 }} py={4}>
            <Text color={'#fff'} textTransform={'capitalize'} fontWeight={500} fontSize={{ base: 13, md: 14 }}>{user?.username ?? 'John Doe'}</Text>
            <Menu>
                <MenuButton as={Button} backgroundColor={'transparent'} padding={0} _hover={{ backgroundColor: 'transparent' }} _active={{ backgroundColor: 'transparent' }}>
                    <Avatar size={{ base: 'sm', md: 'md' }} name={user?.username ?? 'John Doe'} src={`${devUrl}${user?.profile}`} border={'2px solid #f79e22'} bg={'#f79e22'} color={'#fff'} />
                </MenuButton>
                <MenuList fontSize={14}>
                    <MenuItem as={ReactLink} to={`/profile/${user?.id}`}>My Profile</MenuItem>
                    <MenuItem onClick={() => {
                        console.log('logout');
                        dispatch(logout())
                        navigate('/');
                    }}>Logout</MenuItem>
                </MenuList>
            </Menu>
            {/* <Menu>
                <MenuButton textAlign={'center'} as={Button} backgroundColor={'transparent'} padding={0} _hover={{ backgroundColor: 'transparent' }} _active={{ backgroundColor: 'transparent' }}>
                    <FaBell size={24} color={'#666e82'} />
                </MenuButton>
                <MenuList fontSize={14}>
                    <MenuItem><FaCircle size={6} color={'#f79e22'} /><Text ml={2}>Dummy Notification to fill up some space.</Text></MenuItem>
                    <MenuItem><FaCircle size={6} color={'#f79e22'} /><Text ml={2}>Dummy Notification to fill up some space.</Text></MenuItem>
                </MenuList>
            </Menu> */}
        </Stack>
    )
}
