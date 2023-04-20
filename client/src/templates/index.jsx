import { useEffect, useState } from 'react';
import './styles.css';
import Axios from 'axios';
import { Form } from '../components/Form';
import { Edit } from '../components/Form/edit';
import { Chart } from "react-google-charts";



export const Home = () => {
  const [dados,setDados]= useState([0]); 
  const [editDados,setEditDados] = useState();
  const [openEdit,setOpenEdit] = useState();
  const [entrada,setEntrada]= useState(0);
  const [saida,setSaida] = useState(0);
  const [total,setTotal]= useState(0);
  const [values,setValues] = useState();
  const [isOpen,setIsOpen]= useState(false);
  const [dadosGrafico,setDadosGraficos] = useState();
  const url = 'http://localhost:3001/';

  const calcula=()=>{
    var auxE = 0;
    var auxS = 0;
    dados.forEach(element => {
  
      if(element.condicao === "entrada"){
        auxE = auxE+ element.valor
        setEntrada(auxE.toFixed(2))
      }
      if(element.condicao === "saida"){
        auxS = auxS+ element.valor
        setSaida(auxS.toFixed(2))
      }
    });
    setTotal((auxE-auxS).toFixed(2));
  }

  const getDados = () =>{
    Axios.get(`${url}getdados`).then((res)=>{setDados(res.data)})
  }

  useEffect(()=>{
    getDados();
  },[] )
  useEffect(()=>{
    calcula()
  },[dados]);
   
 const data = (props) =>{
  if(typeof props !== 'undefined'){
    var string = props
    const [ano,mes,edia]= string.split('-',3);
    const dia = edia.substr(0,2)
    const result = ano+'-'+mes+'-'+dia
  return result
  }
  else return ''
 }

  return (
    <div className="body">
      <header className='header'><h1>Controle financeiro</h1></header>
      <div className='grid'>
        <div className='input_output'>
          <h2>entrada</h2>
          <p className='green'>R$:{entrada}</p>
        </div>
        <div className='input_output'>
          <h2>saida</h2>
          <p className='red'>R$:{saida}</p>
        </div>
        <div className='input_output'>
          <h2>total</h2>
          <p className='total'>R$:{total}</p>
        </div>
      </div>
      <button className='btn__new' onClick={()=>setIsOpen(true)}>New transfer</button>
      
      {isOpen ? <Form total={total} setOpen={setIsOpen}/> : ''}
      
      

      <table className='table'>
        <thead>
          <tr>
            <th className='th__id'>Id</th>
            <th className='th__date'>Data</th>
            <th className='th__descricao'>Descrição</th>
            <th className='th__valor'>Valor</th>
            <th className='th__condicao'>Condição</th>
          </tr>
        </thead>
        {typeof dados !== "undefined" && dados.map((obj)=>(
         
          <tr key={obj.id} className='line-table' onClick={()=> {setEditDados({id:obj.id, data:obj.data, descricao:obj.descricao, valor:obj.valor, condicao:obj.condicao });setOpenEdit(true)}}>
            <th className='th__id'>{obj.id}</th>
            <th className='th__date'>{data(obj.data)}</th>
            <th className='th__descricao'>{obj.descricao}</th>
            <th className='th__valor'>{obj.valor}</th>
            <th className='th__condicao'>{obj.condicao}</th>
          </tr>
          
         ))
          }
      </table>
      {openEdit ? <Edit editDados = {editDados} setOpenEdit={setOpenEdit}/> : ""}
    
    </div>
  );
}
