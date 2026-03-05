import { useEffect, useState } from "react"

const InputInfo = ({info , valor, onValor}) => {
    const [inputValue, setInputValue] = useState({})
    const [infoId, setInfoId] = useState('')

    const valorSetar = (event) => {
        const newValor = event.target.value;
        setInputValue(newValor)
        onValor({ id: infoId, value: newValor })
    }

    useEffect(() => {
        setInfoId('info'+info)
        setInputValue(valor[infoId])
    }, [info, valor])
    
    return (
        <input type="text" id={infoId} value={inputValue || ''} onChange={valorSetar} />
    )
}

export { InputInfo }