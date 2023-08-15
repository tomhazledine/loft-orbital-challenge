import React from "react";

const InlineSelect = ({ id, name, label, options, selected, onChange }) => {
    console.log({ id, name, label, options, selected });
    const optionsMarkup = Object.keys(options).map(option => (
        <option key={`${id}_${option}`} value={option}>
            {options[option]}
        </option>
    ));
    return (
        <>
            <label className="hidden--visually" htmlFor={id}>
                {label}
            </label>
            <select name={name} id={id} onChange={onChange} value={selected}>
                {optionsMarkup}
            </select>
        </>
    );
};

export default InlineSelect;
