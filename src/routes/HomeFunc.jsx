import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../components/configAPI";

import { useNavigate } from "react-router-dom"
import ButtonForm from "../components/Button/ButtonForm"
import useAuth from "../hooks/useAuth"

import '../routes/HomeFunc.css'






const ContHome = () => {

  const { signout } = useAuth();
  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);

  const getLivros = async() => {

    try {

      const response = await Api.get(`/livros`);
      

      const data = response.data;

      setLivros(data);

      console.log(data);
      
    } catch (error) {
      console.log(error);
    }

  }
  

  useEffect(() => {

    getLivros();

  }, [])

  function deletelivro(id) {
    Api.delete(`livros/${id}`)
   setLivros( livros.filter(livro => livro.id !== id))
  }

  
    
      

  if(!livros || !livros.length) return <div className='loading'>carregando</div>

  // '/livro/${livro.id}'



  return (

    <div className='estante'>
      {livros.map((livro, key) => {
        const { id, título, capa, autor, prefacio, preco, genero} = livro;

        return(
          <div className="livro">
            <img className="capa" src={capa} alt={título} />
            <div className="inform">
            <h1>{título}</h1>
            <p>{autor}</p>
            </div>
            <div className="btns">
              <button><Link to={`/edit/${id}`} >Edit</Link></button>
              <button><Link to={`/lermais/${id}`} >Ler Mais</Link></button>
              <button onClick={() => deletelivro(livro.id)}>Delete</button>
            </div>
            <hr></hr>
          </div>
        )

        })}

    <div>
      <title>Home</title>
      <ButtonForm text="Sair" onClick={() => [signout(), navigate("/")]}/>
    </div>

  </div>

  )
}

export default ContHome