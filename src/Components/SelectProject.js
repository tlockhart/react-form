import Select from "react-select";
import {flavors1} from "./Form/flavors1";
import {flavors2} from "./Form/flavors2";
import {Controller} from "react-hook-form";
import React, {useState, useEffect} from "react";

export const SelectProject = (props) => {
    const initValue = props.type === "tags" ? props.preloadedValues.selectedTags : props.preloadedValues.flavors;
    const options = props.type === "tags" ? flavors2 : flavors1;
    let newOptions = [
        {_id: '0', value: 'chocolate', label: 'Chocolate'},
        {_id: '1', value: 'strawberry', label: 'Strawberry'},
        {_id: '2', value: 'vanilla', label: 'Vanilla'},
    ];
    const [selectedOptions, setSelectedOptions] = useState(initValue);
    const [selectedOptionsFormatted, setSelectedOptionsFormatted] = useState(false);
    // const [newSelectedOptions, setNewSelectedOptions] = useState(null);
    useEffect(() => {
            let packageTags = async () => {
                const selectedOptionsReceived = selectedOptions !== null || selectedOptions.length > 0;
                if (selectedOptionsReceived) {
                    console.log("SelectedOptions:", selectedOptions);
                    console.log("isArray:", Array.isArray(selectedOptions), selectedOptions instanceof Array);
                    const isArray = Array.isArray(selectedOptions);

                    if (isArray && selectedOptions.length > 0) {
                        const selectionFormatted = typeof selectedOptions[0] !== "string";
                        console.log(selectedOptions[0], " selection formatted? ", selectionFormatted);
                        if (selectionFormatted) {
                            console.log("Formatted Selection:", selectedOptions);
                            //reset
                            setSelectedOptionsFormatted(false);
                            // setNewSelectedOptions(JSON.parse(JSON.stringify(selectedOptions)))
                        } //if
                        else {
                            console.log("unFormatted Selection:", selectedOptions);
                            const tempArray = await selectedOptions.map((item, index) => {
                                console.log("Item:", item);

                                const data = {
                                    _id: index,
                                    value: item.toLowerCase(),
                                    label: item
                                };

                                return data;
                            });
                            console.log("TempArray:", tempArray);
                            setSelectedOptions(tempArray);
                            setSelectedOptionsFormatted(true);
                        }//else
                    }//if
                }//if
            } //packageTags

            packageTags();
        },
        [selectedOptions, setSelectedOptionsFormatted]);

    return (<div>

            <Controller
                name="iceCream"
                control={props.control}
                render={({field}) => (
                    <Select
                        {...field}
                        isClearable // enable isClearable to demonstrate extra error handling
                        isSearchable={false}
                        className="react-select"
                        options={options}
                        defaultValue={selectedOptions}
                        // defaultValue={newOptions}
                        isMulti={props.type === "tags"}
                    />
                )}
            />
        </div>
    );
}