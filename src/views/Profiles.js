import { Input } from "@chakra-ui/react";
import { useState } from "react";
import MiniHero from "../components/Hero/MiniHero.js";
import ProfileSec from "../components/Profiles/ProfileSec.js";

export default function Profiles() {
  const [searchValue, setSearchValue] = useState('');

  return (


    <>
      <MiniHero heading={'Profiles'} noButton={false} />
      <Input
        type={'text'}
        bgColor={'transparent'}
        border={'2px solid #fff'}
        w={'80%'}
        marginX={'auto'}
        position={'absolute'}
        top={'300px'}
        left={'50%'}
        transform={'translate(-50%, 0)'}
        color={'#fff'}
        _focusVisible={{ outline: '#fff' }}
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
        placeholder={"search"}
        _placeholder={{
          color: '#fff'
        }}
      />
      <ProfileSec searchValue={searchValue} />
    </>
  );
}