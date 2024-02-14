import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Form from './components/Form.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <Routes>
          <Route exact path='/' element ={<Form />} />
          <Route path='/sign-up' element ={<Form />} />
        </Routes>
      </div>
      <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center
         bg-gray-200'
      >
        <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce'></div>
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
