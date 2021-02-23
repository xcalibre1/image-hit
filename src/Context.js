import React, { useRef, useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [name, setName] = useState("vikash");
  const [grid, setGrid] = useState([]);
  const [visible, setVisible] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);
  const [time, setTime] = useState(0);
  const [ref, setRef] = useState("");
  const [count, setCount] = useState(0);
  const [checkTwo, setChektow] = useState([]);
  const curr = useRef(checkTwo);
  const [message, setMessage] = useState("");
  const [isStart, setStart] = useState(false);
  const [isflag,setflag]=useState(false)
  const [img,setImg]=useState(['/images/img1.jpg','/images/img2.jpg','/images/img3.jpg','/images/img4.jpg','/images/img5.jpg','/images/img6.jpg','/images/img7.jpg','/images/img8.jpg','/images/img1.jpg','/images/img2.jpg','/images/img3.jpg','/images/img4.jpg','/images/img5.jpg','/images/img6.jpg','/images/img7.jpg','/images/img8.jpg'])

  const initialState = (para) => {
    curr.current = para;
    setChektow(para);
  };

  function randomfun() {
    var limit = 16;
    let lower_bound = 0;
    let upper_bound = 16;
    let bomb = [];
    while (bomb.length < limit) {
      var random_number = Math.floor(
        Math.random() * (upper_bound - lower_bound) + lower_bound
      );
      if (bomb.indexOf(random_number) == -1) {
        bomb.push(random_number);
      }
    }
    let imggrid=[["","","",""],["","","",""],["","","",""],["","","",""]];
    for(let i=0;i<16;i++){
        imggrid[parseInt(i/4)][i%4]=img[bomb[i]]
    }
    setGrid(imggrid);

  }
  useEffect(() => {
      randomfun()
  }, [])

  function incrementCounter(row, col, val) {
    if (!visible[row][col] && isStart) {
      let obj = { row, col, val };
      initialState([...checkTwo, obj]);

      let copygrid = [...visible];
      copygrid[row][col] = true;
      setVisible(copygrid);
      if (curr.current.length === 2) {
        if (curr.current[0].val !== curr.current[1].val) {
          let copygrid = [...visible];
          copygrid[curr.current[0].row][curr.current[0].col] = false;
          copygrid[curr.current[1].row][curr.current[1].col] = false;
          setVisible(copygrid);
        }
        initialState([]);
      }

      setCount((preCount) => preCount + 1);
      let flag = true;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (visible[i][j] == false) flag = false;
        }
      }
      if (flag) {
        setflag(true)
        clearInterval(ref);
        setMessage(`Congratulations You Won With Time`);
      }
    }
  }
  function seTtimer() {
    setTime(0);
    setCount(0);
    setStart(true);
    let id = setInterval(() => {
      setTime((preTime) => preTime + 1);
    }, 1000);
    setRef(id);
  }

  return (
    <Context.Provider
      value={{
        grid,
        time,
        seTtimer,
        incrementCounter,
        visible,
        message,
        isflag
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
