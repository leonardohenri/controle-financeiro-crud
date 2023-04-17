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


export const Form = (props) =>{
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
        }).then(err=>{console.log(err); })
        document.location.reload();
      
      }
      const handleClose = () =>{
        props.setOpen(false)
      }
    return(
        <div className='background__'>
          <div className="container__form">
            <button className="button__close" onClick={()=>handleClose()}>X</button>
        <form className='formulario' onSubmit={handleSubmit(submit)}>
        <h2 className="style__h2">Nova transferencia </h2>
          <fieldset className='input__text'>
            <fieldset className="fieldsetCustom">
              <label>descrição: </label><input type="text" id='descricao' name='descricao' {...register('descricao')} />
              <p className="error">{errors.descricao?.message}</p>
            </fieldset>

            <fieldset className="fieldsetCustom">
              <label>valor: </label><input type="text" id='valor' name='valor' {...register('valor')} />
              <p className="error">{errors.valor?.message}</p>
            </fieldset>

            <fieldset className="fieldsetCustom">
              <label >data</label><input type="date" id='data' name='data' {...register('data')} />
              <p className="error">{errors.data?.message}</p>
            </fieldset>

          </fieldset>
          <div className="flex">
          <fieldset className='input__radio'>
            <input id='entrada' type="radio" name='condicao' {...register('condicao')} value='entrada'/> <label htmlFor="entrada">entrada</label>
            <input id='saida' type="radio" name='condicao' {...register('condicao')} value='saida'/> <label htmlFor="saida">saida</label>
            <p className="error">{errors.condicao?.message}</p>
          </fieldset>
          <fieldset className="form__btn">
            <button className='btn' onClick={handleSubmit(submit)}>Adicionar</button>
          </fieldset>
          </div>
        </form>
        </div>
      </div>  );
   
}