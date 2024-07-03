import React,{useEffect,useState,useRef} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { settingsEndpoints } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import toast from 'react-hot-toast';
import { setUser } from '../../slices/profileSlice';
import { FiUpload } from 'react-icons/fi';


export const FileUploadSection = () => {

    const {user}=useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false)
    const [image,setImage]=useState(null);
    const [previewSource, setPreviewSource] = useState(null)
    const dispatch=useDispatch();

    const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }


  useEffect(() => {
    if (image) {
      previewFile(image)
    }
  }, [image])

    

    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();
    const {token}=useSelector((state)=>state.auth);

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  
    console.log(token);
    function handleImage(e){
        console.log(e.target.files);
      
        setImage(e.target.files[0]);
        previewFile(e.target.files[0]);
  
        console.log(previewSource)
    }


    const fileUpload=async()=>{

        
        const formData=new FormData();
        formData.append("displayPicture",image);
        console.log(formData);
      

      
        try{
            const response=await apiConnector("POST",settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
              });
            console.log("response",response);

            dispatch(setUser(response.data.data));
            localStorage.setItem("user",JSON.stringify(response.data.data));
            toast.success("Image Update Successfully");




        }
        catch(err){

            console.log("Error",err);
            toast.error("Image Not Uploaded");
        }

    }
  return (
    <div className="w-[792px] h-[126px] bg-richblack-800  ml-[180px] rounded-md mb-[30px]">
        <div className="flex justify-start items-center p-[24px] gap-[20px]">
            <img src={previewSource||user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'></img>
            <div className="flex flex-col gap-y-2">
            <p className="font-medium font-inter text-[16px] text-richblack-5">Change Profile Picture</p>
                
                
                    <input ref={fileInputRef} type="file" name="fileName" id="fileName" className="hidden" accept="image/png, image/gif, image/jpeg"  onChange={handleImage}></input>
                    <div className="flex gap-2">
                    <button onClick={handleClick} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                    Select
                    </button>
                    <button className="bg-yellow-50 p-[10px] flex items-center justify-center gap-2 rounded-md" onClick={fileUpload}>
                        Upload
                        <FiUpload></FiUpload>
                    </button>
                    </div>
               
            </div>
        </div>

    </div>
  )
}
