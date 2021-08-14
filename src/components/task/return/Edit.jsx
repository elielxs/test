import * as React from 'react';
import TaskService from 'src/services/TaskService';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import EditReturnForm from './EditReturnForm';
import ReturnService from 'src/services/ReturnService';
import BootstrapDialog from 'src/utils/components/BootstrapDialog';
import { Grid,Button,Box, Container, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useNavigate } from 'react-router';
export default function Add({ open, data, handleClose }) {

    const service = new ReturnService()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const handleSave = (data) => {
        const data_retorno = moment(data.dataRetorno).format("YYYY-MM-DD")
        
        service.update({...data,data_retorno}).then((res) => {
            enqueueSnackbar("Sucesso!", { variant: 'success' })
            handleClose()
            navigate("/app/tasks")
        }).catch((erro) => {
            enqueueSnackbar("Ocorreu um erro, tente novamente ou contate o suporte.", { variant: 'error' })
            console.log(erro)
        })
    }

    return (
        <div>
            <BootstrapDialog maxWidth={800} open={open} onClose={handleClose}>
                <DialogTitle>Retornos</DialogTitle>
                <DialogContent>
                    <Container maxWidth={false}>
                        <Box sx={{ pt: 3 }}>
                            <Container maxWidth="lg">
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid item lg={12} md={12} xs={12}>
                                        <EditReturnForm handleClose={handleClose} handleSave={handleSave} data={data} editMode></EditReturnForm>
                                    </Grid>
                                   
                                </Grid>
                            </Container>
                        </Box>
                    </Container>

                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </BootstrapDialog>
            
        </div>
    );
}
