import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';
import TableBase from 'src/utils/table/TableBase';
import { actionsLabels } from 'src/utils/table/actionsBase';

const list =
{
  page:0,
  rowsPerPage:10,
  totalCount:0,
  "data":  [{
    "cheque": "851338",
    "saldo": "600,00",
    "nome_agencia": "C. V. T. TURISMO",
    "nome_loja": "KONAKO SPORTS",
    "data": "2021-07-01"
  },
  {
    "cheque": "851339",
    "saldo": "650,00",
    "nome_agencia": "C. V. T. TURISMO",
    "nome_loja": "KONAKO SPORTS",
    "data": "2021-07-02"
  }
  ],
  searchTerm:"",
  isLoading:false
}
const DocumentForm = (props) => {
  const {page,rowsPerPage,totalCount,data,searchTerm,isLoading } = list
  const editable = !!data ? data.map(o => ({ ...o })) : []
  

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
          <Grid
            spacing={3}
          >
            <TableBase
              tableConfigs={
                {
                  title: "Documentos",
                  actions: [],
                  actionsPaths: { add: "/app/cliente/novo", edit: "/app/cliente/edicao" },
                  columns: [
                    
                    { title: "Loja", field: "nome_loja" },
                    { title: 'Agência', field: "nome_agencia" },
                    { title: "Saldo", field: "saldo" },
                    { title: "Cheque", field: "cheque" },
                    { title: "Data", field: "data" },

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
              handleDelete={()=>{}}
              handleList={()=>{}}
              handleEdit={()=>{}}
              isLoading={isLoading}
              sorting={true}
              selection={false}
              
            ></TableBase>
          </Grid>
       
    </form>
  );
};

export default DocumentForm;
