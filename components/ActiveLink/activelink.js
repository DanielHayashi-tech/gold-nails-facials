import { useRouter } from 'next/router'


//Here is a comment I want you to find it and remove it -- fro you thomas

function ActiveLink({ href, children }) {
  const router = useRouter()
  
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick}>
       { children }
    </a>
  )
}

export default ActiveLink