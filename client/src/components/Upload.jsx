import {useState} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import {useNavigate} from 'react-router-dom';

const Upload = () => {

  const URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [imageUploadError,setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files,setFiles] = useState([]);
  const [success,setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    imageURLs: []
  });

  const handleImageSubmit = () =>{
    if(files.length > 0 && files.length + formData.imageURLs.length < 7){
        setUploading(true);
        setImageUploadError(false);
        const promises = [];

        for(let i = 0;i < files.length; i++){
            promises.push(storeImage(files[i]))
        }
        Promise.all(promises).then((urls) =>{
            setFormData({...formData, imageURLs: formData.imageURLs.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
    }).catch(() =>{
        setImageUploadError('Image upload failed (2MB max per image)');
        setUploading(false);
        });
    }else{
        setImageUploadError('You can only upload 6 images per listing');
        setUploading(false);
    }
};

const storeImage = async (file) =>{
  return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
          "state_changed",
          (snapshot) =>{
              const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done `);
          },
          (error)=>{
              reject(error);
          },
          ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                  resolve(downloadURL);
              });
          }
      );
  });
};

const handleSubmit = async (e) =>{
  e.preventDefault();
  try {
      if(formData.imageURLs.length < 1){
          return setError('You must upload atleast 1 image');
      }
      setLoading(true);
      setError(false);

  } catch(error){
      setError(error.message);
      setLoading(false);
  }
}

const handleSignOut = async () =>{
  try {
    const res = await fetch(`${URL}/api/user/logout`);  // Default method is GET
    const data = res.json();
    if(data.success === false){
      return;
    }
    navigate('/');

  } catch(error){
    console.log(error);
  }
}

const handleRemoveImage = (index) =>{
  setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_,i)=> i !== index),
  });
};

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-[900px]'>
        <div className='bg-white ml-15 px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold text-center'>Hello!</h1>
            <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Welcome to your profile</p>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold mt-2'>Images:
                <span className='font-normal text-gray-600 text-center ml-2'>Upload max 6 images</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=> setFiles(e.target.files)} 
                        className='p-3 border border-gray-300 rounded w-full'
                        type='file' id='images' 
                        accept='image/*' multiple 
                    />
                    <button type='button' onClick={handleImageSubmit} 
                        disabled={uploading}
                        className='p-3 text-green-700 border border-green-700
                        rounded uppercase hover:shadow-lg disabled:opacity-80'>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageURLs.length > 0 && formData.imageURLs.map((url,index) =>(
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img 
                                src={url} 
                                alt='Listing-image' 
                                className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={() => handleRemoveImage(index)} 
                                className='p-3 text-red-700 rounded-lg uppercase
                                hover:opacity-75'>Delete</button>
                        </div>
                    ))
                }
                <button 
                    type='submit'
                    onClick={() => setSuccess(!success)}
                    disabled={loading || uploading} 
                    className='p-3 bg-violet-700 text-white rounded-lg
                    uppercase hover:opacity-90 disabled:opacity-80 w-[450px] sm:w-[461px]'>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
                { success && <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Image uploaded successfully</p>}
                </div>
                <button 
                    type='submit'
                    onClick={handleSignOut}
                    className='p-3 bg-pink-700 text-white rounded-lg w-[450px]
                    uppercase hover:opacity-90 disabled:opacity-80 mt-3 sm:w-[461px]'>
                    Sign Out
                </button>
        </div>
      </div>
    </div>
  )
}

export default Upload;