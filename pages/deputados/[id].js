import React from 'react'
import Pagina from '../../components/Pagina'
import { Card, Col, Row, Table } from 'react-bootstrap'
import Link from 'next/link'
import apiDeputados from '../../services/apiDeputados'

function Detalhes({ deputado, despesasDeputado, profissoesDeputado }) {
    return (
        <Pagina>
            <Row md={3}>
                <Col>
                    <Card>
                        <Card.Img src={deputado.ultimoStatus.urlFoto} />
                        <Card.Body>
                            <Card.Title>{deputado.nomeCivil}</Card.Title>
                            <p>Partido: {deputado.ultimoStatus.siglaPartido}</p>
                            <p>UF: {deputado.ultimoStatus.siglaUf}</p>
                        </Card.Body>
                    </Card>

                    <Col>
                        <Link className='btn btn-danger mt-3' href={'/deputados/'}>Voltar</Link>
                    </Col>
                </Col>


                <Col md={6}>

                    <h1>Despesas</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {despesasDeputado.map(item => (
                                <tr key={item.id}>
                                    <td>{item.dataDocumento}</td>
                                    <td>{item.tipoDespesa}</td>
                                    <td> R${item.valorDocumento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Col>

                <Col md={2}>

                    <h2>Profissões</h2>
                    <ul>
                        {profissoesDeputado.map(item => (
                            <li key={item.id}>{item.titulo}</li>
                        ))}
                    </ul>

                </Col>
            </Row>
        </Pagina>
    )
}

export async function getServerSideProps(context) {

    const id = context.params.id

    const resultado = await apiDeputados.get('/deputados/' + id)
    const deputado = resultado.data.dados

    const resultado2 = await apiDeputados.get('/deputados/' + id + '/despesas')
    const despesasDeputado = resultado2.data.dados

    const resultado3 = await apiDeputados.get('/deputados/' + id + '/profissoes')
    const profissoesDeputado = resultado3.data.dados

    return {
        props: { deputado, despesasDeputado, profissoesDeputado },
    }
}

export default Detalhes