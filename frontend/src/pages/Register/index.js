import React, {useState} from 'react';

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import heroesLogo from '../../assets/logo.svg';
import './styles.css';

export default function Register(){

    const history = useHistory(); // navegação através de uma função js, é claro sem o uso do link
   
    //Estados para guardar as iformações e posteriormente popular o banco
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        const data = {name, email, whatsapp, city, uf};

        try{ 
            const res = await api.post("ongs",data);
            alert("Seu ID:"+res.data.id);

            history.push('/'); //direciona para a rota raiz
 
        }catch(err){
            alert("Erro no cadastro, tente outra vez :)");
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ heroesLogo } alt="Be The Hero"/>

                    <h1> Cadastro </h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG. </p>

                    <Link to="/" className="back-link"> <FiArrowLeft size={16} color="#E02041" /> Não possuo cadastro </Link>
                </section>
                <form onSubmit={ handleRegister }>
                    <input placeholder="Nome da ONG" value={ name } onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={ email } onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={ whatsapp } onChange={e => setWhatsApp(e.target.value)}/>
                    
                    <div className="input-group">
                        <input placeholder="Cidade" value={ city } onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{ width: 80 }} value={ uf } onChange={e => setUf(e.target.value)}/>
                    </div>

                    <button className="button"> Cadastrar </button>
                    
                </form>
            </div>
        </div>
    );
}