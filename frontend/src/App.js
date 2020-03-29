import React from 'react';

import './global.css'
import Routes from './routes';


/* 
 ESTADO: Uma informação que precisa ser mantida pelo componente. EX: Um componente precisa armazenar uma informação vinda pelo input
 de um usuário, ou dados vindos de uma API externa, para modificá-las, adicionar itens, excluir...Para isso é utilizado o conceito de
 estado STATE.S
*/

function App() {
  return (
    <Routes/> 
  );
}

export default App;
