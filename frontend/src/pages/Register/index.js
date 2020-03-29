import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function  Register(){
    // Usando ESTADO para pegar e armazenar os inputs do usuário para poder enviar para o Banco de dados.
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ whatsapp, setWhatsapp ] = useState('')
    const [ city, setCity ] = useState('')
    const [ uf, setUf ] = useState('')

    const history = useHistory()

   async function handleRegister(e){
        e.preventDefault();

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf
        })

       try{
        const response = await api.post('/orgs', data)

        alert(`Seu ID de acesso: ${response.data.id}`)

        history.push('/') // Envia o usuário de volta a rota inicial (Página de Login)
       } catch (err){
           alert('Erro no cadastro, tente novamente.')
       }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a se unirem as ações promovidas
                        pela sua Instituição em prol da comunidade na luta contra o Coronavírus.
                    </p>

                    <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#E02041" />
                            Já tenho cadastro
                        </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Instituição"
                    value={name} // O valor do INPUT recebe a variável do ESTADO.
                    onChange={e => setName(e.target.value)} // Fica ouvindo as mudanças no INPUT. Pega o evento e mudança e joga o valor do INPUT em setName.
                    />
                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                     value={whatsapp}
                     onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                         value={city}
                         onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{ width: 80, }}
                         value={uf}
                         onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}