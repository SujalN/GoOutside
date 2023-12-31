import CustomDialog from '../../modals/CustomDialog'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

export default function SearchbarTasks({ classes }) {
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    const currentTime = new Date(Date.now())

    return (
        <>
            <CustomDialog
                type="filter"
                open={filterOpen}
                setOpen={setFilterOpen}
                keyName="tasksOptions"
            />
            <CustomDialog
                type="sort"
                open={sortOpen}
                setOpen={setSortOpen}
                keyName="tasksOptions"
            />
            <IconButton
                className={classes.wrapIconLeft}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setSortOpen(true)}
            >
                <Icon>
                    <img src={'./icons/sort.svg'} />
                </Icon>
            </IconButton>

        </>
    )
}
