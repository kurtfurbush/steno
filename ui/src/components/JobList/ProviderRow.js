import PropTypes from 'prop-types'
import RainDropIcon from './RainDropIcon';
import WindIcon from './WindIcon';
import './style.css';

export default function ProviderRow({ provider }) {
    return (
        <div className="provider-detail-row">
            <div className="provider-detail-row-content__name">
                {provider.full_name}
            </div>
            <div className="provider-detail-row-content__description">
                {provider.description}
            </div>
            <RainDropIcon pop={provider.pop} />
            <WindIcon wind={provider.wind} />
        </div>
    )
}

ProviderRow.propTypes = {
    detail: PropTypes.shape({
        dt: PropTypes.number,
        description: PropTypes.string,
        temp: PropTypes.number,
        pop: PropTypes.number,
        wind: PropTypes.number,
        icon: PropTypes.string,
    }).isRequired,
}
