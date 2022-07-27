import React from 'react'

const Button = ({styling,width,content,onPress}) => {
  const buttonStyle = {
      padding : "12px 24px",
      backgroundColor: styling === "primary" ? "#CD2E71" : styling === "secondary" ? "transparent" : styling === "save" ? "#1BFF5B" : "#FF493E",
      color:"white",
      width: width === "full" ? "100%" : "",
      flex: width === "flex-1" ? 1 : "",
      borderRadius:"6px",
      border:"none",
      cursor:"pointer",
      fontSize:18,
      fontWeight :"bold",
  };

  const doNothing = () => {};
  const fn = onPress ? onPress : doNothing;

  return (
    <button style={buttonStyle} onClick={fn} >{content}</button>
  )
}

export default Button