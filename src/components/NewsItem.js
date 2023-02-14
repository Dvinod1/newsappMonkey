import React, { Component } from 'react'

export class NewsItem extends Component {
   constructor(){
    super()
    console.log('Iam constructor')

   }

  render() {
    let {title,description,imageUrl,newsUrl,author,source,date} = this.props
    return (
      <div>
        <div className="card" >
           <img src={imageUrl} className="card-img-top" alt="..."/>
             <div className="card-body">
             <span className="badge rounded-pill text-bg-primary">{source}</span>
              <h5 className="card-title">{title}
</h5>
             <p className="card-text">{description}</p>
             <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
             <a rel='norefferrer' href={newsUrl} className="btn btn-dark">Read more</a>
       </div>
       </div>
      </div>
    )
  }
}

export default NewsItem
