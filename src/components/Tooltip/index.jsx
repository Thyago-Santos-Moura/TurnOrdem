import { useState } from 'react';
import styled from 'styled-components';

const Tooltip = ({ children, text }) => {
   const [isHovering, setIsHovering] = useState(false);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, ponto: 0 });

   const handleMouseEnter = () => {
      setIsHovering(true);
   };

   const handleMouseLeave = () => {
      setIsHovering(false);
   };

   const handleMouseMove = (event) => {
      const windowWidth = window.innerWidth;
      let centro = 0
      if (event.pageX > (windowWidth / 2)) {
         centro = -100
      } else {
         centro = 0
      }
      console.log(centro)
      setMousePosition({ x: event.pageX, y: event.pageY, ponto: centro });

   };

   return (
      <Simbolo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
         {children}
         {isHovering && (
            <Mensagem $top={mousePosition.y + 10}
               $left={mousePosition.x + 10}
               $centro={mousePosition.ponto}>
               {text}
            </Mensagem>
         )}
      </Simbolo>
   );
};

const Mensagem = styled.div`
   position: fixed;
   top: ${(props) => `${props.$top}px`};
   left: ${(props) => `${props.$left}px`};
   transform: translateX(${(props) => `${props.$centro}%`});
   z-index: 1000;
   background-color: rgba(0, 0, 0, 0.8);
   border: solid 1px rgba(255, 255, 255, 0.4);
   color: rgba(255, 255, 255, 0.5);
   padding: 2px 5px;
   border-radius: 5px;
   font-size: 14px;
   pointer-events: none;
   white-space: nowrap;
`

const Simbolo = styled.div`
   position: relative;
   display: inline-block;
`

export { Tooltip };