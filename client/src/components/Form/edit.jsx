import "./form.css"
import Axios from "axios"

import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from "react-hook-form";



const validar =  yup.object().shape({
    descricao:yup.string().required('*Campo obrigatório'),
    valor:yup.number().typeError('*apenas numeros são permitidos').required('*Campo obrigatório'),
    data:yup.string().required('*Campo obrigatório'),
    condicao:yup.string().required('*Campo obrigatório')
    })

export const Edit = ({editDados, setOpenEdit}) =>{
    const url = 'https://fianceiro-express.onrender.com/';
    const {register,handleSubmit, formState:{errors}} = useForm({
        resolver:yupResolver(validar)
      })


    const submit =  (values) =>{
        console.log(values)
        Axios.put(`${url}edit`,{
            id:editDados.id,
            descricao:values.descricao,
            valor:values.valor,
            data:values.data,
            condicao: values.condicao
          }).then((res,)=>{if(res)document.location.reload();})
          setOpenEdit()
         
    }
    
    

    const handleDelete = ()=>{
        Axios.delete(`${url}delete/${editDados.id}`).then((err)=> console.log(err))
        document.location.reload();
    }

    const data =()=>{
        const string = editDados.data
        const [ano,mes,edia]= string.split('-',3);
        const dia = edia.substr(0,2)
        const result = ano+'-'+mes+'-'+dia
    return result
    }
    const InputRadio = () =>{
        if(editDados.condicao === 'entrada'){
            return(
                <fieldset className="input__radio">
            <input id='entrada' type="radio" name='condicao' value='entrada' {...register('condicao')} checked/> <label htmlFor="entrada">entrada</label>
            <input id='saida' type="radio" name='condicao' value='saida' {...register('condicao')}/> <label htmlFor="saida">saida</label>
            </fieldset>
            );
        }
        else{
            return(
            <fieldset className="input__radio">
            <input id='entrada' type="radio" name='condicao' value='entrada' {...register('condicao')} /> <label htmlFor="entrada">entrada</label>
            <input id='saida' type="radio" name='condicao' value='saida' {...register('condicao')} checked/> <label htmlFor="saida">saida</label>
            </fieldset> );
        }
    }

    return (
        <div className="background__">
            <form className="container__form " onSubmit={handleSubmit(submit)}>
            <fieldset className='input__text'>
                <fieldset className=" fieldsetCustom">
                    <label >Id:</label><input name="id" defaultValue={editDados.id} disabled />
                </fieldset>
                <fieldset className=" fieldsetCustom">
                    <label >data</label><input name="data"{...register('data')} defaultValue={data()} />
                    <p className="error">{errors.data?.message}</p>
                </fieldset>
                <fieldset className=" fieldsetCustom">
                    <label >descricao</label><input name="descricao" {...register('descricao')} defaultValue={editDados.descricao} />
                    <p className="error">{errors.descricao?.message}</p>
                </fieldset>
                <fieldset className=" fieldsetCustom">
                    <label >valor</label><input name="valor" {...register('valor')} defaultValue={editDados.valor} />
                    <p className="error">{errors.valor?.message}</p>
                </fieldset>
                <fieldset >
                    <InputRadio/>
                </fieldset>
                <fieldset className="btns">
                <button onClick={()=> setOpenEdit()}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleSubmit(submit)}>Editar</button>
                </fieldset>
            </fieldset>
            </form>
        </div>
    )
}
