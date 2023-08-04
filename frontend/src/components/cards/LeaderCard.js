import React from 'react'
import "../../css/index.css"

export default function LeaderCard({
    position, name, points, hasDropped
}) {
    return (
        <div className='card'>
            <span>{position}</span>
            <span className='circle'></span>
            <span className='name'>{name}</span>
            <span>{points} &nbsp; Points</span>
            {hasDropped === true ? (
                <span className='indicator'>▼</span>
            ) : hasDropped === false ? (
                <span className='indicator'>▲</span>
            ) : (
                <span className='indicator'></span>
            )}
        </div>
    )
}