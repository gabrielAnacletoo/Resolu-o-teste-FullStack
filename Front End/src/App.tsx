import { Container, Row, Col  } from 'react-bootstrap'
import { TableClients } from './components/table/table'
import { MenuSide } from './components/menu/menu'

function App() {
 
  return (
    <>
    <Container fluid className='py-1 Container overflow-hidden'>
      <Row>
        <Col sm={2}>< MenuSide /></Col>
        <Col xs={10}>
        <TableClients/> 
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default App
