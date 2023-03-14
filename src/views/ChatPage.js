import React, { useEffect, useState } from "react";
import { Box, Button, Image, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import SideDrawer from "../components/Chat/SideDrawer";
import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";
// import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { GET, POST } from "../utilities/ApiProvider";
import { chatLocalUrl, devUrl, localChat, localUrl } from "../utilities/config";
// for socket.io
import io from "socket.io-client";
const ENDPOINT = "https://social-media-app-production-d7f6.up.railway.app";
var socket, selectedChatCompare;

const ChatPage = () => {
  const user = useSelector(state => state?.value);
  const [searchValue, setSearchValue] = useState('');
  const [friendsToChat, setFriendsToChat] = useState([]);
  const [room, setRoom] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await GET(`${localUrl}/search/chat?username=${searchValue}`, { authorization: `Bearer ${user?.token}` });
      // console.log(response);
      setFriendsToChat(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch()
  }, [searchValue])

  const accessChat = async (userId) => {
    try {
      const response = await POST(`${localChat}/`, { userId }, { authorization: `Bearer ${user?.token}` });
      console.log(response);
      setRoom(response);
      fetchAllMessages()
      // if (!chats.find((item) => item._id === data._id))
      //   setChats([data, ...chats]);

      // setSelectedChat(data);
      // setLoading(false);
      // setLoadingChat(false);
      // onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllMessages = async () => {
    if(!room._id) return;
    try {
      setIsChatLoading(true)
      const response = await GET(
        `${chatLocalUrl}/message/${room?._id}`,
        { authorization: `Bearer ${user?.token}` }
      );
      console.log(response, 'fetch msg res');
      setMessages(response);
      // setLoading(false);
      socket.emit("join chat", room?._id);
      setIsChatLoading(false)
    } catch (err) {
      console.log(err);
      // toast.error(err);
      // setLoading(false);
      setIsChatLoading(false)
      return;
    }
    setIsChatLoading(false)

  };

  const sendMessage = async (e) => {
    try {
      const response = await POST(
        `${chatLocalUrl}/message`,
        {
          chatId: room?._id,
          content: typedMessage,
        },
        { authorization: `Bearer ${user?.token}` }
      );
      console.log(response);
      if (response) {
        setMessages(oldArray => [...oldArray, response]);
        socket.emit("new message", response);
      }

      setTypedMessage("");

    } catch (err) {
      console.log(err);
      // toast.error(err);
      return;
    }
  };

  useEffect(() => {
    console.log('lund effect 1');
    console.log(socketConnected)
    if (!socketConnected) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => {
        console.log("ok go on")
        setSocketConnected(true)
      });
    }
  }, []);

  useEffect(() => {
    console.log('lund effect 2');
    fetchAllMessages();
  }, [room]);

  useEffect(() => {
    console.log('lund effect 3');
    if (socketConnected) {
      socket.on("message received", (newMessageReceived) => {
        console.log('new message', newMessageReceived);
        setMessages(oldArray => [...oldArray, newMessageReceived]);
      });
    }
  }, [socketConnected]);

  return (
    <div style={{ height: "100vh" }} className="chatContainer">
      {/* {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.rvh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box> */}
      {/* <ToastContainer theme="colored" /> */}
      <Stack
        direction={'row'}
        height={'100vh'}
        spacing={0}
      >
        <Box w={'450px'} bgColor={'#1a1a1a'}
          px={6}
        >
          <Input placeholder="Search Friend" mt={28} onChange={(e) => { setSearchValue(e.target.value) }} mb={8} />
          {
            friendsToChat?.length > 0 &&
            friendsToChat.map((v, i) => {
              return (
                <Button key={i} onClick={() => accessChat(v?._id)} w={'full'} bgColor={'#404040'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} w={'full'}>
                    <Image src={`${devUrl}${v?.profile}`} w={'30px'} h={'30px'} borderRadius={'100%'} overflow={'hidden'} objectFit={'cover'} />
                    <Text color={'#fff'}>{v.username}</Text>
                  </Stack>
                </Button>
              )
            })
          }
        </Box>
        <Box w={'full'}>
          <Stack px={4} direction={'column'} h={'100vh'} alignItems={'flex-end'} justifyContent={'flex-end'} bgColor={'#404040'}>
            {
              isChatLoading ?
                <Spinner color={'#fff'} />
                :
                <Stack w={'full'} >
                  {
                    messages?.length > 0 &&
                    messages?.map((v, i) => {
                      return (
                        <Text key={i} textAlign={user?.id == v?.sender._id && 'right'} mb={'2 !important'} color={'#fff'}><Text borderBottomLeftRadius={user?.id != v?.sender._id && '0px !important'} borderBottomRightRadius={user?.id == v?.sender._id && '0px !important'} borderRadius={'10px'} p={2} as={'span'} bgColor={'#1a1a1a'}>{v?.content}</Text></Text>
                      )
                    })
                  }
                </Stack>
            }
            <Stack direction={'row'} w={'full'} pb={4}>
              <Input onChange={(e) => setTypedMessage(e.target.value)} value={typedMessage} color={'#fff'} />
              <Button onClick={() => sendMessage()}>Send</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>

    </div>
  );
};

export default ChatPage;
