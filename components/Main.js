import React, { useEffect, useRef, useState } from 'react'

const Main = () => {

    const Inputval = useRef(null)
    const [keyword, setKeyword] = useState('');
    const [arr,setArr] = useState([])
    const [data, seData] = useState([]);
    const [word,setWord] = useState("");
    const [style, setStyle] = useState();

    const [isClickL,setIsclickL] = useState(false)
    const [isClickN,setIsclickN] = useState(false)
    const [isClickLos,setIsclickLos] = useState(false)
    const [isClickLas,setIsclickLas] = useState(false)

    useEffect(() =>{
        (async _ =>{
            const response = await fetch(`https://python3-dot-parul-arena-2.uc.r.appspot.com/test?cityname=${keyword}`);
            const data = await response.json();
            data.name = keyword;
            seData(data);
            if(keyword==="London")setIsclickL(!isClickL)
            else if(keyword==="New York") setIsclickN(!isClickN)
            else if(keyword==="Los Angeles") setIsclickLos(!isClickLos)
            else if(keyword==="Las Vegas") setIsclickLas(!isClickLas)
        })();
    },[keyword])

    useEffect(() =>{
        if(data.length!==0 && data?.status!=='failed')
        setArr([...arr,data]);
    },[data])

    useEffect(() => {
        arr.forEach(element => {
            if(word===element.name){
                setTimeout(function () {
                    setStyle({ backgroundColor:'transparent' });
                  }, 3000);
            }
        });
        setStyle({ backgroundColor:'#F7C042' })
    },[word])

    const Capitalize = (Sentence) => {
        const words = Sentence.split(" ");
        for(var i=0; i<words.length; i++){
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(" ");
    }
    
    const onKeyDownHandler = (e) =>{
        if(e.key==='Enter'){
            e.preventDefault();
            const typeVal = Inputval.current.value; 
            setWord(Capitalize(typeVal))
        }
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const typeVal = Inputval.current.value; 
        setWord(Capitalize(typeVal))
    }

    const convertToHour = (olddate) =>{
        const oDate = new Date(olddate);
        var cDate = new Date();
        var difdate = cDate-oDate;
        return(Math.floor(difdate/3.6e+6))
    }

    const deleteRow = (id) => {
        const rArr = arr.filter((ele, idx) =>{
            return idx !==id;
        })
        setArr([...rArr])
        if(arr[id].name === 'London')setIsclickL(!isClickL)
        else if(arr[id].name==="New York") setIsclickN(!isClickN)
        else if(arr[id].name==="Los Angeles") setIsclickLos(!isClickLos)
        else if(arr[id].name==="Las Vegas") setIsclickLas(!isClickLas)
    }

  return (
    <>
    <div className='LeftData'>
      <span>Get Weather</span>
      <div>
        <p>City</p>
        <p onClick={(e) => setKeyword("London")} style={isClickL?{border:'5px solid #82CD47'}:{}}>London</p>
        <p onClick={(e) => setKeyword("New York")} style={isClickN?{border:'5px solid #82CD47'}:{}}>New York</p>
        <p onClick={(e) => setKeyword("Los Angeles")} style={isClickLos?{border:'5px solid #82CD47'}:{}}>Los Angeles</p>
        <p onClick={(e) => setKeyword("Las Vegas")} style={isClickLas?{border:'5px solid #82CD47'}:{}}>Las Vegas</p>
      </div>
    </div>
    <div className='rightData'>
      <div className='inputField'>
        <input ref={Inputval} type={'text'}  placeholder='City Name' onKeyDown={onKeyDownHandler}/>
        <span onClick={onSubmitHandler}>Search</span>
      </div>
      <div className='tableData'>
        <table>
            <thead>
                <tr>
                    <td>City</td>
                    <td>Description</td>
                    <td>Temprature (&deg;C)</td>
                    <td>Pressure (hPa)</td>
                    <td>Data Age (hrs)</td>
                    <td></td>
                </tr>
            </thead>
            {arr.length!==0?(
            <tbody className='bodytable'>
                {
                arr.map((data,idx) =>{
                    return(
                        <tr key={idx} style={word===data.name?(style):({ backgroundColor:'transparent' })}>
                        <td>{data.name}</td>
                        <td><input defaultValue={data.description} className='tempInput' type={'text'}/></td>
                        <td>{data.temp_in_celsius}</td>
                        <td>{data.pressure_in_hPa}</td>
                        <td>{convertToHour(data.date_and_time)}</td>
                        <td onClick={() => deleteRow(idx)} style={{cursor:'pointer',color:'#4472C4'}}>Delete</td>
                        </tr>
                    )
                })
                }
            </tbody>):
            (<tfoot>
                <tr>
                    <td colSpan="6"  className='noData'>No Data</td>
                </tr>
            </tfoot>
            )
            }
        </table>
        </div>
    </div>
    </>
  )
}

export default Main