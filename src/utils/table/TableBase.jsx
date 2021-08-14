import React, { forwardRef, useCallback, useEffect, useState, memo } from "react";
import { TablePagination, TablePaginationProps, Input, IconButton } from '@material-ui/core';
import Backspace from '@material-ui/icons/Backspace';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import actionsBase from "./actionsBase";
import MaterialTable, { MTableToolbar,MaterialTableProps } from "material-table";
import tableIcons from "../components/tableIcons";

function PatchedPagination(props) {
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;
  
    return (
      <TablePagination
        {...tablePaginationProps}
        // @ts-expect-error onChangePage was renamed to onPageChange
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            // @ts-expect-error ActionsComponent is provided by material-table
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={onPageChange}
            />
          );
        }}
      />
    );
  }
const isActiveSelect = [
    { VALUE: true, DESCRIPTION: 'shared.tables.enabled' },
    { VALUE: false, DESCRIPTION: 'shared.tables.disabled' }
]

const SearchToolbar = memo((props) => {
    const {
        handleList,
        page,
        sort,
        direction,
        rowsPerPage,
        totalCount,
        isActiveFilter,
        isSearchable,
        toolbarFields,
        searchTerm: searchTermFromState,
        isActive: isActiveFromState,
        customFilters,
        handleListCustomState
    } = props

    const [searchTerm, setSearchTerm] = useState(searchTermFromState || '')
    const [isActive, setIsActive] = useState(isActiveFromState || null)

    const handleChangeSearchTerm = useCallback(e => {
        setSearchTerm(e.target.value)
    }, [])

    const handleClearSearch = useCallback(e => {
        setSearchTerm('')
        handleList({ ...handleListCustomState, rowsPerPage, totalCount, page, isActive, searchTerm: '', sort, direction })
    }, [])

    return (
        <div style={{
            padding: '0 8px',
            margin: '-16px 0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <form onSubmit={() => {
                handleList({ ...handleListCustomState, rowsPerPage, totalCount, page:page+1, searchTerm, isActive, sort, direction })
            }}>
                {isSearchable ?
                    <>
                        <Input
                            key="random1"
                            id="search"
                            placeholder={'Busca'}
                            value={searchTerm || ''}
                            onChange={handleChangeSearchTerm}
                        />
                        {!searchTermFromState ? (
                            <IconButton type='submit' variant="outlined">
                                <Search />
                            </IconButton>
                        ) : (
                            <IconButton type='button' variant="outlined" onClick={handleClearSearch}>
                                <Backspace />
                            </IconButton>
                        )}
                    </>
                    : ''
                }



                {customFilters && customFilters.map((filter, index) => {
                    return <span key={index}>{filter}</span>
                })}
                {toolbarFields && toolbarFields.map((field) =>
                    <span>
                        <Input
                            id="random3"
                            placeholder={field.placeholder}
                            value={field.searchTerm}
                            onChange={field.handleChangeSearchTerm}
                        />
                        {!field.searchTermFromState ? (
                            <IconButton type='submit' variant="outlined">
                                <Search />
                            </IconButton>
                        ) : (
                            <IconButton type='button' variant="outlined" onClick={field.handleClearSearch}>
                                <Backspace />
                            </IconButton>
                        )}
                    </span>

                )}

            </form>
        </div>
    )
})

let TableBase = props => {
    const {
        tableConfigs,
        isSearchable,
        handleList,
        handleEdit,
        handleResend,
        handleDelete,
        page,
        rowsPerPage,
        totalCount,
        data,
        handleExport,
        isLoading,
        handleQRCode,
        handleImport,
        handleRowClick,
        handleQuickEdit,
        disablePaging,
        isActiveFilter,
        isActive: isActiveFromState,
        checkRouteLimit: checkLimit,
        sorting,
        searchTerm,
        handleListCustomState: customState,
        maxBodyHeight,
        handleAdd,
        handlePassengerRoutes,
        handleSetViewed,
        selection = true,
        customFilters,
        toolbar = true
    } = props
    const isActive = isActiveFromState || null
    const handleListCustomState = !!customState ? customState : null
/*
    useEffect(() => {
        handleList({ ...handleListCustomState, rowsPerPage, totalCount, page, isActive, sort, direction })
    }, []);
*/
    const [sort, setSort] = useState(null)
    const [direction, setDirection] = useState(null)
    const filteredActions = actionsBase({
        handleList,
        handleEdit,
        handleListCustomState,
        rowsPerPage,
        totalCount,
        page,
        tableConfigs,
        handleAdd,
        handleDelete,
    }).filter((action) => tableConfigs.actions.includes(action.type))

    return (

        <MaterialTable
            
            isLoading={isLoading}
            actions={filteredActions}
            icons={tableIcons}
            columns={tableConfigs.columns}
            onRowClick={handleRowClick ? handleRowClick : null}
            onOrderChange={(orderedColumnId, orderDirection) => {

                setSort(orderedColumnId)
                setDirection(orderDirection)
                handleList({ ...handleListCustomState, totalCount, rowsPerPage, page, isActive, searchTerm, sort: orderedColumnId, direction: orderDirection })
            }}
            onFilterChanged={(columnId, value) => {
                console.log(columnId, value)
            }}
            data={data}
            components={{
                Pagination: (componentProps) => {

                    return (<PatchedPagination
                        {...componentProps}
                        count={totalCount}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onChangePage={(evt, changedPage) => {
                            //let nextPage = changedPage + 1
                            //console.log(changedPage)
                            
                            handleList({ ...handleListCustomState, totalCount, rowsPerPage, page: changedPage+1, isActive, sort, direction, isLoading })
                        }}
                        onSelectionChange={(rows) => {
                            console.log("ROWS -> ", rows)
                        }}
                        onChangeRowsPerPage={(changedRowsPerPage) => {
                            componentProps.onChangeRowsPerPage(changedRowsPerPage)
                            
                            handleList({ ...handleListCustomState, totalCount, rowsPerPage: changedRowsPerPage.target.value, page:page+1, isActive, sort, direction })
                        }}

                    />)
                },
                Toolbar: mTableProps => (
                    isSearchable || isActiveFilter || customFilters ? (
                        <>
                            <MTableToolbar {...mTableProps} />
                            <SearchToolbar {...props} sort={sort} direction={direction} />

                        </>
                    ) : <MTableToolbar {...mTableProps} />
                )
            }}


            options={{
                paging: disablePaging ? false : true,
                headerStyle: { position: 'sticky', top: 0 },
                maxBodyHeight: !!maxBodyHeight ? maxBodyHeight : 500,
                emptyRowsWhenPaging: true,
                pageSizeOptions: [5, 10, 20, 50],
                selection,
                actionsColumnIndex: -1,
                pageSize: rowsPerPage,
                search: false,
                cellStyle: { padding: '0.5em 0.5em 0.5em 0.5em' },
                rowStyle: { padding: '0.2em' },
                sorting: { sorting },
                toolbar
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

            title={tableConfigs.title}
        />


    );
}
TableBase.propTypes = {
    tableConfigs: PropTypes.object.isRequired,
    changeSelection: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    handleList: PropTypes.func.isRequired,
    handleResend: PropTypes.func,
    handleDelete: PropTypes.func.isRequired,
}
export default TableBase
