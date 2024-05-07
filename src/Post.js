import {formatISO9075} from "date-fns"
import { Link } from "react-router-dom"

export default function Post({_id,title,summary,cover,content,createdAt,author}){
    return(
      <div className="post">
        <div className="image">
          {/* this is imp to show our uploaded images */}
          <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/"+cover} />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>          
            <h2>{title}</h2> 
          </Link>

          

        </div>
        <p className="info">
          <a className="author">{author.username}</a> <br/>
          {/* install date-fns for date purposes */}
          <time>{formatISO9075(new Date(createdAt))}</time>
          {/* <time>{createdAt}</time> */}
        </p>
        <p className="summary">{summary}</p>
      </div>

    )
}