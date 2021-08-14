import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@material-ui/core';
import ClientForm from './ClientForm';
import TaskTable from '../../components/task/Table';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

const Edit = (props) => {
    const navigate = useNavigate()
    const location  = useLocation()

    const [customerSelected, setCustomerSelected] = useState({
        celular:"",
        cnpj:"",
        codigo_agencia:"",
        codigo_cliente:"",
        email:"",
        inscricao_estadual:"",
        razao_social:"",
        sexo:"",
        telefone:""})
    const [tasks, setTasks] = useState([])
    useEffect(()=>{
        if (!!location && !!location.state) {
            const {
                celular,
                cnpj,
                codigo_agencia,
                codigo_cliente,
                email,
                inscricao_estadual,
                razao_social,
                sexo,
                telefone,
                tarefa 
            } = location.state
            
            setCustomerSelected({
                celular,
                cnpj,
                codigo_agencia,
                codigo_cliente,
                email,
                inscricao_estadual,
                razao_social,
                sexo,
                telefone
            })
            setTasks(tarefa)
        }
    },[])
    function handleClick(event) {
        event.preventDefault();
        navigate("/app/tasks")
    }
    return (
        <>
            <Helmet>
                <title>Tarefas | CRM</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>

                    <Box sx={{ pt: 3 }}>

                        <Container maxWidth="lg">


                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <div role="presentation" onClick={handleClick}>
                                        <Breadcrumbs aria-label="breadcrumb">
                                            <Link underline="hover" color="inherit" href="/">
                                                Início
                                            </Link>

                                            <Typography color="text.primary">Tarefas</Typography>
                                        </Breadcrumbs>
                                    </div>
                                </Grid>

                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <ClientForm customerSelected={customerSelected} />
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <TaskTable tasks={tasks} />
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </Container>
            </Box>
        </>

    )
};

export default Edit;
