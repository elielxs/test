
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    TextField,
    Grid

} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';
import { useState } from 'react';
import "moment/locale/pt-br"
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import TaskService from 'src/services/TaskService';
import moment from 'moment';

const ReturnForm = ({ editMode,data,handleSave}) => {
    const params = useParams()
    const service = new TaskService()
    const [formData,setFormData] = useState(
        {
            observacao: "",
            dataRetorno: new Date(),
           
        }
    )
    useEffect(()=>{
        if(editMode && !!data){
            setFormData({...data,dataRetorno:new Date(data.data_retorno)})
        }
    },[])
    return (
        <>
            <Container maxWidth="lg">
                <Formik
                    initialValues={formData}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
                        dataRetorno: Yup.date().required("Campo obrigatório"),
                        observacao:Yup.string().required("Campo obrigatório")
                    })}
                    onSubmit={(values, actions) => {debugger
                        console.log(values, actions,values.dataRetorno)
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
                                        error={Boolean(touched.observacao && errors.observacao)}
                                        fullWidth
                                        required
                                        helperText={touched.observacao && errors.observacao}
                                        label="Observação"
                                        margin="normal"
                                        name="observacao"
                                        multiline
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.observacao}
                                        variant="outlined"
                                        style={{ marginTop: 15, marginBottom: 15 }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                  
                                 <MuiPickersUtilsProvider locale="pt-br" utils={MomentUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            lang={"pt-br"}
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Data de Retorno"
                                            helperText={touched.dataRetorno && errors.dataRetorno && errors.dataRetorno == 'dataRetorno must be a `date` type, but the final value was: `Invalid Date`.' && 'É necessário uma data válida.'}
                                            error={touched.dataRetorno && errors.dataRetorno && errors.dataRetorno == 'dataRetorno must be a `date` type, but the final value was: `Invalid Date`.' && 'É necessário uma data válida.'}
                                            format="DD/MM/yyyy"
                                            style={{ marginTop: 15, marginBottom: 15, width: "100%" }}
                                            value={values.dataRetorno}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={(date) => {
                                                console.log(date)
                                                setFieldValue("dataRetorno", date)
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
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
                                            {editMode ? "Atualizar retorno" : "Adicionar retorno"  }
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

export default ReturnForm;
