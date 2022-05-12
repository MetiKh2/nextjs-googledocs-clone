import React, {useRef} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from "@material-tailwind/react/Button";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../../firebase";
const TextEditor = ({value}) => {
    const editorRef = useRef(null);
    const router=useRouter()
    const {id}=router.query
    const handleSave =async () => {
        await updateDoc(doc(db, "userDocuments", id), {
            fileValue:editorRef.current.getContent()
        }).then(res=>{
            alert('Document Successfully Saved')
        }).catch(err=>{
            alert('Some Thing Is Wrong')
        });
    }
    return (
       <div className={'min-h-screen pb-16'}>
           <Editor
               onInit={(evt, editor) => editorRef.current = editor}
               initialValue={value ? value : ''}
               init={{
                   height: 500,
                   menubar: false,
                   plugins: [
                       'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                       'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                       'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                   ],
                   toolbar: 'undo redo | blocks | ' +
                       'bold italic forecolor | alignleft aligncenter ' +
                       'alignright alignjustify | bullist numlist outdent indent | ' +
                       'removeformat | help',
                   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
               }}
           />
          <div className={'text-center flex justify-center'}>
              <Button onClick={handleSave} className={'mt-4'}>
                  Save Changes
              </Button>
          </div>
       </div>
    );
};

export default TextEditor;