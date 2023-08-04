import React from 'react'
import "../../css/index.css"
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'

export default function Header({ firstUser, secondUser, thirdUser }) {
    return (
        <div className="header-section">
            <div className="leader-items">
                <div className="header-item">
                    <div className="ellipsis-crown second">
                        <div className="crown-icon">
                            <img src={img2} alt="second" />
                        </div>
                    </div>
                    <div className="header-leader-card">
                        <span className="name">{secondUser.name}</span>
                        <span className="points">
                            {secondUser.points} Points
                        </span>
                    </div>
                </div>
                <div className="header-item">
                    <div className="ellipsis-crown winner">
                        <div className="crown-icon">
                            <img src={img1} alt="winner" />
                        </div>
                    </div>
                    <div className="header-leader-card">
                        <span className="name">{firstUser.name}</span>
                        <span className="points">
                            {firstUser.points} Points
                        </span>
                    </div>
                </div>
                <div className="header-item">
                    <div className="ellipsis-crown">
                        <div className="crown-icon">
                            <img src={img3} alt="3rd" />
                        </div>
                    </div>
                    <div className="header-leader-card">
                        <span className="name">{thirdUser.name}</span>
                        <span className="points">
                            {thirdUser.points} Points
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
