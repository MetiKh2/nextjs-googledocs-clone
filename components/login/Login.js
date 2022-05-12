import Image from "next/image"
import {signIn} from 'next-auth/react'
import Button  from "@material-tailwind/react/Button"
import logo from '../../public/94710f996a1cbe4557e56934302cd1f8.webp'
function Login() {
    return <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image
        src={logo}
         height='300'
        width={'550'}
        objectFit='contain'
        />
         <Button onClick={() => signIn()}
          color="blue"
            buttonType="filled"
            ripple="light"
            className=" w-44 mt-10 ">
                Login
            </Button>
    </div>
}
export default Login