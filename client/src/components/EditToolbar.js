import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

/*
    This toolbar is a functional React component that
    manages any buttons
    
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    return (
        <div>
            <Button
                disabled={false}
                id='add-song-button'
                variant="contained"
                sx={{display: store.currentList.isPublished==true? 'none' : ''}}>
                TEST
            </Button>
        </div>
    )
}

export default EditToolbar;