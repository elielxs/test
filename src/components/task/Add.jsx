import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TaskForm from './TaskForm';
import BootstrapDialog from '../../utils/components/BootstrapDialog';
import TaskService from 'src/services/TaskService';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
export default function Add({ open,data, handleClose }) {
  
  const service = new TaskService()
  
  const [documentos,setDocumentos] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const handleSave = (data)=>{
    const data_retorno = moment(data.dataRetorno).format("YYYY-MM-DD")
    service.store({...data,data_retorno}).then((res)=>{
      enqueueSnackbar("Sucesso!",{ variant: 'success'})
      handleClose()
    }).catch((erro)=>{
      enqueueSnackbar("Ocorreu um erro, tente novamente ou contate o suporte.",{ variant: 'error'})
      console.log(erro)
    })
  }
  
  useEffect(()=>{
    if(!!data && !!data.documentos){
      setDocumentos(data.documentos)
    }
  },[data])

  return (
    <div >

      <BootstrapDialog maxWidth={700} open={open} onClose={handleClose}>
        <DialogTitle>Nova Tarefa</DialogTitle>
        <DialogContent >
          <TaskForm handleClose={handleClose} data={data} documentos={documentos} handleSave={handleSave} ></TaskForm>
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
