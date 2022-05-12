import Icon  from '@material-tailwind/react/Icon'
import Button from '@material-tailwind/react/Button'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header/Header'
import { useSession,getSession} from "next-auth/react"
import { useRouter } from 'next/router'
import Login from '../components/login/Login'
import Modal  from '@material-tailwind/react/Modal'
import ModalBody  from '@material-tailwind/react/ModalBody'
import ModalFooter  from '@material-tailwind/react/ModalFooter'
import { useEffect, useState } from 'react'
import {db} from '../firebase'
import {useCollection, useCollectionOnce} from 'react-firebase-hooks/firestore'
import { addDoc, collection,doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import DocumentRow from '../components/document/DocumentRow'
export default function Home({sessions}) {
   const { data: session } = useSession()
  const [showModal, setShowModal] = useState(false)
  const [docs,setDocs]=useState([])
  const [input, setInput] = useState('')
useEffect(() => {
  const collectionRef = collection(db, "userDocuments")
  const q = query(collectionRef,where("email","==",session?.user?.email?session.user.email:''));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const list=querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  setDocs(list.sort((a,b)=>{return b?.timeStamp-a?.timeStamp}))
  });
  return unsubscribe;
  }, [session?.user?.email])
  
  if (!session)return <Login/>
 
  const createDocument=async()=>{
    if(!input) return
    try{
      await addDoc(collection(db, "userDocuments"), {
       email: session?.user?.email,
       timeStamp:serverTimestamp(),
       fileName:input,
      });
  }
  catch(err){
      console.log(err);
  }
  setInput('')
  setShowModal(false)  
}
  const modal=(
    <Modal size={'sm'} active={showModal} toggler={()=>setShowModal(!showModal)}>
      <ModalBody>
        <input
        onChange={(e)=>setInput(e.target.value)}
        className="outline-none w-full"
        placeholder='Enter name of doc ...'
        onKeyDown={(e)=>e.key==='Enter'&&createDocument()}
        value={input}/>
        
      </ModalBody>
      <ModalFooter>
      <Button color="blue"
            buttonType="link"
            ripple="dark"
            onClick={()=>setShowModal(false)}>
              Cancel
            </Button>
            <Button color="blue"
            buttonType="link"
            onClick={()=>createDocument()}>
              Create
            </Button>
      </ModalFooter>
    </Modal>
  )
  return (
    <div>
      <Header/>
      {modal}
      <section className='bg-[#f8f9fa] pb-10 px-10'>
         <div className='max-w-3xl mx-auto'>
            <div className='flex justify-between items-center py-6'>
              <h2 className='text-gray-700 text-lg'>Start a new document</h2>
              <Button color="gray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className=" border-0 ">
                <Icon name={'more_vert'} size={'3xl'} color="gray"/>
            </Button>
            </div>
            <div onClick={()=>setShowModal(true)} className='relative h-52 w-40 border-2 cursor-pointer
            hover:border-blue-700'>
              <Image src={'https://links.papareact.com/pju'}
               layout='fill'
              />
            </div>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
         </div>
      </section>
      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My Documents</h2>
            <p className='mr-12'>Date Created</p>
            <Icon name={'folder'} size={'3xl'} color="gray"/>
          </div>
        {docs.map((doc,i)=>{
          return <DocumentRow key={doc?.id} id={doc?.id} fileName={doc?.fileName}
          date={doc?.timeStamp}  ></DocumentRow>
         })}
        </div>

      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const sessions=await getSession(context)
  return {
    props:{
      sessions
    }
  }
}