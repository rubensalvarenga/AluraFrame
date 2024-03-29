class ProxyFactory{
    static create(objeto,props,acao){

        return new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                    return function(){
                    console.log(`método '${prop}' interceptado`);
                    Reflect.apply(target[prop], target, arguments);
                    return acao(target);

                }
            }
            return Reflect.get(target, prop, receiver);
        
        },

        set(target, prop, value, receiver){
            if(props.includes(prop)){
                acao(target);
                console.log(value);
            }
            
                return Reflect.set(target, prop, value, receiver);
           
        }

        });

      
    }
    static _ehFuncao(func){
         return typeof(func) == typeof(Function);
    }
}