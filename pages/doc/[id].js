import Icon  from '@material-tailwind/react/Icon'
import Button from '@material-tailwind/react/Button'
import { useSession,getSession} from "next-auth/react"
import { useRouter } from 'next/router'
import Login from '../../components/login/Login'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import TextEditor from "../../components/textEditor/TextEditor";

function Doc({doc}) {
    const {data:session}=useSession()
    const router=useRouter()
    if(!session) return <Login/>
    return <div>
        <header className='flex justify-between items-center p-3 pb-1'>
            <span onClick={()=>router.push('/')}
             className='cursor-pointer'>
            <Icon name={'description'} size='5xl' color={'blue'}/>
            </span>
            <div className='flex-grow px-2'>
                <h2>{doc?.fileName}</h2>
                <div className='flex items-center h-8 text-sm space-x-1 -ml-1
                h-0 text-gray-600'>
                    <p className='option'>File</p>
                    <p className='option'>Edit</p>
                    <p className='option'>View</p>
                    <p className='option'>Insert</p>
                    <p className='option'>Format</p>
                    <p className='option'>Tools</p>
                </div>
            </div>
            <Button color="lightBlue"
            buttonType="filled"
            rounded={true}
            iconOnly={false} 
            block={false}
            ripple="light"
            className="h-10 hidden md:!inline-flex ">
                <Icon name={'people'} size='md'/> SHARE
            </Button>
            <img 
            src={session?.user?.image}
            className='rounded-full cursor-pointer h-10 w-10 ml-2'/>
        </header>
        <TextEditor value={doc?.fileValue}/>
    </div>
}
export default Doc
export async function getServerSideProps(context) {
    const session=await getSession(context);
    const {id}=context.query
    const docRef = doc(db, "userDocuments", id);
    const docSnap = await getDoc(docRef);
    if(!docSnap.data()) {
        return{
        redirect: {
            destination: "/",
            permanent: false,
          },
    }}
    const fetchedDoc=docSnap.data();
    fetchedDoc.timeStamp=new Date(fetchedDoc?.timeStamp.toDate()).toUTCString()
    return {
        props:{
            doc:fetchedDoc,
            session
        }
    }
  }