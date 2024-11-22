import React from 'react'

const Input = ({ type, placeholder, value, onChange}) => {
    return (
        <input
            type= {type}
            placeholder= {placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 border dark:bg-zinc-700 dark:border-zinc-600 rounded-lg shadow-sm placeholder-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    )
}

export default Input
