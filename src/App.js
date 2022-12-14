import Layout from "./components/Layout";
import { useEffect, useRef, useState } from "react";
import  "./App.css"
function App() {
  const urunKodu = useRef();
  const koliAdet = useRef();
const firmaAd=useRef()


  const [print, setPrint] = useState(false);
  const [partList, setPartList] = useState([]);
  const [language, setLanguage] = useState("tr");
  const [toplamAdetHandler,setToplamAdetHandler]=useState()
  const [genislikHandler,setGenislikHandler]=useState()
  const [barkodYukseklikHandler,setBarkodYukseklikHandler]=useState()
  const [urunTanimiHandler,setUrunTanimiHandler]=useState()
  const [barkodW,setBarkodW]=useState()
  const [rotateMe,setRotateMe]=useState()
  const [ustKenar,setUstKenar]=useState(0)
  const [barkodBosluk,setBarkodBosluk]=useState(0)
  const hesapla = () => {
    const koliSayisi = Math.floor(
     toplamAdetHandler / koliAdet.current.value
    );
    const sonKoli = toplamAdetHandler % koliAdet.current.value;
    let date = new Date().toLocaleDateString();
    let partListHelper = [];
    for (let i = 0; i < koliSayisi; i++) {
      partListHelper[i] = {
        kutuNo: i + 1 +"/"+ (+koliSayisi+1),
        urun: urunKodu.current.value,
        adet: koliAdet.current.value,
        firma: firmaAd.current.value,
        tarih: date,
      };
    }
    partListHelper[partListHelper.length] = {
      kutuNo: koliSayisi + 1 +"/"+ (+koliSayisi+1),
      urun: urunKodu.current.value,
      adet: sonKoli.toString(),
      firma: firmaAd.current.value,
      tarih: date,
    };
    window.localStorage.setItem("barcodeSettings",JSON.stringify(
    {
      language:language,
      genislik:genislikHandler,
      barkodYukseklik:barkodYukseklikHandler,
      barkodW:barkodW,
      rotateMe:rotateMe,
      ustkenar:ustKenar,
      barkodBosluk:barkodBosluk
    })
    )
    setPrint(true);
    setPartList(partListHelper);
  };

  useEffect(() => {
if(window.localStorage.getItem("barcodeSettings")){
  const settings=JSON.parse(window.localStorage.getItem("barcodeSettings"))
  setLanguage(settings.language)
  setGenislikHandler(+settings.genislik)
  setBarkodYukseklikHandler(+settings.barkodYukseklik)
  setBarkodW(+settings.barkodW)
  setRotateMe(Boolean(settings.rotateMe))
  setUstKenar(+settings.ustkenar)
  setBarkodBosluk(+settings.barkodBosluk)
}
  }, [print]);




  return (
    <>
      {!print && (
           <form style={{ padding: "1rem",display:"flex",flexDirection:"column",gap:"0.2rem" }} onSubmit={hesapla}>
          <div style={{ display: "flex", gap: "0.5rem", cursor: "pointer",flexWrap:"wrap" }}>
            Dil:
            <div
              onClick={() => setLanguage("tr")}
              style={{
                borderBottom: language === "tr" ? "1px solid black" : "none", backgroundColor:"skyblue",padding:"0.2rem"
              }}
            >
              TR
            </div>
            <div
              onClick={() => setLanguage("en")}
              style={{
                borderBottom: language === "en" ? "1px solid black" : "none",backgroundColor:"skyblue",padding:"0.2rem"
              }}
            >
              En
            </div>
           
            <div> {language === "tr" ? "??er??eve Geni??li??i :" : "Border Width:"}<input type="number"  required={true} min={250}  value={genislikHandler} onChange={(e)=>setGenislikHandler(+e.target.value)} /></div>
            <div> {language === "tr" ? "Barkod Y??ksekli??i :" : "Barcode Height:"}<input type="number"  required={true} min={20} value={barkodYukseklikHandler} onChange={(e)=>setBarkodYukseklikHandler(+e.target.value)} /></div>
            <div> {language === "tr" ? "Barkod Darl??k :" : "Barcode Chr. width:"}:<input type="number"  step="any"  required={true} min={1} max={5 }value={barkodW} onChange={(e)=>setBarkodW(+e.target.value)} /></div>
            <div> {language === "tr" ? "D??nd??r :" : "Rotate:"}:<input type="checkbox"  checked={rotateMe} onChange={(e)=>setRotateMe(!rotateMe)} /></div>
            <div> {language === "tr" ? "??st Kenar Bo??u??u :" : "Margin Top:"}:<input type="number"  required={true} min={0} max={450} value={ustKenar} onChange={(e)=>setUstKenar(+e.target.value)} /></div>
            <div> {language === "tr" ? "Barkod Bo??lu??u :" : "Barcode Gap:"}:<input type="number"  required={true} min={0} max={450} value={barkodBosluk} onChange={(e)=>setBarkodBosluk(+e.target.value)} /></div>
          </div>
          {language === "tr" ? "Firma:" : "Company:"}
          <input type="text"   required={true} ref={firmaAd} />
          {language === "tr" ? "??r??n Kodu:" : "Product Code:"}
          <input type="text"  required={true} ref={urunKodu} />
          {language === "tr" ? "??r??n Tan??m??:" : "Description:"}
          <input type="text"   required={true} onChange={(e)=>setUrunTanimiHandler(e.target.value)} />
          {language === "tr" ? "Toplam Adet:" : "Total Qty:"}
          <input type="number" required={true} onChange={(e)=>setToplamAdetHandler(e.target.value)} />
          {language === "tr" ? "Koli Ba????na Adet:" : "Qty per box:"}
          <input type="number" required={true} ref={koliAdet} />
          <button type="submit">Print</button>
          </form>
      
      )}
      {print && (
        <>
        <div className="print_btn">
          <button onClick={() => setPrint(false)}>
            {language === "tr" ? "Geri:" : "Back:"}
          </button>
          </div>
          <div style={{marginTop:ustKenar+"px"}}>
          {partList.map((item, idx) => (
            <div key={idx} style={{transform:rotateMe?"rotate(90deg)":"rotate(0deg)",marginBottom:barkodBosluk+"px"}}>
              <Layout
                kutuNo={item.kutuNo}
                urun={item.urun}
                adet={item.adet}
                firma={item.firma}
                tarih={item.tarih}
                toplam={toplamAdetHandler}
                desc={urunTanimiHandler}
                dil={language}
                genislik={genislikHandler}
                barkodYukseklik={barkodYukseklikHandler}
                barkodW={barkodW}
              />
            </div>
          ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;
