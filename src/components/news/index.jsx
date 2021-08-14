import React, { useEffect, useState } from 'react';
import { actionsLabels } from 'src/utils/table/actionsBase';
import TableBase from 'src/utils/table/TableBase';
import { useNavigate } from 'react-router-dom';
import Add from '../task/Add';
import TaskService from 'src/services/TaskService';
import { useSnackbar } from 'notistack';

export default function News() {
    const service = new TaskService()
    const {enqueueSnackbar} = useSnackbar()
    const [list,setList] = useState({page:1, rowsPerPage:10, totalCount:0, data:[], searchTerm:"", isLoading:true})
    const [isLoading,setIsLoading] = useState(false)
    const { page, rowsPerPage, totalCount, data, searchTerm } = list
    useEffect(()=>{
        fetchList({page, rowsPerPage})
    },[])
    const handleDelete = (rowsToDelete) => {

    }
    const fetchList = (data) =>{
        setIsLoading(true)
        service.getNewTaskList(data).then((data)=>{
            setList(data)
            setIsLoading(false)
        }).catch(()=>setIsLoading(false))
    }
    const handleList = (data) => fetchList(data)

    const editable = !!data ? data.map(o => ({ ...o })) : []
    const [openAdd,setOpenAdd] = useState(false)
    const [selectedRow,setSelectedRow] = useState(null)
    
    const handleAdd = (event, row) => {
      /**
       * Abrir modal para retorno
       * 
       */
       setIsLoading(true)
      
      service.getDocuments(row.codigo_cliente).then((res)=>{
          setIsLoading(false)
        setSelectedRow({...row,documentos:res.data})
        setOpenAdd(true)
    }).catch((error)=>{
        
        enqueueSnackbar("Ocorreu um problema ao buscar documentos, tente novamente ou contate o suporte.",{variant:"error"})
        setIsLoading(false)
    
    })
      
    }
    const handleAddClose = ()=>setOpenAdd(false)
  
    return (
        <>
            <Add open={openAdd} data={selectedRow} handleClose={handleAddClose}></Add>
            <TableBase
                tableConfigs={
                    {
                        title: "",
                        actions: [actionsLabels.TABLE_REFRESH, /*actionsLabels.TABLE_ADD,*/ actionsLabels.TABLE_EDIT],
                        columns: [

                            { title: "Nome", field: "razao_social" },
                            { title: 'Agência', field: "nome_agencia" },
                            { title: "Telefone", field: "TELEFONE" },

                        ],
                    }
                }
                stateName='returns'
                page={page-1}
                searchTerm={searchTerm}
                isSearchable={false}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                data={editable}
                handleDelete={handleDelete}
                handleList={handleList}
                handleEdit={handleAdd}
                isLoading={isLoading}
                sorting={true}
                maxBodyHeight={300}
                selection={false}
            />
        </>

    )
}