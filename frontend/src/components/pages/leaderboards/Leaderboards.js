import React from 'react'
import LeaderboardList from './LeaderboardList'
import ProfileDialog from '../../modals/ProfileDialog'
import Header from '../../cards/Header';
import LeaderCard from '../../cards/LeaderCard';

export default function Leaderboards() {
    const [profileOpen, setProfileOpen] = React.useState(false)
    const [leaderboardData, setLeaderboardData] = React.useState([])
    const [profileData, setProfileData] = React.useState()

    const onItemClick = () => {
        setProfileOpen(true)
    }

    const testUsers = [
        { name: 'John Doe', points: 500, hasDropped: false },
        { name: 'Jane Smith', points: 480, hasDropped: false },
        { name: 'Mike Johnson', points: 450, hasDropped: false },
        { name: 'Sarah Williams', points: 430, hasDropped: true },
        { name: 'David Lee', points: 410, hasDropped: false },
        { name: 'David Lee', points: 210, hasDropped: null },
    ]

    const sortedUsers = [...testUsers].sort((a, b) => b.points - a.points)

    const usersWithPositions = sortedUsers.map((user, index) => ({
        ...user,
        position: index + 1,
    }))

    return (
        <div
            className="overflow-container"
            style={{ margin: 0, height: '99%' }}
        >
            <ProfileDialog
                open={profileOpen}
                setOpen={setProfileOpen}
                data={profileData}
            />
            <div style={{ width: '100%' }}>
                <LeaderboardList
                    onItemClick={onItemClick}
                    data={leaderboardData}
                />
                <div className="App">
                    <Header
                        firstUser={usersWithPositions[0]}
                        secondUser={usersWithPositions[1]}
                        thirdUser={usersWithPositions[2]}
                    />
                    <div className="leaderboard-section">
                        {usersWithPositions.slice(3).map((user) => (
                            <LeaderCard
                                hasDropped={user.hasDropped}
                                name={user.name}
                                points={user.points}
                                position={user.position}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
