import { useCallback, useState,useEffect ,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [charAllowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState('')
  //use ref to store the password
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() =>{
    let password = ''
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(numberallowed){
      chars += '0123456789'
    }
    if(charAllowed){
      chars += '!@#$%^&*()'
    }
    for(let i = 1; i <=length; i++){
      let str = Math.floor(Math.random() * chars.length)
      password += chars.charAt(str)
    }
    setPassword(password)

  },[length, numberallowed, charAllowed,setPassword])

  const copyPasswordToClipboard= useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => {
    passwordgenerator()
  }, [length, numberallowed, charAllowed,
    passwordgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-2 '>Password Generator </h1>
        <div className='className="flex shadow rounded-lg overflow-hidden mb-3"'>
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-2"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700
           text-white px-3 py-0.5 rounded-lg shrink-0'>
            Copy
            </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input type="range"
            min={6}
            max={20}
            value={length}
            className='cursor-pointer' 
            onChange={(e) => setLength(e.target.value)}
            />
            <label >length:{length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
            defaultChecked={numberallowed}
            id='numberInput'
            onChange={() => {
                setNumberallowed((prev)=> !prev)
            }}
            />
            <label >Number</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            id='numberInput'
            onChange={() => {
                setCharallowed((prev)=> !prev)
            }}
            />
            <label >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
