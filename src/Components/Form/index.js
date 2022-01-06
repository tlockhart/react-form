import React, {useState} from "react";
import "../../App.css";
import "./options";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "./schema";
import Select from 'react-select';
import {Controller} from "react-hook-form";

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

function Form() {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (selectedOption) => {
        // this.setState({ selectedOption });
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm({
        // mode: "onChange",
        resolver: yupResolver(schema),
    });
    //Create submitFormHandler
    const submitForm = (data) => {
        console.log(data);
    };
    return (
        <div className="Form">
            <div className="title">Sign Up</div>
            <div className="inputs">
                {/*pass into handleSubmit function submitForm function*/}
                <form onSubmit={handleSubmit(submitForm)}>
                    <input type="text" {...register('firstName')} placeholder="First Name..."/>
                    <p> {errors.firstName?.message} </p>
                    <input type="text" {...register('lastName')} placeholder="Last Name..."/>
                    <p> {errors.lastName?.message} </p>
                    <input type="text" {...register('email')} placeholder="Email..."/>
                    <p> {errors.email?.message} </p>
                    <input type="text" {...register('age')} placeholder="Age..."/>
                    <p> {errors.age?.message} </p>
                    <input type="password" {...register('password')} placeholder="Password..."/>
                    <p> {errors.password?.message} </p>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password..."/>
                    <p> {errors.confirmPassword && "Passwords Should Match!"} </p>
                    <div>
                        <select
                            className="select"
                            {...register("func")}
                            onChange={(e) => setValue('func', e.target.value, {shouldValidate: true})}
                        >
                            <option value="">
                                Select function
                            </option>
                            <option value="5">Function 2</option>
                            <option value="6">Function 3</option>
                        </select>
                        {errors.func && <p style={{color: 'red'}}> {errors.func.message}</p>}
                    </div>
                    <div>
                        <Controller
                            name="iceCream"
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isClearable // enable isClearable to demonstrate extra error handling
                                    isSearchable={false}
                                    className="react-select"
                                    options={options}
                                />
                            )}
                        />
                        <p style={{color: 'red'}}>{errors.iceCream?.message || errors.iceCream?.label.message}</p>
                    </div>
                    <input type="submit" id="submit"/>
                </form>
            </div>
        </div>
    );
}

export default Form;