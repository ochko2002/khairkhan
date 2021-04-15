import React,{useState, useEffect} from 'react'
import {Grid} from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { CardMedia } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useForm, Form} from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import "./Productform.css";

// Actions
import { getCategories } from "../../redux/actions/categoryActions";

const initialValues = {
    id:0,
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    price: '', 
    mobilePhone: '',
    createdAt: new Date()    
}
export default function Productform(props) {

    const {addOrEdit, recordForEdit} = props;
    const dispatch = useDispatch();
    const {selectedImages, setSelectedImage} = useState([]);

    const categoryDetails = useSelector((state) => state.getCategories);
    const { categories } = categoryDetails;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('name' in fieldValues)
        temp.name = values.name ? "" : "Талбарыг заавар оруулах шаардлагатай!"        
        if ('imageUrl' in fieldValues)
        temp.imageUrl = values.imageUrl ? "" : "Талбарыг заавар оруулах шаардлагатай!" 
        if ('category' in fieldValues)
        temp.category = values.category !=0 ? "" : "Талбарыг заавар оруулах шаардлагатай!"
        setErrors({
            ...temp
        })

        if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);    

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }            
    }

    useEffect(() => {
        if (recordForEdit != null)
        setValues({
            ...recordForEdit
        });
    }, [recordForEdit]);

    return (        
            <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Бүтээгдэхүүний нэр"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Select
                        name="category"
                        label="Ангилал"
                        value={values.category}
                        onChange={handleInputChange}
                        options={categories}
                        error={errors.category}
                    />
                    <Controls.Input
                        name="price"
                        label="Үнэ"
                        value={values.price}
                        onChange={handleInputChange}                        
                    />
                    <Controls.Input
                        name="mobilePhone"
                        label="Утас"
                        value={values.mobilePhone}
                        onChange={handleInputChange}                        
                    />           
                    <Controls.Input
                        name="description"
                        label="Нэмэлт мэдээлэл"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <h3 className="heading">Зураг оруулах</h3>
                        <div>
                        <CardMedia className="img-holder" image={selectedImages} />
                        </div>
                        <div>
                            <FileBase name="imageUrl" error={errors.imageUrl} value={values.imageUrl} type="file" multiple={false} onDone={({base64}) =>{setValues({... values, imageUrl: base64}); setSelectedImage(base64);}} />
                        </div>
                    </div>                                    
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Хадгалах"
                        />
                        <Controls.Button
                            color="default"
                            text="Болих"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
            </Form>
    )
}
