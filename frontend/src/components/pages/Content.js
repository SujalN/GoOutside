import { Page } from '../../helpers/Page'
import { Color } from '../../helpers/Color'
import Leaderboards from './leaderboards/Leaderboards'
import Profile from './profile/Profile'
import Events from './events/Events'
import Home from './home/Home'
import Landing from './landing/Landing'
import BottomNavigationBar from '../navs/BottomNavigationBar'
import TopNavigationBar from '../navs/TopNavigationBar'
import { usePageContext } from '../../contexts/PageContext'

const Content = () => {
    const pageContext = usePageContext()

    let backgroundColor = Color.primary

    let backgroundStyle = {
        backgroundImage: 'url(/Map.png)',
        backgroundSize: 'cover',
        backgroundColor: Color.coreTheme,
    }
    if (pageContext.state.page !== Page.landing) {
        if (pageContext.state.page === Page.events) {
            if (pageContext.state.mapOpen) {
                backgroundColor = Color.primary
            } else {
                backgroundColor = Color.coreTheme
            }
        } else if (pageContext.state.page === Page.home) {
            backgroundColor = Color.accent
        }
        backgroundStyle = { backgroundColor: backgroundColor }
    }

    return (
        <div className="main-container" style={backgroundStyle}>
            {pageContext.state.page !== Page.landing && <TopNavigationBar />}
            <div
                className={
                    pageContext.state.mapOpen
                        ? 'content-wrapper'
                        : 'content-wrapper content-wrapper-maxWidth'
                }
            >
                {pageContext.state.page === Page.landing && <Landing />}
                {pageContext.state.page === Page.profile && <Profile />}
                {pageContext.state.page === Page.leaderboards && (
                    <Leaderboards />
                )}
                {pageContext.state.page === Page.home && <Home />}
                {pageContext.state.page === Page.events && <Events />}
            </div>
            {pageContext.state.page !== Page.landing && <BottomNavigationBar />}
        </div>
    )
}

export default Content
