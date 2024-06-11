import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import axios from "axios"

function App() {
  const [showModal,setShowModal] = useState(false)
  const [data,setData] = useState(null)
  const[loading,setLoading] = useState(false)

  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(()=>{
    async function fetchAPIData(){
      const NASA_KEY = import.meta.env.VITE_ANURAG_NASA_API_KEY
      try{
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
        const apiData = res.data
        setData(apiData)
        console.log(apiData)
      }catch(err){
        console.log(err.message)
      }
    }
    fetchAPIData()
  },[])

  return (
    <>
    {data ? (<Main />) : (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    {showModal && (<Sidebar data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App
