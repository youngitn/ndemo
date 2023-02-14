import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable, {
    MaterialReactTableProps,
    MRT_Cell,
    MRT_ColumnDef,
    MRT_Row,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { ppm_limits, callAPI } from './makeData';
import { DisableMaterialData } from '../model/DisableMaterialData';
import { MRT_Localization_ZH_HANT } from 'material-react-table/locales/zh-Hant';
import Link from 'next/link';


const DataTable = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<DisableMaterialData[]>(() => []);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});
    useEffect(() => {
        callAPI().then((retData) => {

            setTableData(retData);
        });
        //return () => { alert('ok') }
    }, [])
    const handleCreateNewRow = (values: DisableMaterialData) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits: MaterialReactTableProps<DisableMaterialData>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<DisableMaterialData>) => {
            if (
                !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    //當編輯時會執行的邏輯區塊,目前沒有要開放編輯
    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<DisableMaterialData>,
        ): MRT_ColumnDef<DisableMaterialData>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                //當欄位發生onBlur事件,判斷欄位id綁定以下validate方法
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'id' //id欄位綁定 function validateEmail
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'name' //name欄位綁定 function validateName
                                ? validateName(event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo<MRT_ColumnDef<DisableMaterialData>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: 'cas_no',
                header: 'Cas No',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'category',
                header: '類別',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'name',
                header: 'substance name(英)',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'text',
                }),
            },
            {
                accessorKey: 'name_cn',
                header: '物質名稱(中)',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'text',
                }),
            },
            {
                accessorKey: 'ppm_limit',
                header: '限值(單位:ppm)',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: ppm_limits.map((state) => (
                        <MenuItem key={state} value={state}>
                            {state}
                        </MenuItem>
                    )),
                },
            },
            {
                accessorKey: 'suitable_for',
                header: '適用法規/客戶',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: ppm_limits.map((state) => (
                        <MenuItem key={state} value={state}>
                            {state}
                        </MenuItem>
                    )),
                },
            },
        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <>
            <MaterialReactTable
                // displayColumnDefOptions={{
                //     'mrt-row-actions': {
                //         muiTableHeadCellProps: {
                //             align: 'center',
                //         },
                //         size: 120,
                //     },
                // }}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                //enableColumnOrdering
                enableEditing={false}//關閉action欄位
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                // renderRowActions={({ row, table }) => (
                //     <Box sx={{ display: 'flex', gap: '1rem' }}>

                //         //編輯圖示
                //         <Tooltip arrow placement="left" title="Edit">
                //             <IconButton onClick={() => table.setEditingRow(row)}>
                //                 <Edit />
                //             </IconButton>
                //         </Tooltip>
                //         <Tooltip arrow placement="right" title="Delete">
                //             <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                //                 <Delete />
                //             </IconButton>
                //         </Tooltip> 
                //     </Box>
                // )}
                renderTopToolbarCustomActions={() => (
                    // 改成連結按鈕
                    //<Button
                    //     color="secondary"
                    //     onClick={() => setCreateModalOpen(true)}
                    //     variant="contained"
                    // >
                    //     資料匯入
                    // </Button>
                    <Button variant="contained"
                        href={"http://bpm.topkey.com.tw/index.php?module=xpWizard&func=plm_disable_material_data_upload"}

                    >
                        資料匯入
                    </Button>
                )}
                localization={MRT_Localization_ZH_HANT}
            // localization={{
            //     clearFilter: '清除',
            //     clearSearch: '清除',
            //     clearSort: '清除',
            //     sortByColumnAsc: '按 {column} 升序排序',
            //     sortByColumnDesc: '按 {column} 降序排序',
            //     filterByColumn: '按 {column} 過濾',
            //     hideColumn: '隱藏 {column} 列',
            //     goToFirstPage: '轉到第一頁',
            //     goToLastPage: '轉到最後一頁',
            //     goToNextPage: '轉到下一頁',
            //     goToPreviousPage: '轉到上一頁',
            //     showAll: '顯示全部',
            //     showAllColumns: '顯示所有列',
            //     showHideColumns: '顯示/隱藏列',
            //     showHideFilters: '顯示/隱藏過濾器',
            //     toggleDensity: '切換密度',
            //     toggleFullScreen: '切換全屏',
            //     toggleSelectAll: '切換全選',
            //     toggleSelectRow: '切換選擇行',
            //     toggleVisibility: '切換可見性',
            //     hideAll: '全部隱藏',
            //     resetColumnSize: '重置列大小',
            //     resetOrder: '重設',
            //     showHideSearch: '顯示/隱藏搜索',
            //     rowsPerPage: '每頁筆數',
            //     // ... and many more - see link below for full list of translation keys
            // }}
            />

            {/* <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            /> */}
        </>
    );
};

//新建比數的dialog視窗 example
//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal: FC<{
    columns: MRT_ColumnDef<DisableMaterialData>[];
    onClose: () => void;
    onSubmit: (values: DisableMaterialData) => void;
    open: boolean;
}> = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Account</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>

            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateName = (name: string) => name == 'ytc';






export default DataTable;