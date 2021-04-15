import React, {useState, useEffect} from 'react'
import Categoryform from './Categoryform';
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles,CardMedia, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import useTable from '../../components/useTable';
import Controls from '../../components/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getCategories as listCategories, getCategoryDetails, createCategory, updateCategory, deleteCategory } from "../../redux/actions/categoryActions";

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
    },
  
    mainContainer: {
        display: 'flex',
        alignItems: 'center'
    },
  
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: 'center'
    },
    media: {
        height: "0",
        paddingTop: "56.25%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }

  }));

export default function Categories() {

    const classes = useStyle();
    const dispatch = useDispatch();
    const getCategories = useSelector((state) => state.getCategories);
    const { categories, loading, error  } = getCategories;
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords]=useState(categories);
    const [filterFn, setFilterFn] = useState({fn: items => { return items; }});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: ''});

    useEffect(() => {
        dispatch(listCategories());            
        //setRecords(categories);      
        console.log('==== Эффект дуудагдсан байна ===');
      }, [dispatch]);
    
    
      const headCells = [
        {id:'imageUrl', label:'Зураг'},
        {id:'name', label:'Ангилалын нэр'},
        {id:'description', label:'Нэмэлт мэдээлэл'},
        {id:'createdAt', label:'Бүртгэсэн огноо'},
        {id: 'actions', label:'Үйлдэл', disableSorting: true}
    ]

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
                return items.filter(x => x.name.toLowerCase().includes(target
                    .value));
            }
        });
    }

    const addOrEdit = (category, resetForm) => {
        try {
            if (category.id == 0)
                dispatch(createCategory(category));
            else
                dispatch(updateCategory(category.id, category));
            
            resetForm();
            setRecordForEdit(null);
            setOpenPopup(false);            
            setRecords(categories);
            
            setNotify({
                isOpen: true,
                message: 'Амжилттай хадгаллаа!',
                type: 'success'
            });
        } catch (error) {
            setNotify({
                isOpen: true,
                message: error.message,
                type: 'error'
            });
        }      
        
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
        //categoryService.destroy(id);
        dispatch(deleteCategory(id));
        setRecords(categories);
        setNotify({
            isOpen: true,
            message: 'Амжилттай устгалаа!',
            type: 'error'
        });    
    }  

    return (
        <>
        <PageHeader
          title='Ангилалын жагсаалт'
          subTitle='Ангилалын дэлгэрэнгүй жагсаалт'
          icon={<CategoryIcon fontSize='large' />}
      />
        <Paper className={classes.pageContent}>            
            <Toolbar>
                <Controls.Input 
                    label="Ангилал хайх"
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
                            <TableCell><CardMedia className={classes.media} image={item.imageUrl} /></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>                            
                            <TableCell>{item.createdAt}</TableCell>
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
                                        onConfirm: () => { onDelete(item._id) } 
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
        title="Ангилал мэдээлэл"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        >
            <Categoryform
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
