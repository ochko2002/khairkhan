import React, {useState} from 'react'
import Employeeform from "./Employeeform";
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import useTable from '../../components/useTable';
import Controls from '../../components/controls/Controls';
import * as employeeService from '../../services/employeeService';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';

const useStyle = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id:'fullName', label:'Ажилтны нэр'},
    {id:'email', label:'И-мэйл хаяг (Хувийн)'},
    {id:'mobile', label:'Утасны дугаар'},
    {id:'department', label:'Хэлтэс, тасаг'},
    {id: 'actions', label:'Үйлдэл', disableSorting: true}
]

export default function Employees() {

    const classes = useStyle();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords]=useState(employeeService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({fn: items => { return items; }});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: ''});

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                return items;
                else
                return items.filter(x => x.fullName.toLowerCase().includes(target
                    .value));
            }
        });
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            employeeService.insertEmployee(employee);
        else
            employeeService.updateEmployee(employee);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Амжилттай хадгаллаа!',
            type: 'success'
        });
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Амжилттай устгалаа!',
            type: 'error'
        });    
    }

    return (
        <>
        <PageHeader
            title='Ажилтны жагсаалт'
            subTitle='Ажилтны дэлгэрэнгүй жагсаалт'
            icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
        />
        <Paper className={classes.pageContent}>            
            <Toolbar>
                <Controls.Input 
                    label="Ажилтан хайх"
                    className={classes.searchInput}
                    InputProps= {{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Controls.Button
                text = "Нэмэх"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {setOpenPopup(true);setRecordForEdit(null);}}
                />
            </Toolbar>              
            <TblContainer>
                <TblHead />
                <TableBody>
                {
                    recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>
                                <Controls.ActionButton
                                color="primary"
                                onClick = {() => {openInPopup(item)}}>
                                    <EditOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                color="secondary"
                                onClick={() => {
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: 'Та энэ бичлэгийг устгахдаа итгэлтэй байна уу!',
                                        subTitle: 'Та энэ үйлдлийг буцаах боломжгүй!',
                                        onConfirm: () => { onDelete(item.id) } 
                                    });                                    
                                    }
                                }>
                                    <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </Paper>
        <Popup
        title="Ажилтны мэдээлэл"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        >
            <Employeeform
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit} />
        </Popup>
        <Notification
        notify={notify}
        setNotify={setNotify}
        />
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </>
    )
}
