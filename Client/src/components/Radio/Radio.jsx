import React from 'react'
import "./Radio.css"
const Radio = ({label,value,handleRadio,className,chechClassName,name,...otherProps}) => {
  return (
    <label className={`container pl-16 ${className}`} {...otherProps}>{label}
      <input onChange={(e)=>handleRadio(e)} value={value} type="radio" name={name} />
        <span className={`checkmark left-[10%] ${chechClassName}`}></span>
    </label>
  )
}

export default Radio
