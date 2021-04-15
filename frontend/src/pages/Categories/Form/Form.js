import React, { useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '../../../redux/actions/categoryActions';

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing
        },
    },
    paper: {
        padding: theme.spacing(2),
    },    
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',        
    },  
    fileInput: {
        width: '97%',
        margin: '10px 0'
    },  
    buttonSubmit: {
        marginBottom: 10,
    },
    
  }));

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ name: '', imageUrl: '', description: ''});
    const category = useSelector((state) => currentId ? state.categories.find((p) => p._id === currentId) : null);
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        if (category) setPostData(category);
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateCategory(currentId, postData));
        } else {
            dispatch(createCategory(postData)); 
        }        
    }
    
    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Ангилал засах' : 'Ангилал үүсгэх' }</Typography>
                <TextField name="name" variant="outlined" label="Нэр" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                <TextField name="description" variant="outlined" label="Нэмэлт мэдээлэл" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                <div className="fileInput">
                    <input type='file' onChange={(e) => setPostData({...postData, imageUrl: e.target.value})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Хадгалах</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Болих</Button>
            </form>
        </Paper>
    )
}

export default Form;
