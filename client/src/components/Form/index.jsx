import Axios from 'axios'
import './form.css'
import {useForm} from 'react-hook-form'

import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

const validar =  yup.object().shape({
descricao:yup.string().required('*Campo obrigatório'),
valor:yup.number().typeError('*Campo inválido').required('*Campo obrigatório'),
data:yup.string().required('*Campo obrigatório'),
condicao:yup.string().required('*Campo obrigatório')
})


export const Form = ({setOpen,total}) =>{
    const {register,handleSubmit, formState:{errors}} = useForm({
      resolver:yupResolver(validar)
    })
    const url = "https://fianceiro-express.onrender.com/";
    const submit = (values) =>{
       if(values.condicao === 'saida'){
        if(total<values.valor){
          alert('Valor de saida menor que o valor disponivel?')
          return
        }
       }
        Axios.post(`${url}register`,{
          descricao:values.descricao,
          valor:values.valor,
          data:values.data,
          condicao: values.condicao
        }).then(err=>{console.log(err); setTimeout(() => {
          document.location.reload();
        }, 500);})
      
      }
      const handleClose = () =>{
        setOpen(false)
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
              <label >data</label><input type="date" value={new Date().toISOString().substr(0, 10)}id='data' name='data' {...register('data')} />
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
