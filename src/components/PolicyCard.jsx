import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const PolicyCard = props => {
    const history = useHistory();

    return (
        <div className="policy-card" onClick={() => {history.push(`san-pham?loai-san-pham=${props.name.replace(' ', '-')}`)}}>
            <div className="policy-card__icon">
                <img style={{width: '5em', height: '5em'}} src={props.icon} alt="hinh"/>
            </div>
            <div className="policy-card__info">
                <div className="policy-card__info__name">
                    {props.name}
                </div>
                <div className="policy-card__info__description">
                    {props.description}
                </div>
            </div>
        </div>
    )
}

PolicyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default PolicyCard
