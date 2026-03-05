import styled from "styled-components"

const BarraDinamica = (props) => {
   let tamanho = props.atual * 100 / props.max
   let tamanho2 = 0
   if (tamanho > 100){
      tamanho2 = tamanho - 100;
      tamanho = 100
      if (tamanho2 > 100){
         tamanho2 = 100
      }
   }else if (tamanho < 0) {
      tamanho = 0
   }

   return (
      <Barra>
         <BarraAtual porcento = {tamanho+'%'}>
            <BarraDois porcento = {tamanho2+'%'}/>
         </BarraAtual>
      </Barra>
   )
}

export {BarraDinamica}

const Barra = styled.div`
   width: 100%;
   height: 20px;
   background-color: red;
   border: solid 1px white;
`

const BarraAtual = styled.div`
   background-color: green;
   width: ${(props => props.porcento)};
   height: 100%;
`

const BarraDois = styled.div`
   background-color: yellow;
   width: ${(props => props.porcento)};
   height: 100%;
`