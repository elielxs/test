import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const ClientForm = (props) => {
  console.log(props.customerSelected)
  
  const {customerSelected} = props
  useEffect(()=>{
    if(!!customerSelected){
      setValues(customerSelected)
    }
  },[customerSelected])
  const [values, setValues] = useState({
    "razao_social": "",
		"cnpj": "",
		"telefone": "",
		"celular": "",
		"email": "",
		"sexo": "",
		"codigo_agencia": ""
  })
  console.log(values)
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader=""
          title={values.razao_social}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
          
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                disabled={true}
                label="CNPJ"
                name="cnpj"
                value={values.cnpj}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                disabled={true}
                label="E-mail"
                name="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                disabled={true}
                label="Sexo"
                name="sexo"
                value={values.sexo}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                disabled={true}
                label="Telefone"
                name="telefone"
                value={values.telefone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                disabled={true}
                label="Celular"
                name="celular"
                value={values.celular}
                variant="outlined"
              />
            </Grid>
          
            
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                disabled={true}
                label="Código da âgência"
                name="codigo_agencia"
                value={values.codigo_agencia}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
       
      </Card>
    </form>
  );
};

export default ClientForm;
