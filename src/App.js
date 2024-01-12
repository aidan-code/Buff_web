import { IconContext } from 'react-icons';
import './App.css';
import Inputform from './Inputform';
import { useState } from 'react'
import {IoMic, IoSend} from "react-icons/io5"
import axios from 'axios';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';



const userID = 'user_245'
const apiKey = '{VF.DM.658a673af9bf8200082511b3.7rAXIG8CgswxwjZV}'
const baseUrl =`https://general-runtime.voiceflow.com/state/user/${userID}/interact`

function App() {
  const [request, setRequest] = useState('');
  const [result, setResult] = useState('');
  const [dispMic, setDispMic] = useState(false)

  const handleChange = (e) => {
    setRequest(e.target.value);
  }

  const handleMic = (e) =>{
    e.preventDefault()
      console.log('testing 123')
      setDispMic(true)
  }

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  


const body = {
  action: {
    type: 'text',
    payload: request,
  },
};
  const handleRequest = async(e) => {

    try {
      const response = await axios.post(baseUrl, request, {
        headers:{
          Authorization:`bearer ${apiKey}`
        }
      })
        console.log(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div className="App">
    <div className='main'>
      <h1>Buff</h1>
      <p>An open source AI library</p>

      <form >
      <IconContext.Provider value={{size:"20px" ,color:"grey"}} >
        <button onClick={handleMic}>
          <IoMic />
        </button>
      </IconContext.Provider>
      
        <Inputform 
            type="text"
            placeholder = "What can i do for you?"
            name = "request"
            value = {transcript}
            handle = {handleChange}
        />
        <IconContext.Provider value={{size: "20px", color:"grey"}}>
          <button onClick={handleRequest}>
            <IoSend />
          </button>
        </IconContext.Provider>
      </form>
      {dispMic ?
        (<div className='Overlay'>
        <div className='overlay-box'>

        <div className='out-box'> 
          <div className='illus' onClick={SpeechRecognition.startListening}>
            <IconContext.Provider value={{size:"50px" , color:"white"}} >
              <IoMic />
            </IconContext.Provider>
          </div>
          <p className='clikkie'>Microphone: {listening? 'on' : "off"}</p>
        </div>
         
        <div className='in-box'>
          <textarea
          className='txt-a' 
            type="text"
            placeholder = "What can i do for you?"
            name = "request"
            value = {transcript}
            onChange = {handleChange}
            rows="10"
        />
        </div>
         
        </div>
      </div>) :
      null
      }
      
         
    </div>
    
    </div>
  );
}

export default App;
