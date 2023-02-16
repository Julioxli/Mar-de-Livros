import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";


import axios from "axios";
import Api from "../components/configAPI";



const AddLivroCont = () => {

  let navigate = useNavigate();

  const addlivro = data => Api.post("/livros", data)
  .then(() => {
    console.log("foi");
    navigate("/");
  })
  .catch(() => {
    console.log("ferrou");
  })



  
  const validationLiv = yup.object().shape({
    título: yup.string().required("Está faltando o nome do livro.").max(20, 'Atingiu o nível máximo de caracteres'),
    autor:  yup.string().required("Está faltando o nome do autor.").max(20, 'passo de 20'),
    capa:  yup.string().required("Está faltando a url da imagem."),
    genero: yup.string().required("Está faltando o gênero.").max(20, 'passo de 20'),
    prefacio: yup.string().required("Está faltando o prefácio").max(120, 'passou de 120 caracteres')
  });
  
  
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(validationLiv)
  });
  
  return (    
    <div>
      <h1 className="text-center p-5 font-semibold bg-blue-200">Poste aqui!</h1>
    <form className="xl:flex flex-col items-center justify-center bg-blue-200" onSubmit={handleSubmit(addlivro)}>
      <div className="md:w-1/2 px-3 mb-6 md:mb-0 lg:w-5/12">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Nome do livro
        </label>
        <input className="appearance-none block w-full bg-white text-gray-700 border border-blue-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Digite aqui o nome do seu livro." name='nome'  {...register('nome')} />
        <p className="error-menssange">{errors.título?.message}</p>
      </div>
      <div className="md:w-1/2 px-3 mb-6 md:mb-0 lg:w-5/12">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Autor
        </label>
        <input className="appearance-none block w-full bg-white text-gray-700 border border-blue-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Digite aqui o nome do Autor." {...register('autor')}/>
        <p className="error-menssange"  >{errors.autor?.message}</p>
      </div>
      <div className="md:w-1/2 px-3 mb-6 md:mb-0 lg:w-5/12">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Capa
        </label>
        <input className="appearance-none block w-full bg-white text-gray-700 border border-blue-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Coloque aqui a url da sua capa" {...register('capa')}/>
        <p className="error-menssange">{errors.capa?.message}</p>
      </div>
      <div className="md:w-1/2 px-3 mb-6 md:mb-0 lg:w-5/12">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Gênero
        </label>
        <input className="appearance-none block w-full bg-white text-gray-700 border border-blue-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Digite aqui o gênero do seu livro."  {...register('genero')}/>
        <p className="error-menssange">{errors.genero?.message}</p>
      </div>
      <div class="md:w-1/2 px-3 mb-6 md:mb-0 ">
           <label  class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 xl:p-4">Prefacio</label>
           <textarea  rows="4" class="block px-5 p-2.5 min-w-full  text-sm text-gray-700  text-deco  bg-white rounded-lg border border-blue-900 focus:border-blue-600 shadow-none outline-none" placeholder="Faça um resumo de como é a história do livro."  {...register('prefacio')}/>
           <p className="error-menssange">{errors.prefacio?.message}</p>
       </div>
       <div className="flex justify-center">
       <button type="submit" class="py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-900 rounded shadow-lg focus:outline-none hover:bg-blue-400 hover:shadow-none">
        Publicar
      </button>
      </div>
  </form>
  </div>




  


  );
}

export default AddLivroCont