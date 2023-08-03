import React from 'react'
import CustomDialog from '../../modals/CustomDialog'
import Alert from '@material-ui/lab/Alert'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { objToFormData } from '../../../helpers/Utils'
import CustomButton from '../../buttons/CustomButton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useTempContext } from '../../../contexts/TempContext'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Page } from '../../../helpers/Page'

const useStyles = makeStyles({
    top: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    bottom: {
        boxShadow:
            '0px -2px 4px -1px rgb(0 0 0 / 20%),' +
            '0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
        padding: '14px',
    },
    container: {
        display: 'flex',
    },
    logo: {
        height: '18.20652174vh',
    },
    bold: {
        fontSize: '4.891304348vh',
        margin: '0 2px;',
        fontFamily: 'Oswald',
        fontWeight: 'normal',
    },
    bolder: {
        fontSize: '4.891304348vh',
        margin: '0 3px;',
        fontFamily: 'Oswald',
    },
    desc: {
        margin: '5px 5px',
        fontFamily: 'Oswald',
        fontSize: '2.445652714vh',
    },
    paragraph: {
        margin: '15px 0',
        fontWeight: 'bold',
        fontSize: '18px',
    },
})

export default function Landing() {
    const classes = useStyles()

    const [loginOpen, setLoginOpen] = React.useState(false)
    const [signupOpen, setSignupOpen] = React.useState(false)
    const [signupSuccess, setSignupSuccess] = React.useState(false)
    const [landingOpen, setLandingOpen] = useState(false)

    const auth = useAuthContext()
    const tempContext = useTempContext()

    const customSetLoginSignupOpen = () => {
        setLoginOpen(!loginOpen)
        setSignupOpen(!signupOpen)
    }

    const saveRequestToken = (data) => {
        setSignupSuccess(false)
        auth.setState({ ...auth.state, token: data.jwt })
    }

    const signupValidate = () => {
        if (tempContext.state.password === tempContext.state.confirmPassword) {
            return true
        }
        return false
    }

    const loginValidate = () => {
        if (tempContext.state.username.includes('@')) {
            return false
        }
        return true
    }

    return (
        <>
            <CustomDialog
                type="landing"
                open={landingOpen}
                setOpen={setLandingOpen}
            />
            {signupSuccess && (
                <div className="alertContainer">
                    <Alert
                        className="overlayTop fadeIn"
                        severity="success"
                        onClose={() => {
                            setSignupSuccess(false)
                        }}
                    >
                        Successfully signed up!
                    </Alert>
                </div>
            )}
            <CustomDialog
                type="login"
                open={loginOpen}
                setOpen={setLoginOpen}
                setSignupOpen={customSetLoginSignupOpen}
                nextPage={Page.home}
                handleRequestData={saveRequestToken}
                validate={loginValidate}
                errorMessage="Use username instead of email to log in"
            />
            <CustomDialog
                type="signup"
                open={signupOpen}
                setOpen={setSignupOpen}
                setLoginOpen={customSetLoginSignupOpen}
                validate={signupValidate}
                errorMessage="Passwords do not match"
                handleRequestData={() => {
                    setSignupSuccess(true)
                }}
            />
            <div className={classes.top}>
                <img className={classes.logo} src="/logo.svg"></img>
                <div className={classes.container}>
                    <h1 className={classes.bold}>Go</h1>
                    <h1 className={classes.bolder}>Outside!</h1>
                </div>
                <p className={classes.desc}>
                    Take breath of fresh air and explore your community!
                </p>
                
                <CustomButton
                    type="landing"
                    variant="secondary"
                    halfWidth={true}
                    onClick={() => {
                        setLoginOpen(true)
                    }}
                >
                    Start
                </CustomButton>
            </div>
        </>
    )
}
