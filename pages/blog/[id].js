import Image from 'next/image'
import posts from '../../posts.json'

const Post = () => {

    //const post = posts[router.query.id]

    return (
        <>
            {/* <h1>{props.post.title}</h1>
            <p>{props.post.content}</p>
            <Image
                src={props.post.image}
                alt=""
                width={960}
                height={540}

            /> */}
        </>
    )
}

// Post.getInitialProps = ({ query }) => {
//     return {
//         post: posts[query.id]
//     }
// }

export default Post;