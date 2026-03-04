function CriarLista(){
    
}
class BD{
    constructor(){
        let id = localStorage.getItem('id');
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1;
    }
}