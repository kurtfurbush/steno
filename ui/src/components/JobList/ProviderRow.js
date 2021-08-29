import PropTypes from 'prop-types'
import distanceIcon from '../../assets/distance.png'
import ratingIcon from '../../assets/rating.png'
import moneyIcon from '../../assets/money.png'
import timeIcon from '../../assets/time.png'
import rankIcon from '../../assets/rank.png'
import './style.css';

export default function ProviderRow({ provider }) {
    return (
        <div className="provider-detail-row">
            <div className="provider-detail-row-content__name">
                {provider.full_name}
            </div>
            <div className="provider-detail-row-content-ratings">
                <div className="provider-detail-row-content-ratings-group">
                    <div className="job-main-row-content__icon">
                        <img
                            src={distanceIcon}
                            alt="distance"
                        />
                    </div>
                    <div className="provider-detail-row-content-ratings__distance">
                        {provider.distance?.toFixed(1)}
                    </div>
                </div>
                <div className="provider-detail-row-content-ratings-group">
                    <div className="job-main-row-content__icon">
                        <img
                            src={ratingIcon}
                            alt="rating"
                        />
                    </div>
                    <div className="provider-detail-row-content-ratings">
                        {(provider.averageRating?.toFixed(1) ?? 0) * 100}{provider.averageRating ? '%' : ''}{provider.ratingCount ? ` (${provider.ratingCount})`: ''}
                    </div>
                </div>
                <div className="provider-detail-row-content-ratings-group">
                    <div className="job-main-row-content__icon">
                        <img
                            src={timeIcon}
                            alt="average time"
                        />
                    </div>
                    <div className="provider-detail-row-content-ratings">
                        {provider.averageTime?.toFixed(2)}
                    </div>
                </div>
                <div className="provider-detail-row-content-ratings-group">
                    <div className="job-main-row-content__icon">
                        <img
                            src={moneyIcon}
                            alt="average cost"
                        />
                    </div>
                    <div className="provider-detail-row-content-ratings">
                        {provider.averageCost?.toFixed(0)}
                    </div>
                </div>
                <div className="provider-detail-row-content-ratings-group">
                    <div className="job-main-row-content__icon">
                        <img
                            src={rankIcon}
                            alt="rank"
                        />
                    </div>
                    <div className="provider-detail-row-content-ratings">
                        {provider.fullRanking?.toFixed(2)}
                    </div>
                </div>
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
