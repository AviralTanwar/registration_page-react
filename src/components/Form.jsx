import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Form = () => {
    
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading,setLoading] = useState(false);

  const handleLogin = (e) =>{
      
  } ;
  
  const handleRegister = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);
        const res = await fetch('/api/user/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();
        if(!data) setLoading(false);
        setLoading(false);
        navigate('/');
    }catch(error){
        setLoading(false);
        console.log(error);   
    }
  };
  
  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
        { location.pathname === '/sign-up' ? (
            <>
                <h1 className='text-5xl font-semibold login_head'>Hello {user.name}!</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'> Please enter your details</p>
            </>
            ): (
            <>   
                <h1 className='text-5xl font-semibold'>Welcome Back!</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details</p>
            </>
        )}
        <form className='mt-8'>
            { location.pathname === '/sign-up' ?
            <div>
                <label className='text-lg font-medium'>Name</label>
                <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent mb-1'
                    type='text'
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    placeholder='Enter your name'
                    required
                />
            </div> : null
            }
            <div>
                <label className='text-lg font-medium'>Email</label>
                <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent mb-2'
                    type='email'
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder='Enter your email'
                    required
                />
            </div>
            <div>
                <label className='text-lg font-medium'>Password</label>
                <input 
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent mb-2'
                    type='password'
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder='Enter your password'
                    required
                />
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
                { location.pathname === '/sign-up' ? 
                    <>
                        <button 
                            disabled={loading}
                            type='submit' 
                            onClick={handleRegister}
                            className='bg-violet-500 text-white text-lg font-bold text-center
                            rounded-xl py-3 active:scale-[.98] active:duration-75 transition-all
                            hover:scale-[1.01] ease-in-out uppercase'
                        >
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </>
                    :   
                    <>
                        <button 
                            disabled={loading}
                            type='submit' onClick={handleLogin}
                            className='bg-violet-500 text-white text-lg font-bold text-center
                            rounded-xl py-3 active:scale-[.98] active:duration-75 transition-all
                            hover:scale-[1.01] ease-in-out uppercase'
                        >
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                    </>
                }
                <button 
                    className='flex items-center justify-center gap-2
                    active:scale-[.98] active:duration-75 transition-all rounded-xl
                    hover:scale-[1.01] ease-in-out border-2 border-gray-100 py-3'
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                        <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                        <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                        <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
            <div className=' mt-8 flex justify-center items-center '>
                <p className='font-medium text-base'>
                    { location.pathname === '/sign-up' ? 'Already have an account?' : `Don't have an account?`} 
                </p>
                <Link to={location.pathname === '/sign-up' ? '/' : '/sign-up'}>
                    <button 
                        className='text-violet-500 text-xl font-medium ml-2'>
                        {location.pathname === '/sign-up' ? 'Sign In' : 'Sign Up'}
                    </button>
                </Link>
            </div>
        </form>
    </div>
  )
}

export default Form;