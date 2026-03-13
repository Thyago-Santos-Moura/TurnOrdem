import { useEffect, useState, useRef, Children } from "react"
import { InputInfo } from "../InputInfo"
// import { useConfigs } from "../../contexts/Configs";


const btnStyle = ""


const CriaFicha = () => {
   const [valor, setValor] = useState({
      nome: '',
      vida: '',
      ac: '',
      str: '',
      dex: '',
      con: '',
      int: '',
      wis: '',
      car: '',
   });
   const [nome, setNome] = useState('');
   const [infos, setInfos] = useState({});
   const [numInputs, setNumInputs] = useState(9);
   const [selectedImage, setSelectedImage] = useState(null);

   const fileInputRef = useRef(null);
   const status = ["Nome", "Vida", "AC", "Força", "Destreza" , "Constituição","Inteligencia" , "Sabedoria" , "Carisma" ]
   const valoresInput = [{id: 'vida', value : valor.vida},{id: 'ac', value : valor.ac}, {id: 'str', value : valor.str}, {id: 'dex', value : valor.dex}, {id: 'con', value : valor.con}, {id: 'int', value : valor.int}, {id: 'wis', value : valor.wis}, {id: 'car', value : valor.car}];


//    const { inf } = useConfigs()
   const inf = "teste"
   

   const valorSetarExtra = ({ id, value }) => {
      setValor({ ...valor, [id]: value });
   };

   const valorSetar = (event) => {
      const { id, value } = event.target;
      setValor({ ...valor, [id]: value })
   }

   const onDelete = (nomeParaRemover) => {
      const { [nomeParaRemover]: _, ...novasInfos } = infos;
      setInfos(novasInfos);
      localStorage.setItem(`save${inf}`, JSON.stringify(novasInfos));
   };

   const nomeSetar = (event) => {
      setNome(event.target.value)
   };

   const onSave = () => {
      const newInfos = { ...infos, [nome]: valor }
      setInfos(newInfos)
      localStorage.setItem(`save${inf}`, JSON.stringify(newInfos))
   };

   const onLoad = (keynome = nome) => {
      const load = JSON.parse(localStorage.getItem(`save${inf}`))
      if (load && load[keynome]) {
         if (Object.keys(load[keynome]).length > 9) {
            setNumInputs(Object.keys(load[keynome]).length)
         }
         setValor(load[keynome])
      } else {
         setValor({})
      }
   };

   const onAdd = () => {
      setNumInputs(numInputs + 1)
   };

   const onRemove = () => {
      const vRemove = numInputs - 10
      if (valor[`info${vRemove}`]) {
         delete valor[`info${vRemove}`];
      }
      setNumInputs(numInputs - 1)
   };

   const changeName = (newNome) => {
      setNome(newNome)
      onLoad(newNome)
   };

   useEffect(() => {
      const savedData = localStorage.getItem(`save${inf}`);
      if (savedData) {
         setInfos(JSON.parse(savedData));
      }
   }, []);

   const renderInputs = () => {
      const inputs = []
      for (let i = 0; i < numInputs - 9; i++) {
         inputs.push(
            <InputInfo key={i} info={i} valor={valor} onValor={valorSetarExtra} />
         )
      }

      return inputs;
   };

   useEffect(() => {
      setValor({ ...valor, imagem: selectedImage });
   }, [selectedImage])

   const handleImageUpload = (event) => {
      const file = event.target.files[0];

      if (file) {
         const reader = new FileReader();


         reader.onloadend = () => {
            setSelectedImage(reader.result);
         };

         reader.readAsDataURL(file);
      }
   };

   // useEffect(() => {
   //     console.log(valor)
   // }, [valor]);


   const handleButtonClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const NomesStatus = () => {
      return(
         <div className="flex flex-col p-0 m-5 gap-4">
            {status.map((item, index) => (
               <p className="m-0" key={index}>{item}</p>
            ))}
         </div>
      )
   }

   const HandleInputs = () => {
      return (
         valoresInput.map((item, index) => (
            <input className='bg-gray-600 text-white' type="number" id={item.id} value={item.value} onChange={valorSetar} key={index} />
         ))
      )
   }

   const ButtonStyle = ({children, className, ...props }) => (
      <button {...props} className="bg-neutral-700 text-sm text-neutral-200 font-bold border border-gray-300 rounded-sm font-['Arial'] cursor-pointer transition-colors duration-200 ease-in-out ${className} px-2" >{children}</button>
   )

   return (
      <div>
         
         <div className="flex">
            <div>
               {selectedImage && (
                  <div>
                     <h3>Preview:</h3>
                     <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="size-24 cursor-pointer" />
                  </div>
               )}
            </div>
            <div>
               <NomesStatus/>
            </div>
            <div className="flex flex-col p-0 m-5 gap-4" >
               <input className='bg-gray-600 text-white' type="text" id='nome' value={nome} onChange={nomeSetar} />
               <HandleInputs/>
               {numInputs > 9 && renderInputs()}
            </div>
            {/* aqui */}
            <div className="flex flex-col m-5 gap-4">
               <ButtonStyle onClick={onSave}>save</ButtonStyle>
               <ButtonStyle onClick={onLoad}>load</ButtonStyle>
               <ButtonStyle onClick={onAdd}>+</ButtonStyle>
               {numInputs > 9 && (<ButtonStyle onClick={onRemove}>-</ButtonStyle>)}
               <ButtonStyle onClick={() => onDelete(nome)}>remover perfil</ButtonStyle>
               <input
                  type="file" accept="image/*" id="fileImagem" ref={fileInputRef} onChange={handleImageUpload} className="hidden"
               />
               <ButtonStyle onClick={handleButtonClick}>add imagem</ButtonStyle>
            </div>
         </div>

         {Object.keys(infos).length > 0 ? (
            <ul>
               {Object.entries(infos).map(([key, value], index) => (
                  <li className='ficha' key={index}>
                     <h1 onClick={() => { changeName(key) }}>{key}</h1>
                     {value.imagem && <img
                        key={key} src={value.imagem}
                        alt="Uploaded"
                        className="size-28 cursor-pointer"
                        onClick={() => { changeName(key) }} />}
                     <div className="statusItem">
                        <p className="pAdapitavel">Vida: </p>
                        <p className="pAdapitavel">{value.vida}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">AC: </p>
                        <p className="pAdapitavel">{value.ac}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">Força: </p>
                        <p className="pAdapitavel">{value.str}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">Destreza: </p>
                        <p className="pAdapitavel">{value.dex}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">Constitu: </p>
                        <p className="pAdapitavel">{value.con}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">Inteligen: </p>
                        <p className="pAdapitavel">{value.int}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">Sabedoria: </p>
                        <p className="pAdapitavel">{value.wis}</p>
                     </div>
                     <div className="statusItem">
                        <p className="pAdapitavel">Carisma: </p>
                        <p className="pAdapitavel">{value.car}</p>
                     </div>
                     {Object.entries(value).map(([key, value]) => {
                        if (key.includes('info')) {
                           return <div key={key} className="statusItem">
                              <p className="pAdapitavel">{value}</p>
                           </div>
                        }

                     })}
                  </li>
               ))}
            </ul>
         ) : ''}
      </div>
   )

}

export { CriaFicha }