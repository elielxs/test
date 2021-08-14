import React, { useState } from 'react';
import { actionsLabels } from 'src/utils/table/actionsBase';
import TableBase from 'src/utils/table/TableBase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TaskService from 'src/services/TaskService';

export default function Returns() {
    
    const navigate = useNavigate()
    const [list,setList] = useState({page:1, rowsPerPage:10, totalCount:0, data:[], searchTerm:"", isLoading:true})
    const [isLoading,setIsLoading] = useState(false)
    const { page, rowsPerPage, totalCount, data, searchTerm } = list
    const service = new TaskService() 
    useEffect(()=>{
        fetchList({page, rowsPerPage})
       
    },[])
    const handleDelete = (rowsToDelete) => {

    }
    const handleList = (data) => {
       fetchList(data)
    }
    const fetchList = (data) => {
        setIsLoading(true)
        service.getReturnList(data).then((data)=>{
            setList(data)
            setIsLoading(false)
        }).catch(()=>setIsLoading(false))
    }
    const handleEdit = (event, row) => {
        navigate(`/app/tasks/${row.codigo_cliente}`,{ state: row })
    }
  
    
    const editable = !!data ? data.map(o => ({ ...o })) : []

    return (
        <TableBase
            tableConfigs={
                {
                    title: "",
                    actions: [actionsLabels.TABLE_REFRESH, /*actionsLabels.TABLE_ADD,*/ actionsLabels.TABLE_EDIT],
                    columns: [

                        { title: "Nome", field: "razao_social" },
                        { title: 'Agência', field: "nome_agencia" },
                        //{ title: "Endereço", field: "endereco" },
                        { title: "Telefone", field: "TELEFONE" },
                        //{ title: "Data", field: "data" },

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
            handleEdit={handleEdit}
            isLoading={isLoading}
            sorting={true}
            maxBodyHeight={300}
            selection={false}
        />
    )
}