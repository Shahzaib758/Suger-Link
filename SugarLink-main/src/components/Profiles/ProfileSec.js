import { Container, Spinner, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Boy2 from '../../assets/images/boy2.png'
import { GET } from '../../utilities/ApiProvider'
import { localUrl } from '../../utilities/config'
import ProfileBox from './ProfileBox'

export default function ProfileSec({ searchValue }) {

    const user = useSelector(state => state?.value);
    const [isLoading, setIsLoading] = useState(false);

    const [allProfile, setAllProfile] = useState([]);

    const getProfiles = async () => {
        setIsLoading(true);
        if (user?.token) {
            let profileRes = await GET(`${localUrl}/users/suggested?username=${searchValue}`, { authorization: `Bearer ${user?.token}` });
            setAllProfile(profileRes?.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getProfiles();
    }, [searchValue, user])


    return (
        <Stack
            py={24}
            bgColor={'#000'}
        >
            <Container maxW={'6xl'}>
                <Stack
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        spacing={0}
                        gap={3}
                    >
                        {
                            isLoading ?
                                <Spinner color='#fff' />
                                :
                                allProfile?.length > 0 ?
                                    allProfile?.map((v, i) => <ProfileBox {...v} key={i} />)
                                    :
                                    <Text color={'#fff'}>No Users Found!</Text>
                        }
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}
