import { useEffect } from 'react';
import './styles.css';
import axios from 'axios'

export const Home = () => {

  useEffect(()=>{
    axios.get('localhost:3001/getdados')
  },[] )
  return (
    <div className="body">
      <header className='header'><h1>Controle financeiro</h1></header>
      <div className='grid'>
        <div className='input_output'>
          <h2>entrada</h2>
          <p>entrada</p>
        </div>
        <div className='input_output'>
          <h2>saida</h2>
          <p>saida</p>
        </div>
        <div className='input_output'>
          <h2>total</h2>
          <p>total</p>
        </div>
      </div>
      <form className='formulario'>
        <fieldset className='input__text'>
          <label>descrição: </label><input type="text" id='descricao' />
          <label>valor: </label><input type="text" />
          <label >data</label><input type="date" className='date' />
        </fieldset>
        <fieldset className='input__radio'>
          <input id='entrada' type="radio" name='condicao'/> <label htmlFor="entrada">entrada</label>
          <input id='saida' type="radio" name='condicao' /> <label htmlFor="saida">saida</label>
        </fieldset>
        <button>Adicionar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th className='th__id'>id</th>
            <th className='th__date'>data</th>
            <th className='th__descricao'>Descrição</th>
            <th className='th__valor'>valor</th>
            <th className='th__condicao'>Condição</th>
          </tr>
        </thead>
      </table>
    
    </div>
  );
}


