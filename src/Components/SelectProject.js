import Select from "react-select";
import {colors} from "./Form/colors";
import {flavors} from "./Form/flavors";
import {Controller} from "react-hook-form";
import React, {useState, useEffect} from "react";

export const SelectProject = (props) => {
    const initValue = props.type === "tags" ? props.preloadedValues.selectedFlavors : props.preloadedValues.selectedColors;
    const options = props.type === "tags" ? flavors : colors;
    console.log("DEFAULTS:", props.preloadedValues);
    console.log("OPTIONS:", options);

    const [selectedOptions, setSelectedOptions] = useState(initValue);
    const [selectedOptionsFormatted, setSelectedOptionsFormatted] = useState(false);

    useEffect(() => {
            let packageTags = async () => {
                // console.log("First Selected Options:", selectedOptions);
                const selectedOptionsReceived = selectedOptions !== null && selectedOptions.length > 0;
                // console.log("selectedOptionsRecieved:", selectedOptionsReceived);
                if (selectedOptionsReceived) {
                    // console.log("SelectedOptions:", selectedOptions);
                    const firstElement = selectedOptions[0];
                    const firstEleIsString = typeof firstElement === "string";
                    // console.log("firstEleIsString:", firstEleIsString);
                    let unformattedMultiValue = firstEleIsString && selectedOptions.length > 0;
                    // console.log("unformattedMultiValue :", unformattedMultiValue);
                    if (unformattedMultiValue) {
                        // console.log("unFormatted Selections:", selectedOptions);
                        let tempArray = await selectedOptions.map((item, index) => {
                            // console.log("Item:", item);

                            return {
                                _id: index,
                                value: item.toLowerCase(),
                                label: item
                            };
                        });
                        setSelectedOptions(tempArray);
                        setSelectedOptionsFormatted(true);
                    }//if
                }//if
            } //packageTags

            packageTags();
        },
        [selectedOptions]);
// Adds label selected options
    return (<div>

            <Controller
                name={props.name}
                control={props.control}
                render={({field}) => (
                    <Select
                        {...field}
                        isClearable // enable isClearable to demonstrate extra error handling
                        isSearchable={false}
                        className="basic-multi-select"
                        options={options}
                        isMulti={props.type === "tags"}
                        classNamePrefix="select"
                    />
                )}
            />
        </div>
    );
}