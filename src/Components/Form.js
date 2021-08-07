import React from "react";
import '../App.css';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required('Please enter a valid name').matches(/^[aA-zZ]+$/, 'Please enter a valid name'),
    email: yup.string().email().required('Please enter a valid email address'),
    country: yup.string().required('You must select your country'),
    password: yup.string().min(6).required('Password must contain at least 6 symbols'),
    gender: yup.string().required('You must select the gender').nullable(),
    conditions: yup.boolean().oneOf([true], 'You must accept the policies'),
})

function Form() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const submitForm = (data) => {
        console.log(data);
    }
    return (
        <div className="form">
            <h1 className="title">Create a new account</h1>
            <div className="inputs">
                <form onSubmit={handleSubmit(submitForm)}>
                    <input type="text" name="name" placeholder="Enter your name" {...register("name")} />
                    <p>{errors.name?.message}</p>
                    <input type="text" name="email" placeholder="Email" {...register("email")} />
                    <p>{errors.email?.message}</p>
                    <input type="text" name="password" placeholder="Password" {...register("password")} />
                    <p>{errors.password?.message}</p>
                    <select name="country" {...register("country")}>
                        <option value="" selected>Select country</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Estonia">Estonia</option>
                    </select>
                    <p>{errors.country?.message}</p>
                    <label>Male</label>
                    <input type="radio" name="gender" {...register("gender")} value="male" />
                    <label>Female</label>
                    <input type="radio" name="gender" {...register("gender")} value="female" />
                    <p>{errors.gender?.message}</p>
                    <label>Accept terms and conditions</label>
                    <input type="checkbox" name="conditions" {...register("conditions")} value={true} />
                    <p>{errors.conditions?.message}</p>
                    <input type="submit" id="submit" value="Sign Up" disabled={!formState} />
                </form>
            </div>
        </div>
    );
}

export default Form;
