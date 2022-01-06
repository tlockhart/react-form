import Select from "react-select";
import {options} from "./Form/options";
import {Controller} from "react-hook-form";
import React from "react";

export const SelectProject = (props) => {
    return (<Controller
            name="iceCream"
            control={props.control}
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
    );
}