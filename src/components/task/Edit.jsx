import * as React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditTaskForm from './EditTaskForm';
import ReturnForm from './return/ReturnForm';
import Return from './return/ReturnTable';
import BootstrapDialog from '../../utils/components/BootstrapDialog'
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TaskService from 'src/services/TaskService';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

export default function Edit({ open, handleClose,selectedTask }) {
  const service = new TaskService()
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  console.log("selectedTask",selectedTask)
  const handleSave = (data)=>{
    service.update({...data,id:selectedTask.id}).then((res)=>{
      enqueueSnackbar("Salvo!",{variant:'success'})
      navigate("/app/tasks")
      handleClose()
    }).catch((erro)=>{
      enqueueSnackbar("Ocorreu um erro, tente novamente ou contate o suporte!",{variant:'error'})

    })
  }

  return (
    <div >

      <BootstrapDialog maxWidth={800} open={open} onClose={handleClose}>
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent >
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item lg={12} md={12} xs={12}>
                    <EditTaskForm handleClose={handleClose} handleSave={handleSave} data={selectedTask} editMode></EditTaskForm>
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
