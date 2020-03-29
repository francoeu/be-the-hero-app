import React from 'react';

export default function Header({ children }){ 
// Posso passar propriedades para o componente Header {props} retorna todo o objeto de propriedades. Posso usar a desestruturação para
// acessar somente a propriedade desejada. EX: { children } filhos do componente
    return(
        <header>
             {/* Defini uma propriedade título para ser inserido o título da Header de forma dinâmica...
                No react as propriedades de componentes são variáveis do JS e para renderizar no HTML
                chamo a propriedade entre chaves {...} */}
            <h1>{children}</h1> 
        </header>
    );
}