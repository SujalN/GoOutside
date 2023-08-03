import HomepageListItem from './HomepageListItem'

export default function HomepageList() {
    const cardsOrder = ['nearbyEvents', 'streaks','leaderboards']

    const listItems = cardsOrder.map((item, i) => {
        return (
            <HomepageListItem
                key={i}
                type={item}
                style={{ marginBottom: '18px' }}
            />
        )
    })

    return <div>{listItems}</div>
}
