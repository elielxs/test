import React from "react";

import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Send from '@material-ui/icons/Send';
import UpdateIcon from '@material-ui/icons/Update';
import Edit from '@material-ui/icons/Edit';
import Cached from '@material-ui/icons/Cached';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { DirectionsBus } from "@material-ui/icons";


export const actionsLabels = {
    TABLE_REFRESH: "TABLE_REFRESH",
    TABLE_ADD: "TABLE_ADD",
    TABLE_DELETE: "TABLE_DELETE",
    TABLE_EDIT: "TABLE_EDIT",
    TABLE_RESEND: "TABLE_RESEND",
    OPEN_ADDRESS: "OPEN_ADDRESS",
    TABLE_EXPORT: "TABLE_EXPORT",
    TABLE_QRCODE: "TABLE_QRCODE",
    TABLE_IMPORT: "TABLE_IMPORT",
    TABLE_PASSENGER_ROUTES: "TABLE_PASSENGER_ROUTES",
    TABLE_QUICK_EDIT: "TABLE_QUICK_EDIT",
    TABLE_SET_VIEWED: "TABLE_SET_VIEWED",
}

export default (
    {
        
        handleList,
        handleEdit,
        handleListCustomState,
        rowsPerPage,
        totalCount,
        page,
        isActive,
        sort,
        direction,
        tableConfigs,
        
        handleAdd,
        handleDelete,
        
        searchTerm,
        history,
    
    })=>[
    
    
    {
        icon: () => <Cached fontSize="small" />,
        tooltip: 'Atualizar',
        isFreeAction: true,
        onClick: (event) => handleList({ ...handleListCustomState, rowsPerPage, totalCount, page:page+1 }),
        type: actionsLabels.TABLE_REFRESH
    },
    {
        icon: () => <AddBox fontSize="small" />,
        tooltip: "Adicionar",
        isFreeAction: true,
        onClick: handleAdd,
        type: actionsLabels.TABLE_ADD
    },
    {
        icon: () => <Edit style={{ fontSize: 15 }} />,
        tooltip: "Edição",
        onClick: handleEdit,
        type: actionsLabels.TABLE_EDIT,
        position: "row"
    },
    {
        icon: () => <DeleteOutline style={{ fontSize: 15 }} />,
        tooltip: "Excluir",
        onClick: (event, rowData) => {
            let rowsToDelete
            if (rowData.length > 0) {
                rowsToDelete = rowData.map(row => row)
                handleDelete(rowsToDelete).then(() => {
                    handleList({ ...handleListCustomState, rowsPerPage, totalCount, page: 0, isActive, sort, direction })
                })
            }
        },
        type: actionsLabels.TABLE_DELETE
    },
   
   
]