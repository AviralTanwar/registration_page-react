import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OAuth from './OAuth';

const Form = () => {
    
  const location = useLocation();
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BACKEND_URL;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading,setLoading] = useState(false);

  const handleLogin = async (e) =>{
      e.preventDefault();
      try{
        setLoading(true);
        const res = fetch(`${URL}/api/user/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        
        res.then(data =>{
            navigate('/upload');
        })
        // const data = await res.json();
        // if(!data){
        //     setLoading(false);
        //     return;
        // }
        // setLoading(false);
        // navigate('/upload');
      } catch(error){
        setLoading(false);
        console.log(error.message); 
      }
  } ;
  
  const handleRegister = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);
        const res = await fetch(`${URL}/api/user/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();
        if(!data){
            setLoading(false);
            return;
        }
        setLoading(false);
        navigate('/');
    }catch(error){
        setLoading(false);
        console.log(error.message);   
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
                <OAuth />
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