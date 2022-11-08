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
      rotateMe:rotateMe
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
}
  }, [print]);




  return (
    <>
      {!print && (
           <form style={{ padding: "1rem",display:"flex",flexDirection:"column",gap:"0.2rem" }} onSubmit={hesapla}>
          <div style={{ display: "flex", gap: "1rem", cursor: "pointer" }}>
            Dil :
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
           
            <div> {language === "tr" ? "Çerçeve Genişliği :" : "Border Width:"}<input type="number"  required={true} min={250}  value={genislikHandler} onChange={(e)=>setGenislikHandler(+e.target.value)} /></div>
            <div> {language === "tr" ? "Barkod Yüksekliği :" : "Barcode Height:"}<input type="number"  required={true} min={20} value={barkodYukseklikHandler} onChange={(e)=>setBarkodYukseklikHandler(+e.target.value)} /></div>
            <div> {language === "tr" ? "Barkod Darlık :" : "Barcode Chr. width:"}:<input type="number"  required={true} min={1} max={5 }value={barkodW} onChange={(e)=>setBarkodW(+e.target.value)} /></div>
            <div> {language === "tr" ? "Döndür :" : "Rotate:"}:<input type="checkbox"  checked={rotateMe} onChange={(e)=>setRotateMe(!rotateMe)} /></div>
          </div>
          {language === "tr" ? "Firma:" : "Company:"}
          <input type="text"   required={true} ref={firmaAd} />
          {language === "tr" ? "Ürün Kodu:" : "Product Code:"}
          <input type="text"  required={true} ref={urunKodu} />
          {language === "tr" ? "Ürün Tanımı:" : "Description:"}
          <input type="text"   required={true} onChange={(e)=>setUrunTanimiHandler(e.target.value)} />
          {language === "tr" ? "Toplam Adet:" : "Total Qty:"}
          <input type="number" required={true} onChange={(e)=>setToplamAdetHandler(e.target.value)} />
          {language === "tr" ? "Koli Başına Adet:" : "Qty per box:"}
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
          <div style={{marginTop:rotateMe?genislikHandler/4+"px":"2px"}}>
          {partList.map((item, idx) => (
            <div key={idx} style={{transform:rotateMe?"rotate(90deg)":"rotate(0deg)",marginBottom:rotateMe?genislikHandler/2+"px":"0.5rem"}}>
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
