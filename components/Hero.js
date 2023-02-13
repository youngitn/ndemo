import Image from "next/image";

import Link from "next/link";

const Hero = () => {
    return (
        <div className="text-center bg-white pb-10">
            <div className="w-60 mx-auto">
                <Image src={"https://img.mypeoplevol.com/i/fs/20230202/1675349684bc68b928898a4ac682f69536d7cf58c4.jpg"} width={200} height={200}
                    responsive="ture" alt="" />
                <span className="text-red-600">最新華國美學 吉祥物 黃色垃圾袋</span>
            </div>
            <h1 className="text-2xl text-gray-700 uppercase font-bold">Welcom to WatchMe - 華国美学 超越藍綠</h1>
            <p className="text-gray-500">日本時代建築 福興穀倉 鐵皮加蓋 </p>
            <Link href="/contact">
                <button className="bg-gray-700 text-white py-3 px-6 rounded text-sm
        mt-4">CONTACT US</button>
            </Link>
        </div>
    );
};

export default Hero;