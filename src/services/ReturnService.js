import axios from "axios";
import { setToken } from "src/utils/authBoy";
import configURL from "src/utils/configURL";
import { serviceBoy } from "src/utils/serviceBoy";
export default class ReturnService {
    store(params,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            debugger
            const {id_tarefa,data_retorno,observacao} = params
            servico.post('registros/inserir',{"registro": {id_tarefa,observacao,data_retorno}}).then((res) => {
              
                if(res.status == 200){
                    resolve(res.data.resposta)
                }else{
                    resolve([])
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
    update(params,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            debugger
            const {id,observacao,data_retorno} = params
            servico.put(`registros/atualizar/0/0/${id}`, {registro:{observacao,data_retorno}}).then((res) => {
               
                if(res.status == 200){
                    resolve(res.data.resposta)
                }else{
                    resolve([])
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
    delete(id,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            debugger
            servico.delete(`registros/deletar/0/0/${id}`).then((res) => {
               
                if(res.status == 200){
                    resolve(res.data.resposta)
                }else{
                    resolve([])
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
   
}
