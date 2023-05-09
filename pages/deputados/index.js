import Link from 'next/link'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Pagina from '../../components/Pagina'
import apiDeputados from '../../services/apiDeputados'



function index({ deputados }) {
    return (
        <Pagina titulo='Deputados'>
            <Row md={5}>
                {deputados.map(item => (
                    <Col>
                        <Link href={'/deputados/' + item.id}> <img src={item.urlFoto} className="container text-center m-1" /> </Link>
                    </Col>
                ))}
            </Row>
        </Pagina>

    )
}

export async function getServerSideProps(context) {

    const resultado = await apiDeputados.get('/deputados')
    const deputados = resultado.data.dados

    return {
        props: { deputados }, // will be passed to the page component as props
    }
}

export default index