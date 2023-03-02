import DataTable from '../components/TS';
import react from 'react'
import {
  selectorFamily,
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import { TextField } from '@mui/material';
import { text } from 'stream/consumers';


const myNumberState = atom({
  key: 'MyNumber',
  default: 2,
});

const myNumberState2 = atom({
  key: 'MyNumber2',
  default: 2,
});

//selectorFamily selector可以set參數進去邏輯
const myMultipliedState = selectorFamily({
  key: 'MyMultipliedNumber',
  get: (multiplier: number) => ({ get }) => {
    return get(myNumberState) * multiplier;
  },

  // 可选 set
  set: (multiplier: number) => ({ set }, newValue: number) => {
    console.log(newValue)
    console.log(multiplier)
    set(myNumberState2, newValue / multiplier);
  },
});


//定義atom 也就是要管理的狀態
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

//selector
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    if (String(text).length > 5)
      return 'WTF';
    else
      return String(text).length;
  },
});

//selector
const charCountState2 = selector({
  key: 'charCountState2', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    if (String(text).length > 10)
      return 'WTF';
    else
      return String(text).length;
  },
});


//component
//定義一個text input,它使用一個onchange函數,發生變化後會去改atom:textState
const TextInput = () => {
  //定義atom變數名稱:text
  const [text, setText] = useRecoilState(textState);
  const setMyMultipliedState = useSetRecoilState(myMultipliedState(2));

  //監聽onchange when change happen,then setText(value)
  const onChange = (event) => {
    setText(event.target.value);
    setMyMultipliedState(event.target.value);
  };
  //注意 text & onChange 用法
  return (
    <div>
      <TextField value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const TextInput2 = () => {
  //定義atom變數名稱:text
  const [myNumber, setMyNumber] = useRecoilState(myNumberState);
  const setMyMultipliedState = useSetRecoilState(myMultipliedState(myNumber));
  //監聽onchange when change happen,then setText(value)
  const onChange = (event) => {
    setMyNumber(event.target.value);
    setMyMultipliedState(100);
  };
  //注意 text & onChange 用法
  return (
    <div>
      <TextField value={myNumber} onChange={onChange} />
      <br />
      EchoMyNumber: {myNumber}

    </div>
  );
}

//component
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

//component
function CharacterCount3() {
  // const setMyMultipliedState = useSetRecoilState(myMultipliedState(2));
  // setMyMultipliedState(50);
  const count = useRecoilValue(myNumberState2);

  return <>
    3333333: {count}</>;
}

//component
function CharacterCount2() {
  const number = useRecoilValue(myNumberState);
  // 默认为 200
  const multipliedNumber = useRecoilValue(myMultipliedState(12));
  return <><br />myNumberState Count: {number}<br />{multipliedNumber}</>;
}



//component
function CharacterCounter() {



  return (
    <div>
      <TextInput />
      <TextInput2 />
      <CharacterCount />
      <CharacterCount2 />
      <CharacterCount3 />
    </div>
  );
}





export default function Home() {


  //client side

  //介面的一種用法
  interface X {
    //老實說我根本記不起來，給編輯器幫我記就好
    onononchange: React.ChangeEventHandler<HTMLInputElement>
  }

  const TextInput = ({ onononchange }: X) => (
    <input onChange={onononchange} />
  )



  //callAPI();
  return (
    <div>
      <CharacterCounter />
      <DataTable />
      {/* <button >Make API call</button>
      <TextInput onononchange={e => {
        alert(e.target.value);
      }} /> */}
    </div>
  );
}

//server side
//export async function getStaticProps() {
  // let tdata: DisableMaterialData[] = [];
  //api的位址不適用 next.config.js中定義的api proxy,
  //因為還沒到那一步就會去fetch了,網址須給完整
  // callAPI().then((retData) => {
  //   tdata = retData;

  // });
  // return {
  //   props: { tdata }, // will be passed to the page component as props
  // }
//}
