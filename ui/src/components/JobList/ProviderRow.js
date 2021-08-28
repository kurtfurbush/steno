import PropTypes from 'prop-types'
import './style.css';

export default function ProviderRow({ provider }) {
    return (
        <div className="provider-detail-row">
            <div className="provider-detail-row-content__name">
                {provider.full_name}
            </div>
        </div>
    )
}

ProviderRow.propTypes = {
    provider: PropTypes.shape({
        id: PropTypes.string,
        full_name: PropTypes.string,
    }).isRequired,
}
