import React, {useState, useEffect} from 'react'
import Productform from './Productfrom';
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles,CardMedia, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
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
import { getProducts as listProducts, getProductDetails, createProduct, updateProduct, deleteProduct } from "../../redux/actions/productActions";

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

export default function Products() {

    const classes = useStyle();
    const dispatch = useDispatch();
    const getProducts = useSelector((state) => state.getProducts);
    const { products, loading, error  } = getProducts;
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords]=useState(products);
    const [filterFn, setFilterFn] = useState({fn: items => { return items; }});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: ''});

    useEffect(() => {
        dispatch(listProducts());            
        //setRecords(categories);      
        console.log('==== ???????????? ???????????????????? ?????????? ===');
      }, [dispatch]);
    
      const headCells = [
        {id:'imageUrl', label:'??????????'},
        {id:'category', label:'??????????????'},
        {id:'name', label:'????????????????????????'},
        {id:'mobilePhone', label:'????????'},
        {id:'price', label:'??????'},
        {id:'description', label:'???????????? ????????????????'},
        {id:'createdAt', label:'?????????????????? ??????????'},
        {id: 'actions', label:'????????????', disableSorting: true}
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

    const addOrEdit = (product, resetForm) => {
        try {
            if (product.id == 0)
                dispatch(createProduct(product));
            else
                dispatch(updateProduct(product.id, product));
            
            resetForm();
            setRecordForEdit(null);
            setOpenPopup(false);            
            setRecords(products);
            
            setNotify({
                isOpen: true,
                message: '?????????????????? ??????????????????!',
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
        dispatch(deleteProduct(id));
        setRecords(products);
        setNotify({
            isOpen: true,
            message: '?????????????????? ????????????????!',
            type: 'error'
        });    
    }  

    return (
        <>
        <PageHeader
          title='???????????????????????? ????????????????'
          subTitle='???????????????????????????? ?????????????????????? ????????????????'
          icon={<FileCopyIcon fontSize='large' />}
      />
        <Paper className={classes.pageContent}>            
            <Toolbar>
                <Controls.Input 
                    label="???????????????????????? ????????"
                    className={classes.searchInput}
                    InputProps= {{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Controls.Button
                text = "??????????"
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
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.mobilePhone}</TableCell>
                            <TableCell>{item.price}</TableCell>
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
                                        title: '???? ?????? ?????????????????? ?????????????????? ???????????????? ?????????? ????!',
                                        subTitle: '???? ?????? ???????????????? ???????????? ??????????????????!',
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
        title="???????????????????????? ????????????????"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        >          
            <Productform
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
