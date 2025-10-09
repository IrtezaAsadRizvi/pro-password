"use client"
import { useSelector, useDispatch } from 'react-redux'
import { setEnableDarkmode } from '../../state/uiSlice'
import { Moon, Sun } from 'lucide-react'


const DarkModeSwitch = () => {
    const enableDarkmode = useSelector((state) => state.ui.enableDarkmode)
    const dispatch = useDispatch()
    
    const darkModeHandler = () => {
            dispatch(setEnableDarkmode(!enableDarkmode))
            document.body.classList.toggle("dark");
    }
    return (
        <button className='icon-button'
                onClick={darkModeHandler}>
                    {enableDarkmode ? <Sun/> : <Moon/>}
        </button>
    )
}

export default DarkModeSwitch
