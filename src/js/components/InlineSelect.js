import React from "react";

const InlineSelect = ({ id, name, label, options, selected, onChange }) => {
    const defaultOption = options.default;
    const optionsMarkup = Object.keys(options)
        .filter(key => key !== "default")
        .sort((a, b) => {
            if (options[a] < options[b]) {
                return -1;
            }
            if (options[a] > options[b]) {
                return 1;
            }
            return 0;
        })
        .map(option => (
            <option key={`${id}_${option}`} value={option}>
                {options[option]}
            </option>
        ));
    return (
        <>
            <label className="hidden--visually" htmlFor={id}>
                {label}
            </label>
            <select
                className="form__select form__select--inline"
                name={name}
                id={id}
                onChange={onChange}
                value={selected}
            >
                <option key={`${id}_default`} value="default" disabled>
                    {defaultOption}
                </option>
                {optionsMarkup}
            </select>
        </>
    );
};

export default InlineSelect;
