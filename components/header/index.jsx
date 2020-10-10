import { Jumbotron } from "react-bootstrap";
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const goToHome = () => {
    router.push(`/`)
  }
  return (
    <Jumbotron>
      <a href="#" onClick={goToHome}>
        <h1>Police Department of berlin</h1>
      </a>
      <p>Stolen bykes</p>
    </Jumbotron>
  )
}
