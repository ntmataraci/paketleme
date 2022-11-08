
import BarcodeStructure from "./BarcodeStructure";
const Layout= ({kutuNo,urun,desc,adet,firma,tarih,toplam,dil,genislik,barkodYukseklik,barkodW}) => {
    return(
<div style={{border:"1px solid black",width:genislik+"px",margin:"auto",padding:"0.5rem"}}>
<div style={{ display: "flex",gap:"1.5rem",marginBottom:"2rem" }}>
  <BarcodeStructure
    header={dil==="tr"?"ÜRETİCİ/TEDARİKÇİ":"COMPANY:"}
    code={firma}
    height={barkodYukseklik}
    barkodW={barkodW}
  />
  <div>
    <BarcodeStructure
      header={dil==="tr"?"STOK KODU":"PART NO:"}
      code={urun}
      desc={desc}
      height={barkodYukseklik}
      barkodW={barkodW}
    />
  </div>
</div>
<div style={{display:"flex"}}>
{/* <div style={{display:"flex"}}>
    <BarcodeStructure
      header={"SNR.OPR.KODU"}
      code={"1230102007006"}
      desc={""}
    />
</div> */}
  <div style={{display:"flex",flexDirection:"column"}}>
    <div style={{textAlign:"left",display:"flex",justifyContent:"space-between",gap:"0.2rem"}}> <div>{dil==="tr"?"Kutu No:":"Box Nr:"}</div> <div style={{textAlign:"right"}}>{kutuNo}</div></div>
    <div style={{textAlign:"left",display:"flex",justifyContent:"space-between",gap:"0.2rem"}}><div>{dil==="tr"?"Kutu İçi Miktar:":"Qty in Box:"} </div><div style={{textAlign:"right"}}> {adet}</div></div>
    <div style={{textAlign:"left",display:"flex",justifyContent:"space-between",gap:"0.2rem"}}><div>{dil==="tr"?"Toplam Miktar:":"Total Qty:"} </div> <div style={{textAlign:"right"}}>  {toplam}</div></div>
    <div style={{textAlign:"left",display:"flex",justifyContent:"space-between",gap:"0.2rem"}}>{dil==="tr"?"Tarih:":"Date:"} <div>  {tarih} </div></div>
  </div>
</div>
</div>
    )
}
export default Layout