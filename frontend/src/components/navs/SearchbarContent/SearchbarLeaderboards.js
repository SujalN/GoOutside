import CustomDialog from '../../modals/CustomDialog'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Color } from '../../../helpers/Color'
import Icon from '@material-ui/core/Icon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export default function SearchbarLeaderboards({ classes }) {
    const [filterOpen, setFilterOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)

    return (
        <>
            <CustomDialog
                type="filter"
                open={filterOpen}
                setOpen={setFilterOpen}
                keyName="leaderboardOptions"
            />
            <CustomDialog
                type="view"
                open={viewOpen}
                setOpen={setViewOpen}
                keyName="leaderboardOptions"
            />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ChevronLeftIcon />
                <p>This Week (June 30 - Aug 5)</p>
                <ChevronRightIcon />
            </div>
        </>
    )
}
