import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { image } = this.props;
        return (
            <section>
                <div className="wrapper">
                    <div className="card">
                        <div className="img">
                            <img src={image.url} alt="Image" />
                        </div>
                    </div>
                    <div className="footer">
                        <h2>{image.label}</h2>
                        <hr />
                    </div>
                    <div className="clear"></div>
                </div>
            </section>
        );
    }
}

export default Card;
