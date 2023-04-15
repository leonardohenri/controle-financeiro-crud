import { useState } from "react"

import Axios from 'axios'
import './form.css'
import {useForm} from 'react-hook-form'

import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

const validar =  yup.object().shape({
descricao:yup.string().required('*Campo obrigatório'),
valor:yup.number().typeError('*apenas numeros são permitidos').required('*Campo obrigatório'),
data:yup.string().required('*Campo obrigatório'),
condicao:yup.string().required('*Campo obrigatório')
})


export const Form = (getDados) =>{
    const {register,handleSubmit, formState:{errors}} = useForm({
      resolver:yupResolver(validar)
    })
    const url = "http://localhost:3001/";

    const submit = (values) =>{
        
        Axios.post(`${url}register`,{
          descricao:values.descricao,
          valor:values.valor,
          data:values.data,
          condicao: values.condicao
        }).then(err=>{console.log(err);})
      
      }
    
    return(
        <div className='container__formulario'>
        <form className='formulario' onSubmit={handleSubmit(submit)}>
          <fieldset className='input__text'>
            <fieldset>
              <label>descrição: </label><input type="text" id='descricao' name='descricao' {...register('descricao')} />
              <p className="error">{errors.descricao?.message}</p>
            </fieldset>

            <fieldset>
              <label>valor: </label><input type="text" id='valor' name='valor' {...register('valor')} />
              <p className="error">{errors.valor?.message}</p>
            </fieldset>

            <fieldset>
              <label >data</label><input type="date" id='data' name='data' {...register('data')} />
              <p className="error">{errors.data?.message}</p>
            </fieldset>

          </fieldset>
          <fieldset className='input__radio'>
            <input id='entrada' type="radio" name='condicao' {...register('condicao')} value='entrada'/> <label htmlFor="entrada">entrada</label>
            <input id='saida' type="radio" name='condicao' {...register('condicao')} value='saida'/> <label htmlFor="saida">saida</label>
            <p className="error">{errors.condicao?.message}</p>
          </fieldset>
          <fieldset>
            <button className='btn' onClick={handleSubmit(submit)}>Adicionar</button>
          </fieldset>
        </form>
        
      </div>  
    );
}