import { Box, Heading, Image, Stack, Text, Icon, Button, Spinner, Input, useToast, Textarea, Select, Avatar } from "@chakra-ui/react";
import SingleBoy from '../assets/images/singleBoy.jpeg'
import { MdLocationOn } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET, POST, PUT } from "../utilities/ApiProvider";
import { chatLocalUrl, devUrl, localUrl } from "../utilities/config";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../reducers/useReducers";
import { AiOutlineCheck } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
// import io from "socket.io-client";
// var socket, selectedChatCompare;

export default function SingleProfile() {

    const navigate = useNavigate();
    const params = useParams();
    const toast = useToast();
    const picRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state?.value)
    // STATE TO CHANGE BETWEEN DATA AND CHAT BOX
    const [currentTab, setCurrentTab] = useState('Contact');
    // STATE TO ENABLE EDIT MODE
    const [isEditMode, setIsEditMode] = useState(false);
    // SEND REQUEST API LOADER
    const [isReqLoading, setIsReqLoading] = useState(false);
    // STATE TO CHECK FRIENDSHIP STATUS
    const [profileFriendshipStatus, setProfileFriendshipStatus] = useState('Link');
    // STATE TO SAVE FRIENDS LIST
    const [viewFriends, setViewFriends] = useState(true);
    // STATE TO SAVE PENDING REQUESTS
    const [pendingReqs, setPendingReqs] = useState([]);
    // STATE TO SAVE FRIENDS
    const [friendList, setFriendList] = useState([]);
    // STATE TO SAVE SOCKET STATUS & SAVE CHAT TYPED
    const [socketConnected, setSocketConnected] = useState('');
    const [newMessage, setNewMessage] = useState();
    const [messages, setMessages] = useState([]);

    // STATE TO SAVE PROFILE DATA
    const [profileData, setProfileData] = useState({
        image: '',
        phone: "",
        location: '',
        email: '',
        site: '',
        birthday: '',
        gender: '',
        bio: ''
    })

    // GET PROFILE DATA
    const getProfileData = async () => {
        // console.log(user.token);
        let profileRes = await GET(`${localUrl}/${params?.id}`, { authorization: `Bearer ${user?.token}` });
        // console.log(profileRes);
        setProfileData(profileRes?.data)
        let pendRes = await GET(`${localUrl}/pendingRequest/list`, { authorization: `Bearer ${user?.token}` });
        console.log(pendRes?.data, 'pedning reqs');
        setPendingReqs(pendRes?.data);
        let friendsRes = await GET(`${localUrl}/friends/list`, { authorization: `Bearer ${user?.token}` });
        // console.log(friendsRes);
        setFriendList(friendsRes?.data);
    }

    useEffect(() => {
        getProfileData();
        // fetchAllMessages();
    }, [params])

    useEffect(() => {
        console.log(user);
        if (user) {
            getProfileData();
        }
    }, [user])


    // UPDATE PROFILE PIC
    const updatePic = async (file) => {
        let data = new FormData();
        data.append("profilePicture", file);
        let picRes = await PUT(`${localUrl}/updateProfilePicture`, data, { authorization: `Bearer ${user?.token}` })
        // console.log(picRes);
        toast({
            description: picRes?.message,
            status: picRes?.status ? 'success' : 'error',
            position: 'bottom-left',
            isClosable: true
        })
        if (picRes?.status) {
            getProfileData();
        }
    }

    // UPDATE USER DATA
    const updateData = async () => {
        let updateRes = await PUT(`${localUrl}/updateUser`, profileData, { authorization: `Bearer ${user?.token}` });
        // console.log(updateRes);
        toast({
            description: updateRes?.message,
            status: updateRes?.status ? 'success' : 'error',
            position: 'bottom-left',
            isClosable: true
        });
        setIsEditMode(false);
    }

    // TO SEND REQUEST
    const requestEvent = async () => {
        setIsReqLoading(true);
        let reqRes = await PUT(`${localUrl}/send/request`, { id: params?.id }, { authorization: `Bearer ${user?.token}` });
        // console.log(reqRes);
        dispatch(loadUser({
            ...user,
            ...reqRes?.data
        }));
        setIsReqLoading(false);
    }

    // TO REMOVE FRIEND
    const removeFriends = async () => {
        setIsReqLoading(true);
        let reqRes = await PUT(`${localUrl}/send/unfriend`, { id: params?.id }, { authorization: `Bearer ${user?.token}` });
        // console.log(reqRes);
        dispatch(loadUser({
            ...user,
            ...reqRes?.data
        }));
        setIsReqLoading(false);
    }

    // TO REJECT / ACCEPT REQUEST
    const updateReqRes = async (id, status) => {
        // console.log({
        //     id,
        //     status
        // });
        let reqResUpdateRes = await PUT(`${localUrl}/respone/request`, { id, status }, { authorization: `Bearer ${user?.token}` })
        // console.log(reqResUpdateRes);
        if (reqResUpdateRes?.status) {
            dispatch(loadUser({
                ...user,
                ...reqResUpdateRes?.data
            }));
        }
        getProfileData();
    }

    const inputStyle = {
        borderColor: '#000'
    }

    // TO FIND FRIEND / PENDING
    useEffect(() => {
        let weFoundIt = false;
        if (user?.friends?.length > 0) {
            if (user?.friends.includes(params?.id)) {
                weFoundIt = true;
                setProfileFriendshipStatus('Friends');
            }
        }
        if (user?.sendRequests?.length > 0 && !weFoundIt) {
            if (user?.sendRequests.includes(params?.id)) {
                setProfileFriendshipStatus('Pending');
            }
        }

    }, [user, friendList, pendingReqs])

    // TO SEND MESSAGE
    // const sendMessage = async (e) => {
    //     console.log('new message is: ', newMessage);
    //     console.log('chatId: ', params?.id);

    //     try {
    //         let chatSendRes = await POST(`${chatLocalUrl}/message`,
    //             {
    //                 chatId: params?.id,
    //                 content: newMessage,
    //             },
    //             { authorization: `Bearer ${user?.token}` }
    //         );
    //         console.log(chatSendRes);
    //         setNewMessage("");
    //         socket.emit("new message", chatSendRes?.data);
    //         setMessages([...messages, chatSendRes?.data]);
    //     } catch (err) {
    //         toast.error(err);
    //         return;
    //     }
    // };

    // FETCH ALL MESSAGES

    // const fetchAllMessages = async () => {
    //     try {
    //         //   setLoading(true);
    //         const allChatRes = await GET(`${chatLocalUrl}/message/${params.id}`, { authorization: `Bearer ${user?.token}` });
    //         console.log(allChatRes);
    //         setMessages(allChatRes?.data);
    //         // setLoading(false);
    //         socket.emit("join chat", params.id);
    //     } catch (err) {
    //         console.log(err);
    //         // setLoading(false);
    //         return;
    //     }
    // };

    // SOCKET CONNECTION
    // useEffect(() => {
    //     socket = io(devUrl, {
    //         cors: {
    //             origin: devUrl,
    //             credentials: true
    //         }, transports: ['websocket']
    //     });
    //     socket.emit("setup", user);
    //     socket.on("connected", () => setSocketConnected(true));
    // }, []);

    // useEffect(() => {
    //     socket.on("message received", (newMessageReceived) => {
    //         setMessages([...messages, newMessageReceived]);
    //     });
    // });

    return (
        <Stack
            pt={28}
            pb={4}
        >
            <Stack
                w={'80%'}
                marginX={'auto'}
            >
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    alignItems={'center'}
                    gap={12}
                    justifyContent={'flex-start'}
                >
                    <Box
                        w={'15%'}
                        position={'relative'}
                        borderRadius={'12px'}
                        overflow={'hidden'}
                    >
                        <Image src={`${devUrl}${profileData?.profile}`} w={'250px'} h={'250px'} objectFit={'contain'} />
                        {
                            params?.id === user?.id &&
                            <Box
                                position={'absolute'}
                                top={0}
                                left={0}
                                w={'100%'}
                                h={'100%'}
                                backgroundColor={'#000000b5'}
                                display={'flex'}
                                alignItems={"center"}
                                justifyContent={'center'}
                                opacity={0}
                                transition={'0.4s ease all'}
                                _hover={{
                                    opacity: 1
                                }}
                            >
                                <Button bgColor={'primaryRed.100'} color={'#fff'} onClick={() => { picRef?.current?.click() }}>Change</Button>
                                <Input onChange={e => updatePic(e.target.files[0])} ref={picRef} type={'file'} style={{ display: 'none' }} />
                            </Box>
                        }
                    </Box>
                    <Box w={'40%'}>
                        <Box pb={4}>
                            <Box
                                display={'flex'}
                                alignItems={{ base: 'flex-start', md: 'flex-end' }}
                                flexDir={{ base: 'column', md: 'row' }}
                                gap={{ base: 2, md: 12 }}
                                pb={{ base: 4, md: 1 }}
                            >
                                {
                                    isEditMode ?
                                        <>
                                            <Input sx={inputStyle} value={profileData?.username} onChange={(e) => {
                                                setProfileData({
                                                    ...profileData,
                                                    username: e.target.value
                                                })
                                            }} />
                                            <Input sx={inputStyle} value={profileData?.location} onChange={(e) => {
                                                setProfileData({
                                                    ...profileData,
                                                    location: e.target.value
                                                })
                                            }} />
                                        </>
                                        :
                                        <>
                                            <Heading textTransform={'capitalize'} fontSize={30}>{profileData?.username ?? <Spinner />}</Heading>
                                            <Text><Icon as={MdLocationOn} />{profileData?.location ?? <Spinner />}</Text>
                                        </>
                                }
                            </Box>
                            {
                                isEditMode ?
                                    <Input sx={inputStyle} value={profileData?.profession} onChange={(e) => {
                                        setProfileData({
                                            ...profileData,
                                            profession: e.target.value
                                        })
                                    }} />
                                    :
                                    <Text fontWeight={'bold'} color={'primaryRed.100'}>{profileData?.profession ?? <Spinner />}</Text>
                            }
                        </Box>
                        <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={14}>Rankings</Text>
                        <Box display={'flex'} alignItems={'flex-end'} pb={4}>
                            <Heading>8.6 <Icon as={AiFillStar} color={'blue.400'} /><Icon as={AiFillStar} color={'blue.400'} /><Icon as={AiFillStar} color={'blue.400'} /><Icon as={AiFillStar} color={'blue.400'} />   </Heading>
                        </Box>
                        {
                            params?.id !== user?.id ?
                                <Box
                                    display={'flex'}
                                    gap={4}
                                >
                                    <Button
                                        disabled={profileFriendshipStatus == 'Pending' ? true : false}
                                        isLoading={isReqLoading}
                                        border={'2px solid'}
                                        borderColor={'primaryRed.100'}
                                        onClick={() => {
                                            profileFriendshipStatus === 'Link' ?
                                                requestEvent()
                                                : profileFriendshipStatus === 'Friends' ?
                                                    removeFriends()
                                                    :
                                                    console.log('pending');
                                        }}
                                        bgColor={currentTab === 'Link' ? 'primaryRed.100' : 'transparent'}
                                        w={'100px'}
                                        color={currentTab === 'Link' ? '#fff' : 'primaryRed.100'}
                                        _hover={{
                                            bgColor: 'primaryRed.100',
                                            color: '#fff'
                                        }}
                                    >{profileFriendshipStatus}</Button>
                                    {/* {
                                        profileFriendshipStatus === 'Friends' &&
                                        <Button
                                            border={'2px solid'}
                                            borderColor={'primaryRed.100'}
                                            onClick={() => setCurrentTab('Message')}
                                            bgColor={currentTab === 'Message' ? 'primaryRed.100' : 'transparent'}
                                            w={'100px'}
                                            color={currentTab === 'Message' ? '#fff' : 'primaryRed.100'}
                                            _hover={{
                                                bgColor: 'primaryRed.100',
                                                color: '#fff'
                                            }}
                                        >Message</Button>
                                    } */}
                                    <Button
                                        border={'2px solid'}
                                        borderColor={'primaryRed.100'}
                                        onClick={() => setCurrentTab('Contact')}
                                        bgColor={currentTab === 'Contact' ? 'primaryRed.100' : 'transparent'}
                                        w={'100px'}
                                        color={currentTab === 'Contact' ? '#fff' : 'primaryRed.100'}
                                        _hover={{
                                            bgColor: 'primaryRed.100',
                                            color: '#fff'
                                        }}
                                    >Contact</Button>
                                    <Button
                                        border={'2px solid'}
                                        borderColor={'primaryRed.100'}
                                        onClick={() => setCurrentTab('Report User')}
                                        bgColor={currentTab === 'Report User' ? 'primaryRed.100' : 'transparent'}
                                        w={'100px'}
                                        color={currentTab === 'Report User' ? '#fff' : 'primaryRed.100'}
                                        _hover={{
                                            bgColor: 'primaryRed.100',
                                            color: '#fff'
                                        }}
                                    >Report User</Button>
                                </Box>
                                :
                                <Box>
                                    {
                                        isEditMode ?
                                            <Button
                                                onClick={() => updateData()}
                                                border={'2px solid'}
                                                borderColor={'primaryRed.100'}
                                                bgColor={'primaryRed.100'}
                                                w={'100px'}
                                                color={'#fff'}
                                                _hover={{
                                                    bgColor: 'primaryRed.100',
                                                    color: '#fff'
                                                }}
                                            >Update</Button>
                                            :
                                            <Button
                                                onClick={() => setIsEditMode(true)}
                                                border={'2px solid'}
                                                borderColor={'primaryRed.100'}
                                                bgColor={'primaryRed.100'}
                                                w={'100px'}
                                                color={'#fff'}
                                                _hover={{
                                                    bgColor: 'primaryRed.100',
                                                    color: '#fff'
                                                }}
                                            >Edit</Button>
                                    }
                                </Box>
                        }
                    </Box>
                    {
                        params?.id === user?.id &&
                        <Box w={'30%'}>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                gap={4}
                            >
                                <Button
                                    border={'2px solid'}
                                    borderColor={'primaryRed.100'}
                                    onClick={() => setViewFriends(true)}
                                    bgColor={viewFriends ? 'primaryRed.100' : 'transparent'}
                                    w={'180px'}
                                    color={viewFriends ? '#fff' : 'primaryRed.100'}
                                    _hover={{
                                        bgColor: 'primaryRed.100',
                                        color: '#fff'
                                    }}
                                >Friends</Button>
                                <Button
                                    border={'2px solid'}
                                    borderColor={'primaryRed.100'}
                                    onClick={() => setViewFriends(false)}
                                    bgColor={!viewFriends ? 'primaryRed.100' : 'transparent'}
                                    w={'180px'}
                                    color={!viewFriends ? '#fff' : 'primaryRed.100'}
                                    _hover={{
                                        bgColor: 'primaryRed.100',
                                        color: '#fff'
                                    }}
                                >Pending Requests</Button>
                            </Box>
                            <Box border={'1px solid'} borderColor={"#1a1a1a"} borderRadius={8} p={6} mt={4} height={'200px'} overflowY={"auto"}>
                                {
                                    viewFriends ?
                                        friendList?.map((v, i) =>
                                            <Stack key={i} bgColor={'transparent'} gap={2} direction={'row'} alignItems={'center'}>
                                                <Avatar name={v?.username} src={`${devUrl}/${v?.profile}`} />
                                                <Text>{v.username}</Text>
                                                <Button onClick={() => navigate(`/profile/${v._id}`)}>View</Button>
                                            </Stack>
                                        )
                                        :
                                        pendingReqs?.map((v, i) =>
                                            <Stack key={i} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Avatar name={v?.username} src={`${devUrl}/${v?.profile}`} size={'md'} mr={1} />
                                                    <Text>{v.username}</Text>
                                                </Stack>
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Button bgColor={'green.400'} color={'#fff'} onClick={() => updateReqRes(v?._id, 1)}><Icon as={AiOutlineCheck} /></Button>
                                                    <Button bgColor={'red.600'} color={'#fff'} onClick={() => updateReqRes(v?._id, 0)}><Icon as={FaTimes} /></Button>
                                                </Stack>
                                            </Stack>
                                        )
                                }
                            </Box>
                        </Box>
                    }
                </Stack>
                {
                    profileFriendshipStatus === 'Friends' && currentTab === 'Message' ?
                        //  CHAT HERE
                        <Stack>
                            <Stack h={'50vh'} border={'1px solid #adadad'}>
                                {
                                    JSON.stringify(messages)
                                }
                            </Stack>
                            {/* <Stack><Input onChange={(e) => setNewMessage(e.target.value)} /> <Button onClick={(e) => sendMessage(e)}>Send</Button></Stack> */}
                        </Stack>
                        :
                        <Stack
                            borderTop={'1px solid #1a1a1a'}
                            pt={8}
                            marginTop={'8 !important'}
                            direction={{ base: 'column-reverse', md: 'row' }}
                            justifyContent={'space-between'}
                        >
                            <Box
                                fontWeight={'600'}
                                flex={1}
                            >
                                <Heading fontSize={24} pb={4}>Skills</Heading>
                                <Text>Branding</Text>
                                <Text>UI/UX</Text>
                                <Text>Web-Design</Text>
                                <Text>Packaging</Text>
                                <Text>Print & Editorial</Text>
                            </Box>
                            <Box
                                flex={1}
                                fontWeight={'600'}
                                marginBottom={{ base: '40px !important', md: '0' }}
                            >
                                <Heading fontSize={24} pb={4}>Contact Information</Heading>
                                <Box
                                    display={'flex'}
                                    pb={2}
                                >
                                    <Text flex={1}>Phone:</Text>
                                    <Text flex={2}>{profileData?.phone}</Text>
                                </Box>
                                {/* <Box
                            display={'flex'}
                            pb={2}
                        >
                            <Text flex={1}>Address:</Text>
                            {
                                isEditMode ?
                                    <Text flex={2}>{profileData?.location}</Text>
                                    :
                                    <Text flex={2}>{profileData?.location}</Text>
                            }
                        </Box> */}
                                <Box
                                    display={'flex'}
                                    pb={2}
                                >
                                    <Text flex={1}>Email:</Text>
                                    <Text flex={2}>{profileData?.email}</Text>
                                </Box>
                                {/* <Box
                            display={'flex'}
                            pb={2}
                        >
                            <Text flex={1}>Site:</Text>
                            <Text flex={2}>{profileData?.site ?? 'N/A'}</Text>
                        </Box> */}
                                <Box
                                    display={'flex'}
                                    pb={2}
                                >
                                    <Text flex={1}>Birthday:</Text>
                                    {
                                        isEditMode ?
                                            <Input sx={inputStyle} type={'date'} value={profileData?.dateOfBirth} onChange={(e) => {
                                                setProfileData({
                                                    ...profileData,
                                                    dateOfBirth: e.target.value
                                                })
                                            }} />
                                            :
                                            <Text flex={2}>{profileData?.dateOfBirth ?? 'N/A'}</Text>
                                    }
                                </Box>
                                <Box
                                    display={'flex'}
                                    pb={2}
                                >
                                    <Text flex={1}>Gender:</Text>
                                    {
                                        isEditMode ?
                                            <Select sx={inputStyle} value={profileData?.gender} onChange={(e) => {
                                                setProfileData({
                                                    ...profileData,
                                                    gender: e.target.value
                                                })
                                            }}>
                                                <option value={'Male'}>Male</option>
                                                <option value={'Female'}>Female</option>
                                                <option value={'Others'}>Others</option>
                                            </Select>
                                            :
                                            <Text flex={2}>{profileData?.gender}</Text>

                                    }
                                </Box>
                            </Box>
                            <Box
                                marginBottom={{ base: '40px !important', md: '0' }}
                                flex={2}
                            >
                                <Heading fontSize={24} pb={4}>Bio</Heading>
                                {
                                    isEditMode ?
                                        <Textarea maxLength={400} sx={inputStyle} type={'date'} value={profileData?.bio} onChange={(e) => {
                                            setProfileData({
                                                ...profileData,
                                                bio: e.target.value
                                            })
                                        }} ></Textarea>
                                        :
                                        <Text>{profileData?.bio ?? 'N/A'}</Text>
                                }
                            </Box>
                        </Stack>
                }
            </Stack>
        </Stack >
    );
}
