import Barcode from 'react-barcode';
const BarcodeStructure=({header,code,desc,height,barkodW})=>{
    return(
        <div>
        <div style={{textAlign:"left"}}>{header}</div>
        <Barcode value={code} height={+height} width={barkodW}/>
        <div>{desc}</div>
        </div>
    )
}

export default BarcodeStructure