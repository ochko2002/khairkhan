import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography  } from '@material-ui/core';
import Controls from '../../../components/controls/Controls';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import './Category.css';

import { deleteCategory} from '../../../redux/actions/categoryActions';

 const Category = ({ category, setCurrentId }) => {
     const dispatch = useDispatch();
     //const {addOrEdit, category} = props;
     const headCells = [
        {id:'fullName', label:'Ажилтны нэр'},
        {id:'email', label:'И-мэйл хаяг (Хувийн)'},
        {id:'mobile', label:'Утасны дугаар'},
        {id:'department', label:'Хэлтэс, тасаг'},
        {id: 'actions', label:'Үйлдэл', disableSorting: true}
    ]

    return (
        <Card className='card'>
            <CardMedia className='media' image={category.imageUrl} />
            <div className="overlay">
                    <Typography variant="h6">{category.name}</Typography>
            </div>
            {/* <div className={details}>
                <Typography variant="body2" color="textSecondary">{}</Typography>
            </div> */}
            <CardContent>
                <Typography className="title" variant="h5" gutterBottom>{category.description}</Typography>
            </CardContent>
            <CardActions>
                <Controls.ActionButton color="primary" onClick = {() => {setCurrentId(category._id)}}>
                    <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton color="secondary"
                        onClick={() => {                            
                            dispatch(deleteCategory(category._id))
                        }
                    }>
                    <CloseIcon fontSize="small" />
                </Controls.ActionButton>
            </CardActions>
        </Card>
    )
}

export default Category;
