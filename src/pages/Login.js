import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import configURL from 'src/utils/configURL';
import { useState } from 'react';
import { setToken } from 'src/utils/authBoy';
import LoginService from 'src/services/LoginService';
import { useSnackbar } from 'notistack';


const Login = () => {
  const navigate = useNavigate();
  const service =  new LoginService();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
    enqueueSnackbar(msg,{ 
      variant: 'error',
    })
    //closeSnackbar(msg)
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              login: '',
              senha: ''
            }}
            validationSchema={Yup.object().shape({
              login: Yup.string()/*.email('Insira um e-mail válido').max(255)*/.required('Login é obrigatório!'),
              senha: Yup.string().max(255).required('Senha é obrigatório!')
            })}
            onSubmit={(values, actions) => {
              service.authenticate(values).then((resposta)=>{
                debugger
                if(resposta.validade){
                  navigate('/app/tasks', { replace: true });  
                }else{
                  handleServerResponse(false, "Usuário ou senha inválidos");
                }
                actions.setSubmitting(false); 
              }).catch((erro)=>{debugger
                if(!!erro && erro.response){
                  
                  handleServerResponse(false, erro.response.data.error);
                }else{
                  handleServerResponse(false, "Usuário ou senha inválidos.");
                }
                actions.setSubmitting(false);
              })
              
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                  >
                    Insira seu login.
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Login"
                  margin="normal"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.login}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.senha && errors.senha)}
                  fullWidth
                  helperText={touched.senha && errors.senha}
                  label="Senha"
                  margin="normal"
                  name="senha"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.senha}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
              
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  {' '}
                 
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
