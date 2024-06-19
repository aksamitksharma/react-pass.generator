import { useEffect, useState, useRef } from "react";
// import "./App.css";
import { useCallback } from "react";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    numAllowed ? (str += "0123456789") : null;
    charsAllowed ? (str += "@#$%^*!") : null;

    for (let i = 0; i <= passLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [passLength, numAllowed, charsAllowed, setPassword]);

  const copyPass = useCallback(() => {
    passRef.current.select()
    passRef.current.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password)
  }, [passLength])

  useEffect(() => {
    passwordGenerator()
  },[passLength, numAllowed, charsAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Generate Password</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly 
            ref={passRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPass}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range"  
              min={6}
              max={8}
              className="cursor-pointer"
              value={passLength} 
              onChange={(e) => setPassLength(e.target.value)}
            />
            <label htmlFor="length">Length: {passLength}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"  
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev)=>!prev)}
            />
            <label htmlFor="numAllowed">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"  
              defaultChecked={charsAllowed}
              id="charInput"
              onChange={() => setCharsAllowed((prev)=>!prev)}
            />
            <label htmlFor="charsAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
