import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

export default function  Profile(){
    const [actions, setActions] = useState([])

    const history =  useHistory()

    const orgId = localStorage.getItem('orgId')
    const orgName = localStorage.getItem('orgName')

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: orgId
            }
        }).then(response => {
            setActions(response.data)
        })
    }, [orgId]);

    async function handleDeleteAction(id){
        try{
            await api.delete(`actions/${id}`, {
                headers:{
                    Authorization: orgId,
                }
            });
            setActions(actions.filter(action => action.id !==  id)); //Após deletar, faz uma varredura filtrando os itens atuais e retornando o que for diferente do ID deletado.
        }catch(err){
            alert('Erro ao deletar ação, tente novamente.')
        }
    }
// Pq handle ? Para identificar funções que tem a ver com ações do usuário. (Prática do Diego da RocketSeat)
    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
      <div className="profile-container">
          <header>
              <img src={logoImg} alt="Be The Hero"/>
              <span>Bem vinda, {orgName} </span>

              <Link className="button" to="/actions/new">Cadastrar nova ação</Link>
              <button onClick={handleLogout} type="button">
                  <FiPower size={18} color="#E02041" />
              </button>
          </header>

          <h1>Ações cadastradas</h1>

          <ul>
          {actions.map(action => (
                  <li key={action.id}>
                  <strong>AÇÃO:</strong>
                  <p>{action.title}</p>

                  <strong>DESCRIÇÃO::</strong>
                  <p>{action.description}</p>

                  <strong>VALOR:</strong>
                  <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(action.value)}</p>

                  <button onClick={() => handleDeleteAction(action.id)} type="button">
                      <FiTrash2 size={20} color="#a8a8b3"/>
                  </button>
              </li>
          ))}
          </ul>
      </div>
    );
}