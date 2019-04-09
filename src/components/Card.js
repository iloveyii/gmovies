import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { image } = this.props;
        return (
            <div style={{width: '20%' , float: 'left', overflow: 'hidden'}}>
                <div className="card">
                    <div className="img">
                        <img src={'https://image.tmdb.org/t/p/w94_and_h141_bestv2' + image.poster_path} alt="Image" />
                    </div>
                </div>
                <div className="footer">
                    <h3>{image.original_title}</h3>
                    <p>{image.overview}</p>
                    <hr />
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default Card;
