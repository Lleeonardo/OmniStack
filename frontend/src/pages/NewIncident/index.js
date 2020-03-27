import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import heroesLogo from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function NewIncidente(){
    
    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, { headers:{Authorization: ongId}});
            history.push('/profile');

        }catch(err){
            alert("Caso não pôde ser cadastrado :(");
        }

    }

    return(
         <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ heroesLogo } alt="Be The Hero"/>

                    <h1> Cadastrar novo caso </h1>
                    <p> Descreva o caso, que encotramos um heroi para resolver isso </p>

                    <Link to="/profile" className="back-link"> <FiArrowLeft size={16} color="#E02041" /> Voltar para home </Link>
                </section>
                <form onSubmit={ handleNewIncident }>
                    <input 
                        placeholder="Titulo do caso"
                        value = {title}
                        onChange ={e => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value = {description}
                        onChange ={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em R$" 
                        value = {value}
                        onChange ={e => setValue(e.target.value)}
                    />
    
                    <button className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    )
}