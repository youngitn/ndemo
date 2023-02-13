import DataTable from '../components/TS';
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
