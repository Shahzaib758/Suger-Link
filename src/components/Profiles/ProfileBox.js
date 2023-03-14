import { Box, Button, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { devUrl } from '../../utilities/config';

export default function ProfileBox({ profile, username, profession, key, _id }) {
    const navigate = useNavigate();
    return (
        <Box
            position={'relative'}
            w={{ base: '100%', md: '48%', lg: '24%' }}
            bgColor={'#fff'}
            borderRadius={12}
            key={key}
            py={8}
            mb={'8 !important'}
            overflow={'hidden'}
        >
            <Box
                position={'relative'}
                zIndex={1}
                bgColor={'#fff'}
            >
                <Box
                    pb={8}
                >
                    <Image src={`${devUrl}/${profile}`} w={'95px'} marginX={'auto'} />
                </Box>
                <Text px={5} fontWeight={'bold'} fontSize={30} textAlign={'center'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>{username}</Text>
                <Text px={5} pb={4} textAlign={'center'} fontWeight={'bold'} fontSize={'20'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>{`Profession: `}<Text fontSize={'17'} as={'span'} fontWeight={'medium'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>{profession}</Text></Text>
                <Box
                    px={5}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {/* <Text fontWeight={'bold'} fontSize={17} color={onlineStatus === 'online' ? 'green.500' : 'primaryRed.100'}>{onlineStatus}</Text> */}
                    <Button
                        border={'2px solid #fff'}
                        borderRadius={8}
                        backgroundColor={'primaryRed.100'}
                        color={'#fff'}
                        _hover={{
                            bgColor: 'primaryRed.100'
                        }}
                        onClick={() => navigate(`/profile/${_id}`)}
                    >View</Button>
                </Box>
            </Box>
            <Box
                zIndex={0}
                w={'100%'}
                left={0}
                bottom={'-15px'}
                position={'absolute'}
                p={4}
                bgColor={'primaryRed.100'}
            ></Box>
        </Box>
    )
}
