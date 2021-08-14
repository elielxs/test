import * as React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditTaskForm from './../EditTaskForm';
import ReturnForm from './../return/ReturnForm';
import Return from './../return/ReturnTable';
import BootstrapDialog from '../../../utils/components/BootstrapDialog'
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TaskService from 'src/services/TaskService';
import { useEffect } from 'react';
import ReturnTable from './ReturnTable';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import ReturnService from 'src/services/ReturnService';
import { truncate } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ReturnModal({ open, handleClose,selectedTask }) {
  const service = new ReturnService()
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const [isLoading,setIsLoading] = useState(false)
  const handleSave = (data)=>{
    setIsLoading(true)
    const data_retorno = moment(data.dataRetorno).format("YYYY-MM-DD")
    service.store({...data,data_retorno,id_tarefa:selectedTask.id}).then((res)=>{
      enqueueSnackbar("Sucesso!",{variant:"success"})
      handleClose()
      setIsLoading(false)
      navigate("/app/tasks")

    }).catch((erro)=>{
      setIsLoading(false)

      enqueueSnackbar("Ocorreu um erro, tente novamente ou contate suporte!",{variant:"error"})

    })
  }
  const handleDelete = (event,row)=>{
    setIsLoading(true)
    service.delete(row.id).then((res)=>{
      enqueueSnackbar("Sucesso!",{variant:"success"})
      setIsLoading(false)
      handleClose()
      navigate("/app/tasks")
    }).catch((erro)=>{
      setIsLoading(false)

      enqueueSnackbar("Ocorreu um erro, tente novamente ou contate suporte!",{variant:"error"})

    })
  }
  return (
    <div >

      <BootstrapDialog maxWidth={1200} open={open} onClose={handleClose}>
        <DialogTitle>Retornos</DialogTitle>
        <DialogContent >
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item lg={4} md={4} xs={4}>
                    <ReturnForm handleClose={handleClose} handleSave={handleSave} data={selectedTask} ></ReturnForm>
                  </Grid>
                  <Grid item lg={8} md={8} xs={8}>
                    <ReturnTable isLoading={isLoading} handleDelete={handleDelete} data={selectedTask} ></ReturnTable>
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
    </div >
  );
}
