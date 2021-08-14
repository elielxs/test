import { useState } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { actionsLabels } from 'src/utils/table/actionsBase';
import Add from '../Add';
import Edit from './Edit';
import tableIcons from 'src/utils/components/tableIcons';
import EditIcon from '@material-ui/icons/Edit';
import AddBox from '@material-ui/icons/AddBox';
import MaterialTable from "material-table"
import { DeleteOutline } from '@material-ui/icons';

const ReturnTable = (props) => {
  const { data, handleDelete, isLoading } = props
  const { registros } = data
  const editable = !!registros ? registros.map(o => ({ ...o })) : []
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [returnSelected, setReturnSelected] = useState(false)

  
  const handleEdit = (event, row) => {
    /**
     * Abrir modal para retorno
     * 
     */
    setReturnSelected(row)
    setOpenEdit(true)
  }
  const handleAddClose = () => setOpenAdd(false)
  const handleEditClose = () => setOpenEdit(false)


  return (
    <div>

      <Edit open={openEdit} data={returnSelected} handleClose={handleEditClose}></Edit>
      <Grid
        spacing={3}
      >
        <MaterialTable
          
          isLoading={isLoading}
          actions={[{
            icon: () => <EditIcon style={{ fontSize: 15 }} />,
            tooltip: "Edição",
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
          ]}
          icons={tableIcons}
          columns={[

            { title: "Observação", field: "observacao" },
            { title: 'Data', field: "data" },
            { title: "Data de Retorno", field: "data_retorno" },

          ]}
          //onRowClick={handleRowClick ? handleRowClick : null}

          data={editable}



          options={{

            headerStyle: { position: 'sticky', top: 0 },
            maxBodyHeight: 300,
            emptyRowsWhenPaging: true,
            pageSizeOptions: [5, 10, 20, 50],
            //selection,
            actionsColumnIndex: -1,
            pageSize: 10,
            paging:false,
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

          title={"Retornos Adicionados"}
        />

      </Grid>

    </div>
  );
};

export default ReturnTable;
