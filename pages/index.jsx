import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Form, Button, Image } from "react-bootstrap";
import '../style.scss'
import { crudService } from "../_services"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/header'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [incidents, setIncidents] = useState([])
  const [query, setQuery] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  useEffect(() => {
    filterData()
  }, [])

  const onSearch = (event) => {
    event.preventDefault();
    filterData()
  }

  const filterData = () => {
    const url = `incidents?page=1&proximity_square=100&query=${query}`
    crudService._getAll(url).then(response => {
      if (response.status == 200) {
        setIncidents(response.data.incidents)
      }
    })
  }

  const showDetail = (id) => {
    router.push(`/detail/${id}`)
  }

  const columns = [
    {
      dataField: 'title',
      text: '',
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Row>
              <Col lg="2">
                {row.media.image_url_thumb && <Image src={row.media.image_url_thumb} width={150} alt={row.title} rounded />}
              </Col>
              <Col lg="10">
                <a href="#" onClick={() => showDetail(row.id)}>{row.title}</a>
                <p>{row.description}</p>
                <p>{row.address}</p></Col>
            </Row>
          </React.Fragment>
        )
      }
    }
  ];

  const options = {
    paginationSize: 6,
    pageStartIndex: 1,
    alwaysShowAllBtns: false, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page      
    firstPageText: 'First',
    prePageText: '',
    nextPageText: '',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: null
  };

  return (
    <Container>
      <Header />

      <Form onSubmit={onSearch}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control type="description" placeholder="Search case description" onChange={(e) => setQuery(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <DatePicker selected={from} onChange={date => setFrom(date)} customInput={<Form.Control />} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <DatePicker selected={to} onChange={date => setTo(date)} customInput={<Form.Control />} />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Find Cases
            </Button>
          </Col>
        </Row>
      </Form>

      {incidents && incidents.length !== 0 && <BootstrapTable keyField='id' data={incidents} columns={columns} pagination={paginationFactory(options)} />}

      {incidents && incidents.length === 0 && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}

    </Container>
  )
}
