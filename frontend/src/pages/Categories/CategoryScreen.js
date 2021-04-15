import React, {useState, useEffect} from 'react';
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles, Paper,  Toolbar, Grid, CircularProgress  } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import Controls from '../../components/controls/Controls';
import { Link } from "react-router-dom";
import Categoryform from './Categoryform';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from "react-redux";
import Category from './Category/Category';
import Form from './Form/Form';

// Actions
import { getCategories as listCategories, getCategoryDetails } from "../../redux/actions/categoryActions";

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
  }
}))


const CategorScreen = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const getCategories = useSelector((state) => state.getCategories);
  const {categories, loading, error} = getCategories;
  
  const [filterFn, setFilterFn] = useState({fn: items => { return items; }});
 
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

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

const addHandler = () => {
    dispatch(getCategoryDetails(null));
    
    
  };
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
              onClick={addHandler}
              />
          </Toolbar>              
          {
            loading ? (<h2>Ачаалж байна...</h2>) : error ? (<h2>{error}</h2>) :
              (
                  <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                      {
                          categories.map((category) => (
                              <Grid key={category._id} item xs={12} sm={6}>
                                  <Category category={category} currentId={category._id} setCurrentId={setCurrentId}  />  
                              </Grid>
                          ))
                      }
                  </Grid>
              )
          }
          
      </Paper>      
      </>
        
      );
}

export default CategorScreen;


