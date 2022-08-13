import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Redirect() {
   const navigate= useNavigate()
    useEffect(()=>{
        navigate('/mydrive')
    },[navigate])
  return (
    null
  )
}
