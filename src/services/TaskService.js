import axios from "axios";
import { setToken } from "src/utils/authBoy";
import configURL from "src/utils/configURL";
import { serviceBoy } from "src/utils/serviceBoy";
export default class TaskService {
    getNewTaskList(params,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            const {page,rowsPerPage} = params
            var url = `novastarefas/listar/${page}/${rowsPerPage}`
            servico.get(url).then((res) => {
                
                if(res.status == 200){
                    const {pagina,linhasPorPagina,total,data} = res.data.resposta
                    resolve({page:pagina,rowsPerPage:linhasPorPagina,totalCount:total,data})
                }else{
                    resolve([])
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
    getDocuments(id,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            var url = `documentos/listar/0/0/${id}`
            servico.get(url).then((res) => {
                
                if(res.status == 200){
                    const {pagina,linhasPorPagina,total,data} = res.data.resposta
                    resolve({data:res.data.resposta.data})
                }else{
                    resolve([])
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
    getReturnList(params,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            const {page,rowsPerPage} = params
            var url = `retornotarefas/listar/${page}/${rowsPerPage}`
            servico.get(url).then((res) => {
                
                if(res.status == 200){
                    const {pagina,linhasPorPagina,total,data} = res.data.resposta
                    resolve({page:pagina,rowsPerPage:linhasPorPagina,totalCount:total,data})
                }else{
                    resolve([])
                }
              }).catch((erro) => {
                  reject(erro)
              });
        })
    
    }
   
    store(params,servico = serviceBoy) {
        return new Promise((resolve,reject)=>{
            
            const {negociado, condicao,finalizado,data_retorno,observacao,documentos,chave} = params
            const documentosFiltrados = []
            documentos.forEach((item)=>documentosFiltrados.push({documento:item.id}))
            debugger
            console.log({negociado,finalizado,documentos,documentosFiltrados,registros:{observacao,data_retorno}})
            servico.post('tarefas/inserir', {tarefa:{condicao,chave,negociado,finalizado,documentos:documentosFiltrados,registros:{observacao,data_retorno}}}).then((res) => {
               
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
            
            const {id,negociado, condicao,finalizado} = params
            servico.put(`tarefas/atualizar/0/0/${id}`, {tarefa:{condicao,negociado,finalizado}}).then((res) => {
               
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
            
            servico.delete(`tarefas/deletar/0/0/${id}`).then((res) => {
               
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
