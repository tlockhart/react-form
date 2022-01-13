import React from "react";
// import {useState} from "react";

import "../../App.css";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "./schema";
import {SelectProject} from '../SelectProject';


function Form() {
    const preloadedValues = {
        firstName: "User",
        lastName: "Userson",
        flavors: {
            value: 'chocolate',
            label: 'Chocolate'
        },
        selectedTags: [
            'Chocolate', 'Strawberry', 'Vanilla'
        ],
        tags: [
            {_id: '0', value: 'chocolate', label: 'Chocolate'},
            {_id: '1', value: 'strawberry', label: 'Strawberry'},
            {_id: '2', value: 'vanilla', label: 'Vanilla'},
        ]
    }

    // const [selectedOption, setSelectedOption] = useState(null);
    // const handleChange = (selectedOption) => {
    //     setSelectedOption(selectedOption);
    //     console.log(`Option selected:`, selectedOption);
    // };
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm({
        defaultValues: preloadedValues,
        resolver: yupResolver(schema),
    });

//Create submitFormHandler
    const submitForm = (data) => {
        //All inputs are passed back as the data argument
        console.log(data);
    };
    return (
        <div className="Form">
            <div className="title">Sign Up</div>
            <div className="inputs">
                pass into handleSubmit function submitForm function
                <form onSubmit={handleSubmit(submitForm)}>
                    <input
                        type="text"
                        {...register('firstName')}
                        placeholder="First Name..."
                    />
                    <p> {errors.firstName?.message} </p>
                    <input
                        type="text"
                        {...register('lastName')}
                        placeholder="Last Name..."
                    />
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
                        <SelectProject
                            type="proto"
                            control={control}
                            preloadedValues={preloadedValues}
                        />
                        <SelectProject
                            type="tags"
                            control={control}
                            preloadedValues={preloadedValues}
                            // defaultValue={null}
                        />
                        <p style={{color: 'red'}}>{errors.iceCream?.message || errors.iceCream?.label.message}</p>
                    </div>
                    <input
                        type="submit"
                        id="submit"
                    />
                </form>
            </div>
        </div>
    );
}

export default Form;