import { useState } from 'react'
import './App.css'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [length, setLength] = useState(10);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  //userRef

  const passwordRef = useRef(null);

  const generatepassword = useCallback(() => {
    
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbersAllowed) str += "0123456789";
    if(charsAllowed) str += "~!@#$%^&*-?=+/";

    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
     
  }, [length, numbersAllowed, charsAllowed]);

  useEffect(() => {
    generatepassword();
  },[length, numbersAllowed, charsAllowed]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    // window.alert("You password is copied to clipboard -> " + password)
  },[password])

  return (
    <div className='w-full max-w-md pb-4 mx-auto rounded shadow-lg text-orange-400 bg-gray-700 mt-20'>
      <h1 className='text-2xl font-bold text-white my-2 p-2'>Password Generator 🤖</h1>
      <div>
        <input 
          className='w-80 max-w-md mx-auto mb-3 p-1 outline-none'
          type="text" 
          readOnly
          placeholder='Password'
          value={password}
            ref={passwordRef}
        />
        <button 
            className='w-20 m-auto text-md font-bold p-1 text-white bg-blue-500 outline-none hover:bg-blue-600'
            onClick={copyToClipboard}
          >
            Copy
          </button>
      </div>
      <div className='flex items-center justify-center p-1'>
        <input
          className=' cursor-pointer' 
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label className='px-2 mr-2 text-lg'>Length({length})</label>
       
        <input 
          className='cursor-pointer'
          type="checkbox" 
          id='numberInput'
          defaultChecked={numbersAllowed} 
          onChange={() =>{
            setNumbersAllowed((prev) => (!prev))
          }}
          />
        <label className='mr-2'>Numbers</label>
        
        <input 
          className='cursor-pointer'
          type="checkbox" 
          id='charInput'
          defaultChecked={charsAllowed}
          onChange={() => {
            setCharsAllowed((prev) => (!prev))
          }}
        />
        <label>Special Chars</label>
      </div>
    </div>
  )
}

export default App
