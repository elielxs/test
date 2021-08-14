
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Container,
    TextField,
    Grid,
    Autocomplete,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,

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

const TaskForm = ({ editMode,data,handleSave, documentos = [] }) => {
    const [formData,setFormData] = useState(
        {
            observacao: "",
            condicao: "",
            documentos: [],
            dataRetorno: new Date(),
            negociado: "N",
            finalizado: "N",
            chave:null
        }
    )
    useEffect(()=>{
        debugger
        if(!!data && data.codigo_cliente != null)
            setFormData({...formData,chave:data.codigo_cliente})

        if(editMode && !!data){
            setFormData(data)
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
                        observacao: Yup.string().required("Campo obrigatório"),
                        documentos:Yup.array().required("Selecione ao menos um documento")
                    })}
                    onSubmit={(values, actions) => {
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
                                    <Autocomplete
                                        
                                        
                                        disablePortal
                                        multiple
                                        onChange={(event, newValue) => {
                                            setFieldValue("documentos", newValue)
                                        }}
                                        id="documentos"
                                        style={{ width: "100%" }}
                                        on
                                        options={documentos.map((doc) => ({ label: `(${doc.data_lancamento}) ${doc.nome_loja} R$ ${doc.saldo} `, id: doc.documento }))}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} error={Boolean(touched.documentos && errors.documentos)} helperText={touched.documentos && errors.documentos} label="Documentos" />}
                                    />
                                    
                                </Grid>
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
                                            onChange={(date) => setFieldValue("dataRetorno", date)}
                                        />
                                    </MuiPickersUtilsProvider>
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

export default TaskForm;
