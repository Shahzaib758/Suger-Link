import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
import { useSelector } from 'react-redux';
import LoggedIn from '../LoggedIn/LoggedIn';
import { useEffect } from 'react';

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();
    const user = useSelector(state => state?.value)

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Box
            position={'absolute'}
            top={0}
            left={0}
            width={'100%'}
            zIndex={1}
            bgColor={'#1a1a1a'}
        >
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
                justifyContent={'space-between'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'space-between' }} alignItems={'center'} justifyContent={{ base: 'flex-end', lg: 'space-between' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={'#fff'}
                        fontWeight={'bold'}
                        fontSize={22}
                    >
                        <Link
                            to={"/"}
                            as={ReactLink}
                        >
                            <Image w={'200px'} src={Logo} />
                        </Link>
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav user={user} />
                    </Flex>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav onToggle={onToggle} user={user} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = ({ user }) => {
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const navigate = useNavigate();
    let pickedItems = user ? loggedInItems : NAV_ITEMS;
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={6}>
            {pickedItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                as={ReactLink}
                                p={2}
                                to={navItem.href ?? '#'}
                                fontSize={'sm'}
                                color={'#fff'}
                                fontWeight={500}
                                _hover={{
                                    textDecoration: 'none',
                                    color: 'primaryRed.100',
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
            {
                user === undefined || user === null || user === {} ?
                    < Button
                        border={'2px solid #fff'}
                        onClick={() => navigate('/auth')}
                        borderRadius={8}
                        backgroundColor={'primaryRed.100'}
                        color={'#fff'}
                        _hover={{
                            bgColor: 'primaryRed.100'
                        }}
                    >
                        Join Free
                    </Button>
                    :
                    <LoggedIn />

            }
        </Stack >
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = ({ onToggle, user }) => {
    let pickedItems = user ? loggedInItems : NAV_ITEMS;

    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {pickedItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} onToggle={onToggle} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, onToggle }) => {
    const { isOpen } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={ReactLink}
                onClick={onToggle}
                to={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} to={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const loggedInItems = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Explore Profiles',
        href: '/profiles',
    },
    {
        label: 'Chats',
        href: '/chats',
    },
];

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About Us',
        href: '/about',
    },
    {
        label: 'Profiles',
        href: '/profiles',
    },
    {
        label: 'How it works',
        href: '/how-it-works',
    },
];