import React,{useState, useEffect} from 'react'
import {Grid} from '@material-ui/core';
import { useForm, Form} from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import FileBase from 'react-file-base64';


const initialValues = {    
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    createdAt: new Date()
}
export default function Categoryform(props) {

    const {addOrEdit, recordForEdit} = props;
    
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('name' in fieldValues)
        temp.name = values.name ? "" : "Талбарыг заавар оруулах шаардлагатай!"
        if ('imageUrl' in fieldValues)
        temp.imageUrl = values.imageUrl ? "" : "Талбарыг заавар оруулах шаардлагатай!"
        
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
                <Grid item>
                    <Controls.Input
                        name="name"
                        label="Ангилал нэр"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="description"
                        label="Нэмэлт мэдээлэл"
                        value={values.description}
                        onChange={handleInputChange}                        
                    />                    
                    <div>
                        <FileBase name="imageUrl" error={errors.imageUrl} value={values.imageUrl} type="file" multiple={false} onDone={({base64}) =>setValues({... values, imageUrl: base64})} />
                    </div>
                    {/* <div>
                        <input type='file' onChange={(img) => setValues({ ... values, imageUrl: img.target.files[0].name})}/>
                    </div> */}
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
