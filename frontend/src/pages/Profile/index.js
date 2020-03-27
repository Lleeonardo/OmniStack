import React, { useState,useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import heroesLogo from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(()=>{
        api.get('profile', {
            headers:{
                authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete("incidents/"+id,  {headers: {authorization: ongId }}
            );

            setIncidents(incidents.filter(incident => incident.id !== id));

        }catch(err){
            alert("Caso não pôde ser deletado :(");
        }
    }

    function handleLogout(){
            localStorage.clear();

            history.push('/');
    }

    return (
        <div className="profile-container">
            <header> 
                <img src={ heroesLogo } alt="Be The Hero"/>
                <span> Bem vinda, {ongName} </span>

                <Link to="/incidents/new" className="button"> Cadastrar novo caso </Link>

                <button onClick={ handleLogout } type="button"> <FiPower size={18} color="#E02041"/> </button>
            </header>

            <h1> Casos Cadastrados </h1>

            <ul> 
                    
                    {incidents.map(i => (
                        <li key={i.id}>
                            <strong>CASO: </strong>
                            <p> { i.title } </p>
                            
                            <strong>DESCRIÇÃO: </strong>
                            <p> { i.description } </p>

                            <strong>VALOR: </strong>
                            <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(i.value)} </p>

                            <button onClick={() => handleDeleteIncident(i.id)} type="button"> 
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}