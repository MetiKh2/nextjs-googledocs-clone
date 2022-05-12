import Icon  from "@material-tailwind/react/Icon"
import Button  from "@material-tailwind/react/Button"
import { useSession,signOut} from "next-auth/react"

function Header() {
    const {data:session}=useSession()
    return <div className="sticky z-50 px-4 py-2 shadow-md bg-white top-0 flex items-center ">
            <Button color="bluegray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className=" h-20 w-20 border-0 ">
                <Icon name={'menu'} size={'3xl'}/>
            </Button>
            <Icon name={'description'} size={'5xl'} color='blue'/>
            <h1 className="md:inline-flex ml-2 text-gray-700 text-2xl">
                Docs
            </h1>
            <div className="flex flex-grow mx-5 md:mx-20 focus-within:shadow-md focus-within:text-gray-600 items-center rounded-lg px-5 py-2 text-gray-600 bg-gray-100 ">
                <Icon name={'search'} size="3xl" color={'gray'}/>
                <input placeholder="Search ..." className="flex-grow px-5 
                text-base bg-transparent outline-none"/>
            </div>
            <Button color="gray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className="ml-5 h-20 w-20 border-0 ">
                <Icon name={'apps'} size={'3xl'} color="gray"/>
            </Button>
            <img loading="lazy" onClick={signOut} 
            className='hiddden md:inline-flex cursor-pointer h-12 w-12 rounded-full ml-2'
            src={session?.user?.image}
            alt=""/>
    </div>
}
export default Header