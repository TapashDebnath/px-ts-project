import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'

import './App.css';

const years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
function App() {

  const [programs, setPrograms] = useState([]);
  const [query, setQuery] = useState('');

  const [year, setYear] = useState(null)
  const [launch, setLaunch] = useState(false)
  const [landing, setLanding] = useState(false)

  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v3/launches?limit=100${query}`)
    .then(response => {
        console.log(response.data)
        setPrograms(response.data)
    })
    .catch(error => {
        console.log('error', error)
    })

    return () => {}
  }, [query]);


  useEffect(() => {
    const parameters = [
      {
        param: 'launch_year',
        value: year
      },{
        param: 'launch_success',
        value: launch
      },{
        param: 'land_success',
        value: landing
      }
    ]
 

    const paramString = parameters
                        .filter(parameter => parameter.value)
                        .map(a => `&${a.param}=${a.value}`).join('')
    setQuery(paramString)
  }, [year, launch, landing])




  const yearListButton = years.map((number) =>
    <Col md={6} sm={6} xs={6} className="mb-3" key={number}>
      <Button variant="primary" onClick={() => setYear(number)} >
        {number}
      </Button>
    </Col>
  );

  const programListTile = programs.map(program => {
      return(
        <Col lg={3} md={6} sm={6} xs={12}  className="program-card" key={program.flight_number}>
          <div className="card mb-4" >
            <div className="card-body img pb-0">
              <img className="card-img-top" alt={program.mission_name} src={program.links.mission_patch_small}/>
            </div>
            <div className="card-body">
              <div className="card-title">
                <strong>{program.mission_name} #{program.flight_number}</strong>
              </div>
              <div>
                <strong>Mission Ids: </strong>
                {program.mission_id.length > 0 &&
                  <ul>
                    {program.mission_id.map(id => <li key={id}>{id}</li>)}
                  </ul>
                }
              </div>
              <div><strong>Launch Year: </strong>{program.launch_year}</div>
              <div><strong>Succesfuly Launch: </strong>{String(program.launch_success)}</div>          
              <div><strong>Succesfuly Landing: </strong>{String(program.land_success)}</div>
            </div>
          </div>
        </Col>
      )
    }
  );
  

  return (

    
    <div className="App">
      <Container>
        <Row>
          <Col md={12}>
            <h1>SpaceX Launch Programs</h1>
          </Col>

          <Col className="text-center bg-white" md={2}>
            Launch Year
            <hr/>
            <Row>
              {yearListButton}
            </Row>

            Succesfuly Launch
            <hr/>
            <Row className="btn-list">
              <Col md={6} sm={6} xs={6}>
                <Button variant="primary"  onClick={() => setLaunch(true)}>true</Button>
              </Col>
              <Col md={6} sm={6} xs={6}>
                <Button variant="primary"  onClick={() => setLaunch(false)}>false</Button>
              </Col>
            </Row>

            Succesfuly Landing
            <hr/>
            <Row className="btn-list">
              <Col md={6} sm={6} xs={6}>
                <Button variant="primary"  onClick={() => setLanding(true)}>true</Button>
              </Col>
              <Col md={6} sm={6} xs={6}>
                <Button variant="primary"  onClick={() => setLanding(false)}>false</Button>
              </Col>
            </Row>

          </Col>
          <Col className="col-md-10">
            <Row>
              {
                programListTile
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
