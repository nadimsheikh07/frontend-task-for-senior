import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import '../../style.scss'
import { crudService } from "../../_services"
import Header from '../../components/header'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [incident, setIncident] = useState([])

  useEffect(() => {
    const { id } = router.query
    filterData(id)
  }, [router.query])

  const filterData = (id) => {
    crudService._get('incidents', id).then(response => {
      if (response.status == 200) {
        setIncident(response.data.incident)
      }
    })
  }

  return (
    <Container>
      <Header />
      <h1>{incident.title}</h1>
      
      <p>{incident.address}</p>


      {incident.media && incident.media.image_url && <Image src={incident.media.image_url} alt={incident.title} rounded />}



      <h2>Description of incedent</h2>
      <p>{incident.description}</p>
    </Container>
  )
}
