import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

export default function  NewAction(){
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ value, setValue ] = useState('')

    const orgId = localStorage.getItem('orgId')

    const history = useHistory()

    async function handleNewAction(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('actions', data, {
                headers: {
                    Authorization: orgId,
                }
            })

            history.push('/profile')
            
        } catch(err){
            alert('Erro ao cadastrar ação, tente novamente.')
        }
    }

    return(
        <div className="new-action-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p> Descreva a ação detalhadamente para encontrar um herói para apoiar esta causa e ajudar a resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                            Voltar para home
                        </Link>

                </section>

                <form onSubmit={handleNewAction}>
                    <input 
                    placeholder="Título da Ação"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                    placeholder="Descrição"
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}