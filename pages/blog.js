import Link from "next/link"
import posts from '../posts.json'
import Head from "next/head"

const Blog = () => (

    <div>
        <Head>
            <title>Blog | 福興穀倉</title>
            <meta name="description" content="彰化兩任女縣長接力把日本時代建築打造成華國美學建築.">
            </meta>
        </Head>
        <h2>Blog</h2>
        <h1>Welcome to 福興穀倉 鐵皮加蓋</h1>
        <h1>欣賞彰化縣兩任女縣長綠營翁金珠 藍營王惠美執政下的文化局,</h1>
        <h1> 哪著全國人民納稅錢, 接力把日本時代建築打造成華國美學建築.</h1>

        <ul>
            {Object.entries(posts).map((value, index) => {
                return (
                    <li key={index}>
                        <Link href='/blog/[id]' as={'/blog/' + value[0]}>
                            {value[1].title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div>
)

export default Blog