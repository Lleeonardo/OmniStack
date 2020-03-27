import React, { useState } from 'react';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import heroesLogo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon(){
    
    const [id,setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
                const res = await api.post('sessions', { id });

                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', res.data.name);

                history.push('/profile');
                //console.log(res.data.name); Pesquisar: como pego esse valor, se é de outro arquivo
        }catch(err){
                alert("ID inválido, tente novamente :)");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={ heroesLogo } alt="Be The Hero"/>

                <form onSubmit={ handleLogin }> 
                    <h1> Faça seu logon </h1>
                    <input 
                        placeholder="sua ID" 
                        value={id} 
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className="button" type="submit"> Entrar </button>
                    <Link to="/register" className="back-link"> <FiLogIn size={16} color="#E02041" /> Não possuo cadastro </Link>
                </form>
            </section> 

            <img src={ heroesImg } alt="Heroes e pah "/>
        </div>
    );
}