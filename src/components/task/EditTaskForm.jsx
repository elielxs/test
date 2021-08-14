
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
    Grid,
    Autocomplete,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    colors,
    withStyles,

} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';
import { useState } from 'react';
import "moment/locale/pt-br"
import PurpleRadio from "../../utils/components/PurpleRadio"
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import TaskService from 'src/services/TaskService';

const EditTaskForm = ({ editMode,data,handleSave }) => {
    const params = useParams()
    const service = new TaskService()
    const [formData,setFormData] = useState(
        {
            condicao: "",
            negociado: "N",
            finalizado: "N",
        }
    )
    useEffect(()=>{
        if(editMode && !!data){
            setFormData(data)
        }
    },[])
    console.log(data)
    return (
        <>
            <Container maxWidth="lg">
                <Formik
                    initialValues={formData}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
                        
                    })}
                    onSubmit={(values, actions) => {
                        console.log(values, actions)
                        handleSave(values)

                    }}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        touched,
                        values
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    pb: 1,
                                    pt: 1
                                }}
                            >
                            </Box>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                               
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <TextField
                                        error={Boolean(touched.condicao && errors.condicao)}
                                        fullWidth
                                        helperText={touched.condicao && errors.condicao}
                                        label="Condição"
                                        margin="normal"
                                        name="condicao"
                                        multiline
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.condicao}
                                        variant="outlined"
                                    />
                                </Grid>
                                
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    display="block"
                                >
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Negociado</FormLabel>
                                        <RadioGroup row aria-label="negociado" name="row-radio-buttons-group" value={values.negociado} onChange={(event) => setFieldValue("negociado", event.target.value)}>
                                            <FormControlLabel value={"S"} checked={values.negociado === "S"} control={<PurpleRadio />} label="Sim" />
                                            <FormControlLabel value={"N"} checked={values.negociado === "N"} control={<PurpleRadio />} label="Não" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    display="block"
                                >
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Finalizado</FormLabel>
                                        <RadioGroup row aria-label="finalizado" name="row-radio-buttons-group" value={values.finalizado} onChange={(event) => setFieldValue("finalizado", event.target.value)}>
                                            <FormControlLabel value={"S"} checked={values.finalizado === "S"} control={<PurpleRadio />} label="Sim" />
                                            <FormControlLabel value={"N"} checked={values.finalizado === "N"} control={<PurpleRadio />} label="Não" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid md={12} xs={12} display="block">
                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            Salvar
                                        </Button>
                                    </Box>
                                </Grid>


                            </Grid>
                        </form>
                    )}
                </Formik>
            </Container>

        </>
    );
};

export default EditTaskForm;
