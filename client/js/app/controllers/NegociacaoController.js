class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
   
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona' , 'esvazia');
 
        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#MensagemView')),
            'texto');
 
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso ! '
        
        
        this._limpaFormulario();   

        //this._mensagemLimpa();
        
    }

    importaNegociacoes(){
        let xhr = new XMLHttpRequest();

        xhr.open('GET','negociacoes/semana');

        xhr.onreadystatechange = () =>{
            /*
            0 : requisição ainda não iniciada
            1 : conexão com o servidor estabelecida
            2 : requisição recebida
            3 : processando requisição
            4 : requisição concluida e a resposta esta pronta
            */

            if (xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log('Obtendo negociações do Servidor ... OK');
                    console.log(xhr.responseText);
                } else {
                    console.log('Não foi possível obter as negociações do servidor !');
                    console.log(xhr.responseText);
                }
            }


        }

        xhr.send();

        

    }


    apaga(){
        this._listaNegociacoes.esvazia();
        
        this._mensagem.texto = 'Lista de negociações apagadas com sucesso !';
     

        //this._mensagemLimpa();

    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    async _mensagemLimpa(){
        await new Promise(res => { setTimeout(res, 3000); });
        this._mensagem.texto = '';
        
    }
}