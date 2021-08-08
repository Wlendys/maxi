import React from "react";
import '../App.css';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required('Please enter a valid name').matches(/^[aA-zZ]+$/, 'Please enter a valid name'),
  email: yup.string().email().required('Please enter a valid email address'),
  country: yup.string().required('You must select your country'),
  password: yup.string().min(6,'Password must contain at least 6 symbols').required('Password must contain at least 6 symbols'),
  gender: yup.string().required('You must select the gender').nullable(),
  conditions: yup.boolean().oneOf([true], 'You must accept the policies'),
})

function Form() {
  const {register, handleSubmit, formState: {errors}, formState} = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {isDirty, isValid} = formState;
  const submitForm = (data) => {
    console.log(data);
  }
  return (
    <div className="form">
      <h1 className="form__title">Create a new account</h1>
      <div className="form__inputs">
        <form onSubmit={handleSubmit(submitForm)}>
          <input type="text" name="name" placeholder="Enter your name" {...register("name")} />
          <p className="form__errors">{errors.name?.message}</p>
          <input className="form__email" type="text" name="email" placeholder="Email" {...register("email")} />
          <p className="form__errors">{errors.email?.message}</p>
          <input className="form__pass" type="text" name="password" placeholder="Password" {...register("password")} />
          <p className="form__errors">{errors.password?.message}</p>
          <select className="form__select" name="country" {...register("country")}>
            <option value="" selected>Select country</option>
            <option value="Latvia">Latvia</option>
            <option value="Estonia">Estonia</option>
          </select>
          <p className="form__errors">{errors.country?.message}</p>
          <div className="form__radio-block">
            <input className="form__radio" type="radio" name="gender" {...register("gender")} value="male"/>
            <label>Male</label>
            <input className="form__radio" type="radio" name="gender" {...register("gender")} value="female"/>
            <label>Female</label>
          </div>
          <p className="form__errors">{errors.gender?.message}</p>
          <div className="form__checkbox-block">
            <input className="form__checkbox" type="checkbox" name="conditions" {...register("conditions")} value={true}/>
            <label className="form__checkbox-label">Accept <a href="/#">terms</a> and <a href="/#">conditions</a></label>
          </div>
          <p className="form__errors">{errors.conditions?.message}</p>
          <input type="submit" className="form__submit" value="Sign up" disabled={!isDirty || !isValid}/>
        </form>
      </div>
    </div>
  );
}

export default Form;
