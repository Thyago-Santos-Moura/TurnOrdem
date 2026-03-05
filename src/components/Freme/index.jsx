import React from "react";

const Freme = (props) => {
    const estilo = "bg-gray-500 rounded-sm w-11/12 text-xs m-0"
    return(
        <div className="w-20 h-16 flex flex-col items-center m-1 justify-evenly border border-white rounded">
            <h1 className="text-xs m-0">{props.titulo}</h1>
            {props.children ? (
                <div className={`${estilo} [&_p]:m-0`}>{props.children}</div>
            ) : (
                <p className={estilo}>{props.item}</p>
            )}
        </div>
    )
}

export { Freme } 