import { useState } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { actionsLabels } from 'src/utils/table/actionsBase';
import TableBase from 'src/utils/table/TableBase';
import TaskForm from './TaskForm';
import Modal from '@material-ui/core/Modal';
import Add from './Add';
import Edit from './Edit';
import EditIcon from '@material-ui/icons/Edit';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MaterialTable from "material-table";
import tableIcons from 'src/utils/components/tableIcons';
import TaskService from 'src/services/TaskService';
import { useSnackbar } from 'notistack';
import HistoryIcon from '@material-ui/icons/History';
import Return from './return/index'
import { useNavigate } from 'react-router';

const Table = (props) => {
  const { tasks } = props
  const navigate = useNavigate()
  const editable = !!tasks ? tasks.map(o => ({ ...o })) : []
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openReturn, setOpenReturn] = useState(false)
  const [selectedTask, setSelectedTask] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const service = new TaskService();
  const { enqueueSnackbar } = useSnackbar();
  const handleEdit = (event, row) => {
    /**
     * Abrir modal para retorno
     * 
     */
    setSelectedTask(row)
    setOpenEdit(true)

  }
  const handleDelete = (event, row) => {
    setIsLoading(true)
    service.delete(row.id).then((res) => {
      setIsLoading(false)
      enqueueSnackbar("Sucesso!", { variant: 'success' })
      navigate("app/tasks")
    }).catch(() => {
      setIsLoading(false)

      enqueueSnackbar("Ocorreu um problema ao deletar, tente novamente ou contate o suporte.", { variant: 'error' })
    })
  }
  const handleReturn = (event, row) => {
    setSelectedTask(row)
    setOpenReturn(true)
  }
  const handleAddClose = () => setOpenAdd(false)
  const handleEditClose = () => setOpenEdit(false)
  const handleReturnClose = () => setOpenReturn(false)

  const filterData = () => tasks.map(item => {
    var previa = null
    item.registros.forEach(registro => {
      if (previa === null) {
        previa = {observacao:registro.observacao,data:registro.data,data_retorno:registro.data_retorno}
      } else {
        if (new Date(registro.data) > new Date(previa.data)) {
          previa = {observacao:registro.observacao,data:registro.data,data_retorno:registro.data_retorno}
        }
      }
    })
    return { ...item, ...previa }

  })
  const rows = filterData()
  return (
    <div>
      <Add open={openAdd} handleClose={handleAddClose}></Add>
      <Edit open={openEdit} selectedTask={selectedTask} handleClose={handleEditClose}></Edit>
      <Return open={openReturn} selectedTask={selectedTask} handleClose={handleReturnClose}></Return>
      
      <Grid
        spacing={3}
      >
        <MaterialTable
          
          isLoading={isLoading}
          actions={[
            {
              icon: () => <HistoryIcon style={{ fontSize: 15 }} />,
              tooltip: "Retornos",
              onClick: handleReturn,
              type: "TABLE_RETURN",
              position: "row"
            },
            {
              icon: () => <EditIcon style={{ fontSize: 15 }} />,
              tooltip: "Editar Tarefa",
              onClick: handleEdit,
              type: "TABLE_EDIT",
              position: "row"
            },
            {
              icon: () => <DeleteOutline style={{ fontSize: 15 }} />,
              tooltip: "Excluir",
              onClick: handleDelete,
              type: "TABLE_DELETE",
              position: "row"
            },
       /*
          {
            icon: () => <AddBox fontSize="small" />,
            tooltip: "Adicionar",
            isFreeAction: true,
            onClick: handleAdd,
            type: actionsLabels.TABLE_ADD
        },*/]}
          icons={tableIcons}
          columns={[

            { title: "Observação", field: "observacao" },
            { title: 'Data', field: "data" },
            { title: "Data de Retorno", field: "data_retorno" },

          ]}
          //onRowClick={handleRowClick ? handleRowClick : null}

          data={rows}



          options={{
            paging:false,
            headerStyle: { position: 'sticky', top: 0 },
            maxBodyHeight: 500,
            emptyRowsWhenPaging: true,
            pageSizeOptions: [5, 10, 20, 50],
            //selection,
            actionsColumnIndex: -1,
            pageSize: 10,
            search: false,
            cellStyle: { padding: '0.5em 0.5em 0.5em 0.5em' },
            rowStyle: { padding: '0.2em' },
            //sorting: { sorting },
          }}

          localization={{
            body: {
              emptyDataSourceMessage: 'Nenhum registro para exibir'
            },
            header: {
              actions: 'Ações'
            },
            toolbar: {
              searchTooltip: 'Procurar',
              searchPlaceholder: 'Procurar',
              nRowsSelected: '{0} linha(s) selecionada(s)'
            },
            pagination: {
              labelRowsSelect: 'linhas',
              labelDisplayedRows: '{from}-{to} de {count}',
              firstTooltip: "Primeira página",
              previousTooltip: "Página anterior",
              nextTooltip: "Próxima página",
              lastTooltip: "Última página",
              labelRowsPerPage: "Por página"
            }
          }}

          title={"Tarefas"}
        />
      </Grid>

    </div>
  );
};

export default Table;
