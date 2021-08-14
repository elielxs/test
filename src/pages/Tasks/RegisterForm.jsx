import { useState } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { actionsLabels } from 'src/utils/table/actionsBase';
import TableBase from 'src/utils/table/TableBase';
import TaskForm from '../../components/task/TaskForm';
import Modal from '@material-ui/core/Modal';
import Add from '../../components/task/Add';
const list = {
  page: 0,
  rowsPerPage: 10,
  totalCount: 0,
  data: [{
    "id": "1",
    "observacao": "Liguei para cobrar e me falaram para ligar de novo dia 10/08",
    "data": "2021-07-02",
    "data_retorno": "2021-08-10"
  },
  {
    "id": "2",
    "observacao": "Liguei para cobrar novamente e me falaram para ligar de novo dia 10/09",
    "data": "2021-08-10",
    "data_retorno": "2021-09-10"
  }
  ],
  searchTerm: "",
  isLoading: false
}

const RegisterForm = (props) => {

  const { page, rowsPerPage, totalCount, data, searchTerm, isLoading } = list
  const editable = !!data ? data.map(o => ({ ...o })) : []
  const [open,setOpen] = useState(false)
  const handleAdd = (event, row) => {
    /**
     * Abrir modal para retorno
     * 
     */
    setOpen(true)
  }
  const handleClose = ()=>setOpen(false)
  return (
    <div>
     <Add  open={open} handleClose={handleClose}></Add>
      <Grid
        spacing={3}
      >
        <TableBase
          tableConfigs={
            {
              title: "Tarefas",
              actions: [actionsLabels.TABLE_REFRESH, actionsLabels.TABLE_ADD, actionsLabels.TABLE_EDIT, actionsLabels.TABLE_DELETE],
              actionsPaths: { add: "/app/cliente/novo", edit: "/app/cliente/edicao" },
              columns: [

                { title: "Observação", field: "observacao" },
                { title: 'Data', field: "data" },
                { title: "Data de Retorno", field: "data_retorno" },

              ],
            }
          }
          maxBodyHeight={200}
          stateName='returns'
          page={page}
          searchTerm={searchTerm}
          isSearchable={false}
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          data={editable}
          handleDelete={() => { }}
          handleList={() => { }}
          handleEdit={() => { }}
          handleAdd={handleAdd}
          isLoading={isLoading}
          sorting={true}
          selection={false}
        ></TableBase>
      </Grid>

    </div>
  );
};

export default RegisterForm;
