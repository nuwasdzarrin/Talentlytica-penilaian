import faUser from './fa-fa-user.png';
import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
  const refOutput = useRef('outputSection')
  const [data, setData] = useState([])
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    generateData()
  }, [])

  const options = []
  for (let i=1; i<=10; i++) {
    options.push(i)
  }
  const generateData = () => {
    let data_temp = []
    let second_temp= []
    for (let first=0; first<10; first++) {
      second_temp = []
      for (let second = 0; second < 5; second++) {
        second_temp.push(second === 0 ? `mahasiswa_${first + 1}` : ``)
      }
      data_temp.push(second_temp)
    }
    setData(data_temp)
  }
  const handleSelected = (event, first, second) => {
    let dataTmp = [...data]
    dataTmp[first][second] = event.target.value
    setData(dataTmp)
    setShowOutput(false)
  }
  const onSave = () => {
    setShowOutput(true)
    setTimeout(() => {
      refOutput.current.scrollIntoView()
    }, 250)
  }
  const convertToOutput = () => {
    if (!data.length) return
    let result = {
      aspek_penilaian_1: {},
      aspek_penilaian_2: {},
      aspek_penilaian_3: {},
      aspek_penilaian_4: {},
    }
    data.forEach((datum, datumIndex) => {
      datum.forEach((second, secondIndex) => {
        if (secondIndex === 0) return
        result[`aspek_penilaian_${secondIndex}`][`mahasiswa_${datumIndex+1}`] = parseInt(second)
      })
    })
    return result
  }

  let templateOutput
  if (showOutput) {
    templateOutput = (
      <div className="mt-5" ref={refOutput}>
        <h6><b>Output:</b></h6>
        <div>
          <pre>{JSON.stringify(convertToOutput(), null, 2) }</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <div className="row text-center mb-3">
        <div className="col-md-3"></div>
        <div className="col-md-2">Aspek penilaian 1</div>
        <div className="col-md-2">Aspek penilaian 2</div>
        <div className="col-md-2">Aspek penilaian 3</div>
        <div className="col-md-2">Aspek penilaian 4</div>
      </div>
      {
        data.map((datum, datumIndex) => {
          return (
              <div className="card px-2 py-1 mb-3" key={`datum-${datumIndex}`}>
                <div className="row">
                  {
                    datum.map((second, secondIndex)=> {
                      return (
                        <>
                          {
                            secondIndex === 0 ?
                              <div className="col-md-3 d-flex align-items-center text-capitalize" key={`second-${secondIndex}`}>
                                <img src={faUser} alt="icon" className="icon-size mr-2" /> {second.replace('_', ' ')}
                              </div>
                              :
                              <div className="col-md-2 d-flex align-items-center" key={`second-${secondIndex}`}>
                                <select className="form-control" defaultValue={1} onChange={
                                  (event)=> handleSelected(event, datumIndex, secondIndex)
                                }>
                                  {
                                    options.map((op, optionIndex) => {
                                      return (
                                        <option value={op}
                                                key={`options-${datumIndex}-${secondIndex}-${optionIndex}`}>
                                          {op}
                                        </option>
                                      )
                                    })
                                  }
                                </select>
                              </div>
                          }
                        </>
                      )
                    })
                  }
                </div>
              </div>
          )
        })
      }
      <div className="text-right mt-4">
        <button className="btn btn-dark" onClick={()=> onSave()}>Simpan</button>
      </div>
      {templateOutput}
    </div>
  );
}

export default App;
