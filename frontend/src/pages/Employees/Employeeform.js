import React,{useState, useEffect} from 'react'
import {Grid} from '@material-ui/core';
import { useForm, Form} from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import * as employeeService from "../../services/employeeService";


const genderItems = [
    {id:'male', title:'Эр'},
    {id:'female', title:'Эм'},
    {id:'other', title:'Бусад'},
]
const initialValues = {
    id:0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId:'',
    hireDate: new Date(),
    isPermanent: false
}
export default function Employeeform(props) {

    const {addOrEdit, recordForEdit} = props;
    
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('fullName' in fieldValues)
        temp.fullName = values.fullName ? "" : "Талбарыг заавар оруулах шаардлагатай!"
        if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "И-мэйл хаяг буруу байна!"
        if ('mobile' in fieldValues)
        temp.mobile = values.mobile.length>9 ? "" : "Багадаа 10 орон шаардлагатай!"
        if ('departmentId' in fieldValues)
        temp.departmentId = values.departmentId !=0 ? "" : "Талбарыг заавар оруулах шаардлагатай!"
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
                        name="fullName"
                        label="Овог нэр"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        name="email"
                        label="И-мэйл"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="mobile"
                        label="Утас"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />           
                    <Controls.Input
                        name="city"
                        label="Хот"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup 
                        name="gender"
                        label="Хүйс"
                        value={values.gender}
                        onChange = {handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Хэлтэс"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    {/* <Controls.DatePicker
                        name="hireDate"
                        label="Огноо"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    /> */}
                    <Controls.Checkbox 
                        name="isPermanent"
                        label="Гэрээт ажилтан"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />
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
