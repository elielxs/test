
import { setLogin, setToken } from "src/utils/authBoy";
import configURL from "src/utils/configURL";
import { serviceBoy } from "src/utils/serviceBoy";
export default class LoginService {
    authenticate(params,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            servico.post(('usuarios/logar'), params,false).then((res) => {
                if(res.status == 200){
                  /**
                   * salvar usuário no storage
                  */
                   //login.senha
                  setToken(res.data.resposta.token)
                  setLogin(res.data.resposta.login)
                  resolve({validade:true})
                }else{
                    resolve({validade:false})
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
}
